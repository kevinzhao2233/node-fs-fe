import React from 'react';

import { IFile } from '../types';
import style from './DropBox.module.scss';

interface IProps {
  onChooseFiles(files: IFile[]): void
}

function DropBox({ onChooseFiles }: IProps) {
  const populateFile = (files: FileList) => {
    const result: IFile[] = [];
    if (files?.length) {
      for (let idx = 0; idx < files.length; idx += 1) {
        const file = files.item(idx) as File;
        result.push({
          name: file.name,
          size: file.size,
          type: file.type,
          process: 0,
          source: file,
        });
      }
    }
    return result;
  };

  const chooseUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length) {
      onChooseFiles(populateFile(files));
    }
  };
  const fileDragover = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer?.dropEffect) {
      e.dataTransfer.dropEffect = 'move';
    }
  };
  const fileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!e.dataTransfer?.files) return;
    onChooseFiles(populateFile(e.dataTransfer.files));
  };

  return (
    <div className={style.dropContainer} onDragOver={fileDragover} onDrop={fileDrop}>
      <p className={style.description}>
        拖拽文件到这里，或
        {' '}
        <label htmlFor="fileInputId">选择文件</label>
      </p>
      <p className={style.subDesc}>文件最大支持 20MB</p>
      <input type="file" id="fileInputId" multiple onChange={chooseUploadFile} style={{ display: 'none' }} />
    </div>
  );
}

export default DropBox;
