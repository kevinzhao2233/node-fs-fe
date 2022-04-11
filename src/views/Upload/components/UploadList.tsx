import classNames from 'classnames';
import React from 'react';

import { IFile } from '../types';
import style from './UploadList.module.scss';

interface IProps {
  fileList: IFile[];
  onCancelAll(): void;
  onStartAll(): void;
}

function UploadList({ fileList, onCancelAll, onStartAll }: IProps) {
  const cancelAll = () => {
    onCancelAll();
  };
  const startAll = () => {
    onStartAll();
  };
  return (
    <div>
      { !!fileList.length && (
        <div className={style.uploadActions}>
          <button className={style.actionButton} type="button" onClick={startAll}>全部开始</button>
          <button className={classNames(style.actionButton, style.redBtn)} type="button" onClick={cancelAll}>全部取消</button>
        </div>
      )}
      <ul className={style.uploadList}>
        {fileList.map((file) => (
          <li key={file.name} className={style.uploadFile}>
            <div className={style.fileContainer}>
              <div className={style.fileContent}>
                <p className={style.fineName}>{ file.name }</p>
                <p className={style.fileDesc}>
                  <span>{ file.process }%</span>
                  {/* <span v-if="file.process < 100">大约还需 -- 秒</span> */}
                </p>
              </div>
              <div>
                <i className={classNames(style.icon, style.iconClose, 'ri-close-line')} />
              </div>
            </div>
            <div className={style.fileProcess}>
              <div className={style.process} style={{ width: `${file.process}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UploadList;
