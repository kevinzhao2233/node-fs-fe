import { usePrevious } from 'ahooks';
import cn from 'classnames';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';

import { IFile, IFolder } from '@/types';

import workerScript from '../../../public/md5Worker';
import BaseAction from './BaseAction';
import UploadForm from './UploadForm';
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

function FileAction() {
  const [state, setState] = useState<State>('normal');

  const updateState = (_state: State) => {
    setState(_state);
  };

  const clearPreUpload = () => {
    setState('normal');
  };

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
    myWorker.onmessage = function m(event) {
      console.log(`Received message ${event.data}`);
    };
    return () => {
      worker.current?.terminate();
    };
  }, []);

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
      console.log(isProcess, item);
      copyFileList[outerIdx].state = 'prepareForUpload';
      isUpdate = true;
    });

    if (isUpdate) {
      setFileList(copyFileList);
    }
  }, [fileList]);

  useEffect(() => {
    if (!worker.current) {
      console.error('>> Worker 加载失败');
      return;
    }

    if (fileListLen <= (prevFileListLen ?? 0)) return;

    worker.current.onmessage = (e) => {
      handleMd5Process(e.data);
    };
    fileList.forEach((item) => {
      if (item.state === 'chosen') {
        if (item.isFolder) {
          item.files.forEach((file) => {
            worker.current?.postMessage({ file });
          });
        } else {
          worker.current?.postMessage({ file: item });
        }
      }
    });
  }, [fileListLen]);

  return (
    <div className={cn(
      'w-340px h-auto m-7 mr-2 mb-15 p-4 rounded-3xl transition-all duration-300 ease-out',
      'bg-white/50 select-none border-2 border-white dark:(border-gray-700 bg-blue-gray-800/50)',
      state === 'normal' ? 'pb-4' : 'pb-8',
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
      {state === 'uploadPending' && <UploadForm />}
      {state === 'uploading' && <UploadProgress />}
      {(state === 'uploading' || state === 'uploadComplate') && <UploadResult state={state} updateState={updateState} />}
      {state === 'uploading' && <UploadList state={state} fileList={fileList} />}
    </div>
  );
}

export default FileAction;
