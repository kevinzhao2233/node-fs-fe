import { usePrevious } from 'ahooks';
import React, {
  useEffect, useRef, useState,
} from 'react';

import { mergeChunks, uploadChunkFile, uploadFile } from '@/api';

import workerScript from '../../../public/md5Worker';
import DropBox from './components/DropBox';
import UploadList from './components/UploadList';
import { IFile } from './types';
import style from './Upload.module.scss';

// 其实好多参数应该是可省略的
interface ReceiveComputedParams {
  type: 'process' | 'end',
  payload: {
    error: Error | null;
    file: File;
    currentChunk: number;
    chunks: number;
    md5: string
  }
}

function Upload() {
  const worker = useRef<Worker | null>(null);
  const [fileList, setFileList] = useState<IFile[]>([]);
  const prevFileList = usePrevious(fileList);

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
    const idx = copyFileList.findIndex((file) => file.name === payload.file.name);
    if (idx < 0) return;
    if (type === 'process') {
      copyFileList[idx].md5Process = payload.currentChunk / payload.chunks;
    }
    if (type === 'end') {
      copyFileList[idx].md5 = payload.md5;
    }
    setFileList(copyFileList);
  };

  useEffect(() => {
    if (!prevFileList) return;
    if (fileList.length > prevFileList.length) {
      if (!worker.current) {
        // TODO 这里应该报错
        return;
      }
      worker.current.onmessage = (e) => {
        handleMd5Process(e.data);
      };
      fileList.forEach((file) => {
        if (!file.md5Process) {
          worker.current?.postMessage({ file: file.source });
        }
      });
    }
  }, [fileList]);

  const chooseFiles = (files: IFile[]) => {
    console.log('chooseFiles', files);
    setFileList(files);
  };

  // 发送小文件，不需要分片
  const sendSmallFile = (file: IFile) => {
    const formData = new FormData();
    formData.append('files', file.source);
    formData.append('md5', file.md5);
    console.log({ formData });
    const onUploadProgress = (pv: any) => {
      if (pv.lengthComputable) {
        const compulate = parseFloat(((pv.loaded / pv.total) * 100).toFixed(1));
        console.log({ compulate });

        const newFileList = [...fileList];
        const index = newFileList.findIndex((item) => item.name === file.name);
        newFileList[index].uploadProcess = compulate;
        setFileList(newFileList);
      }
    };
    uploadFile(formData, onUploadProgress).then((res: any) => {
      console.log({ res });
    });
  };

  const computeChunk = (file: IFile, initChunkSize = 5) => {
    const blobSlice = File.prototype.slice;
    const chunkSize = initChunkSize * 1024 * 1024;
    const chunksCount = Math.ceil(file.size / chunkSize);
    interface ChunkList {
      chunk: Blob;
      size: number;
      name: string;
    }
    const fileChunkList:ChunkList[] = [];
    for (let currentChunk = 0; currentChunk < chunksCount; currentChunk += 1) {
      const start = currentChunk * chunkSize;
      const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
      const chunk = blobSlice.call(file.source, start, end);
      fileChunkList.push({ chunk, size: chunk.size, name: file.name });
    }
    return fileChunkList;
  };

  // https://mp.weixin.qq.com/s/OSJzh1qK4ziY8C3zrySd_A
  const sendChunkFile = (file: IFile) => {
    const DefualtChunkSize = 5;
    const fileChunkList = computeChunk(file, DefualtChunkSize);

    const onUploadProgress = (pv: any) => {
      const compulate = parseFloat(((pv.loaded / pv.total) * 100).toFixed(1));
      console.log({ compulate });

      const newFileList = [...fileList];
      const index = newFileList.findIndex((item) => item.name === file.name);
      newFileList[index].uploadProcess = compulate;
      setFileList(newFileList);
    };

    const requests = fileChunkList.map((currentChunk, index) => {
      const formData = new FormData();
      formData.append('fileName', currentChunk.name);
      formData.append('chunkIndex', `${index}`);
      formData.append('chunkTotal', `${fileChunkList.length}`);
      formData.append('fileMd5', file.md5);
      formData.append('file', currentChunk.chunk);
      return uploadChunkFile(formData, onUploadProgress);
    });

    Promise.all(requests).then(() => {
      mergeChunks({ fileName: file.name, md5: file.md5, chunkTotal: fileChunkList.length });
    });
  };

  const sendFile = (file: IFile) => {
    if (file.size < 5 * 1024 * 1024) {
      sendSmallFile(file);
    } else {
      sendChunkFile(file);
    }
  };

  const cancelAll = () => {
    setFileList([]);
  };

  const startAll = () => {
    fileList.forEach((file) => {
      sendFile(file);
    });
  };

  return (
    <div className={style.container}>
      <div className={style.upload_container}>
        <h3 className={style.container_tit}>上传</h3>
        <DropBox onChooseFiles={chooseFiles} />
        <UploadList fileList={fileList} onStartAll={startAll} onCancelAll={cancelAll} />
      </div>
    </div>
  );
}

export default Upload;
