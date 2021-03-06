import { usePrevious } from 'ahooks';
import cn from 'classnames';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';

import { createTransmission, isFileExist, quickUpload } from '@/api';
import { IFile, IFolder } from '@/types';

import workerScript from '../../../public/md5Worker';
import BaseAction from './BaseAction';
import UploadForm, { UploadConfig } from './UploadForm';
import UploadList from './UploadList';
import UploadProgress from './UploadProgress';
import UploadResult from './UploadResult';

export type State =
  'normal' | // 初始状态，等待用户选择上传文件、接收文件等等
  'uploadPending' |
  'uploading' |
  'uploadComplate' |
  'receivePending'

// 其实好多参数应该是可省略的
interface ReceiveComputedParams {
  type: 'process' | 'end',
  payload: {
    error: Error | null;
    file: IFile;
    currentChunk: number;
    chunks: number;
    md5: string
  }
}

interface ITransmission {
  id: string;
  description: string;
  has_password: boolean;
  password: string;
  expiration: Date;
  uid: string;
  share_link: string;
}

function FileAction() {
  const [state, setState] = useState<State>('normal');

  const updateState = (_state: State) => {
    setState(_state);
  };

  const clearPreUpload = () => {
    setState('normal');
  };

  const [transmission, setTransmission] = useState<ITransmission>();

  const [fileList, setFileList] = useState<(IFile | IFolder)[]>([]);
  const fileListLen = useMemo(() => fileList.length, [fileList]);
  const prevFileListLen = usePrevious(fileListLen);

  useEffect(() => {
    if (fileList.length) { setState('uploadPending'); }
    if (fileList.length === 0) (setState('normal'));
  }, [fileList]);

  const RemoveFile = (file: IFile | IFolder) => {
    const index = fileList.findIndex((item) => item.name === file.name);
    const cpFileList = [...fileList];

    cpFileList.splice(index, 1);
    setFileList(cpFileList);
  };

  const worker = useRef<Worker | null>(null);

  // 组件初始化，加载 worker
  useEffect(() => {
    const myWorker = new Worker(workerScript);
    worker.current = myWorker;
    return () => {
      worker.current?.terminate();
    };
  }, []);

  const maxQueue = 1;
  const [numInQueue, setNumInQueue] = useState(0);
  const [md5Queue, setMd5Queue] = useState<IFile[]>([]);
  const [md5QueueMap, setMd5QueueMap] = useState<Record<string, IFile | null>>({});

  const calcMd5 = () => {
    if (md5Queue.length > 0 && numInQueue < maxQueue) {
      const tempMd5Queue = [...md5Queue];
      const file = tempMd5Queue.shift() as IFile;
      worker.current?.postMessage({ file });
      setMd5Queue(tempMd5Queue);
      setMd5QueueMap({ ...md5QueueMap, [file.id]: null });
      setNumInQueue((i) => i + 1);
    }
  };

  const addToQueue = (files: IFile[]) => {
    const tempMd5QueueMap = { ...md5QueueMap };
    const tempMd5Queue = [...md5Queue];
    files.forEach((file) => {
      if (!tempMd5QueueMap[file.id]) {
        tempMd5QueueMap[file.id] = file;
        tempMd5Queue.push(file);
      }
    });
    setMd5QueueMap(tempMd5QueueMap);
    setMd5Queue(tempMd5Queue);
  };

  useEffect(() => {
    if (md5Queue.length) {
      calcMd5();
    }
  }, [numInQueue, md5Queue]);

  const handleMd5Process = ({ type, payload }: ReceiveComputedParams) => {
    const copyFileList = [...fileList];

    // 具有 folderId 的就说明是某个文件夹下面的文件
    if (payload.file.folderId) {
      const folderIdx = copyFileList.findIndex((item) => item.id === payload.file.folderId);
      const fileIdx = (copyFileList[folderIdx] as IFolder).files.findIndex((item) => item.id === payload.file.id);
      if (fileIdx < 0) return;
      if (type === 'process') {
        (copyFileList[folderIdx] as IFolder).files[fileIdx].md5Process = payload.currentChunk / payload.chunks;
        (copyFileList[folderIdx] as IFolder).files[fileIdx].state = 'processingMd5';
        copyFileList[folderIdx].state = 'processingMd5';
      }
      if (type === 'end') {
        (copyFileList[folderIdx] as IFolder).files[fileIdx].md5 = payload.md5;
        (copyFileList[folderIdx] as IFolder).files[fileIdx].state = 'prepareForUpload';
        setNumInQueue((i) => i - 1);
      }
    } else {
      const fileIdx = copyFileList.findIndex((item) => item.id === payload.file.id);
      if (fileIdx < 0) return;
      if (type === 'process') {
        (copyFileList[fileIdx] as IFile).md5Process = payload.currentChunk / payload.chunks;
        copyFileList[fileIdx].state = 'processingMd5';
      }
      if (type === 'end') {
        (copyFileList[fileIdx] as IFile).md5 = payload.md5;
        (copyFileList[fileIdx] as IFile).state = 'prepareForUpload';
        setNumInQueue((i) => i - 1);
      }
    }
    setFileList(copyFileList);
  };

  useEffect(() => {
    const copyFileList = [...fileList];

    let isUpdate = false;

    fileList.forEach((item, outerIdx) => {
      if (!item.isFolder || item.state !== 'processingMd5') return;
      // idx >=0 说明还存在正在进行 md5 运算的文件夹
      const isProcess = item.files.findIndex((file) => ['processingMd5', 'chosen'].includes(file.state)) >= 0;
      if (isProcess) return;
      copyFileList[outerIdx].state = 'prepareForUpload';
      isUpdate = true;
    });

    if (isUpdate) {
      setFileList(copyFileList);
    }
  }, [fileList]);

  // 有新文件添加到列表，计算 MD5
  useEffect(() => {
    if (!worker.current) {
      console.error('>> Worker 加载失败');
      return;
    }

    if (fileListLen <= (prevFileListLen ?? 0)) return;

    worker.current.onmessage = (e) => {
      handleMd5Process(e.data);
    };
    const needCalcFiles: IFile[] = [];
    fileList.forEach((item) => {
      if (item.state === 'chosen') {
        if (item.isFolder) {
          item.files.forEach((file) => needCalcFiles.push(file));
        } else {
          needCalcFiles.push(item);
        }
      }
    });
    addToQueue(needCalcFiles);
  }, [fileListLen]);

  const uploadFile = (file: IFile, useQuickUpload: boolean, remoteFileId?: string) => {
    if (useQuickUpload && remoteFileId) {
      console.log('--- 秒传可用');
      // 文件已经存在于服务器，直接秒传
      quickUpload({ transmissionId: transmission!.id, fileId: remoteFileId }).then((res) => {
        console.log(res);
        // TODO 更新列表
      });
    }
    if (!useQuickUpload) {
      console.log('---秒传不可用');
    }
  };

  const verifyFile = () => {
    fileList.forEach((item) => {
      if (item.state !== 'prepareForUpload') return;
      if (item.isFolder) {
        item.files.forEach((file) => {
          isFileExist({ md5: file.md5 }).then((res) => {
            console.log(file.name, res);
          });
        });
      } else {
        isFileExist({ md5: item.md5 }).then(({ data }) => {
          uploadFile(item, data.isExist, data.file.id);
        });
      }
    });
  };

  const createShareLink = (config: UploadConfig) => {
    if (!localStorage.uid) {
      localStorage.uid = nanoid(16);
    }
    createTransmission({
      uid: localStorage.uid,
      ...config,
      expiration: new Date(dayjs(new Date()).subtract(+config.expirationTime.split('-')[0], 'day').format()),
    }).then((res) => {
      setTransmission(res.data);
      verifyFile();
    });
  };

  const onUpload = (config: UploadConfig) => {
    console.log('即将上传', { config, fileList });
    if (!transmission) {
      createShareLink(config);
    } else {
      verifyFile();
    }
    updateState('uploading');
  };

  return (
    <div className={cn(
      'w-340px h-auto m-7 mr-2 p-4 rounded-3xl transition-all duration-300 ease-out',
      'bg-white/50 select-none border-2 border-white dark:(border-gray-700 bg-blue-gray-800/50)',
      state === 'normal' || state === 'uploading' ? 'pb-4' : 'pb-8',
    )}
    >
      {state === 'uploadPending' && <UploadList state={state} fileList={fileList} onRemoveFile={(file) => RemoveFile(file)} />}
      {(state === 'normal' || state === 'uploadPending')
       && (
         <BaseAction
           state={state}
           updateState={updateState}
           clearPreUpload={clearPreUpload}
           fileList={fileList}
           onChooseFile={(tempFileList) => { setFileList(tempFileList); }}
           onChooseFolder={(tempFolderList) => { setFileList(tempFolderList); }}
         />
       )}
      {state === 'uploadPending' && <UploadForm onUpload={onUpload} />}
      {state === 'uploading' && <UploadProgress />}
      {(state === 'uploading' || state === 'uploadComplate') && <UploadResult state={state} updateState={updateState} />}
      {state === 'uploading' && <UploadList state={state} fileList={fileList} />}
    </div>
  );
}

export default FileAction;
