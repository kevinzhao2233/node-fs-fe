import classNames from 'classnames';

import { IFile } from '../types';
import style from './UploadList.module.scss';

interface IProps {
  fileList: IFile[];
  onCancelAll(): void;
  onStartAll(): void;
}

function UploadList({ fileList, onCancelAll, onStartAll }: IProps) {
  /**
   * 全部取消上传
   */
  const cancelAll = () => {
    onCancelAll();
  };

  /**
   * 全部开始上传
   */
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
                <p className={style.fileName}>{ file.name }</p>
                <p className={style.fileDesc}>
                  <span>{ Math.floor(file.md5Process * 100) }%</span>
                  {/* <span v-if="file.process < 100">大约还需 -- 秒</span> */}
                </p>
              </div>
              <div>
                <i className={classNames(style.icon, style.iconClose, 'ri-close-line')} />
              </div>
            </div>
            <div className={style.fileProcess}>
              <div className={style.process} style={{ width: `${Math.floor(file.md5Process * 100)}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UploadList;
