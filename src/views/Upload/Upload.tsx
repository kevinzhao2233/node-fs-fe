import axios from 'axios';
import React, { useState } from 'react';

import DropBox from './components/DropBox';
import { IFile } from './types';
import style from './Upload.module.scss';

function Upload() {
  const [fileList, setFileList] = useState<IFile[]>([]);

  const chooseFiles = (files: IFile[]) => {
    console.log(files);
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
          newFileList[index].process = compulate;
          setFileList(newFileList);
        }
      },
    }).then((res: any) => {
      console.log({ res });
    });
  };

  return (
    <div className={style.container}>
      <div className={style.upload_container}>
        <h3 className={style.container_tit}>上传</h3>
        <DropBox onChooseFiles={chooseFiles} />
      </div>
    </div>
  );
}

export default Upload;
