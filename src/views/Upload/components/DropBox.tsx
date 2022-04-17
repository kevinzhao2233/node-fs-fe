import React from 'react';

import { IFile } from '../types';
import style from './DropBox.module.scss';

interface IProps {
  onChooseFiles(files: IFile[]): void
}

function DropBox({ onChooseFiles }: IProps) {
  /**
   * 填充一个适用于本项目的文件列表
   * @param files 原始文件列表
   * @returns 经过包装的文件列表
   */
  const populateFile = (files: FileList) => {
    const result: IFile[] = [];
    if (files?.length) {
      for (let idx = 0; idx < files.length; idx += 1) {
        const file = files.item(idx) as File;
        result.push({
          name: file.name,
          size: file.size,
          type: file.type,
          uploadProcess: 0,
          md5Process: 0,
          md5: '',
          source: file,
        });
      }
    }
    return result;
  };

  /**
   * 选择文件后触发
   * @param e Input 的 change 事件
   */
  const chooseUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length) {
      onChooseFiles(populateFile(files));
    }
  };

  /**
   * 拖拽经过区域，展示移动的图标
   * @param e 拖拽事件
   */
  const fileDragover = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer?.dropEffect) {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  /**
   * 文件被放置到区域
   * @param e 拖拽事件
   * @returns undefined
   */
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
