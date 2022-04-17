import { usePrevious } from 'ahooks';
import axios from 'axios';
import React, {
  useEffect, useRef, useState,
} from 'react';

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

  const receiveComputedResult = ({ type, payload }: ReceiveComputedParams) => {
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
        // 这里应该报错
        return;
      }
      worker.current.onmessage = (e) => {
        receiveComputedResult(e.data);
      };
      fileList.forEach((file) => {
        if (!file.md5Process) {
          worker.current?.postMessage({ file: file.source });
        }
      });
    }
  }, [fileList]);

  const chooseFiles = (files: IFile[]) => {
    setFileList(files);
  };

  const sendFile = (file: IFile) => {
    const formData = new FormData();
    formData.append('files', file.source);
    console.log({ formData });
    axios.post('http://localhost:10001/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (pv: any) => {
        if (pv.lengthComputable) {
          const compulate = parseFloat(((pv.loaded / pv.total) * 100).toFixed(1));
          console.log({ compulate });

          const newFileList = [...fileList];
          const index = newFileList.findIndex((item) => item.name === file.name);
          newFileList[index].uploadProcess = compulate;
          setFileList(newFileList);
        }
      },
    }).then((res: any) => {
      console.log({ res });
    });
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
