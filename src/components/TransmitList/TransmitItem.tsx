import {
  CloseSmall, CopyLink, DeleteFour, DownSmall, More, Right, ShareOne,
} from '@icon-park/react';
import cn from 'classnames';
import React, { useState } from 'react';

export interface FileItem {
  id: string;
  name: string;
  downloadCount: number;
  fileCount: number;
  totalSize: string;
  uploadTime: string;
  expirationTime: string;
}

function ListItem({ file }: {file: FileItem}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="flex justify-between items-center gap-3 p-4 rounded-xl bg-light-50/50 not-last:mb-2 dark:bg-blue-gray-800/50"
      onMouseEnter={() => { setIsHover(true); }}
      onMouseLeave={() => { setIsHover(false); }}
    >
      <div className="max-w-[40%]">
        <p title={file.name} className="mb-1 font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis cursor-pointer">
          {file.fileCount > 1 ? `${file.name} 等 ${file.fileCount} 个文件` : file.name}
        </p>
        <p className="text-14px text-gray-600/70">
          {file.downloadCount} 次下载 | {file.fileCount} 个文件 | {file.totalSize} | {file.expirationTime} 后失效
        </p>
      </div>
      <div className={cn('flex gap-4', isHover ? 'visible' : 'invisible')}>
        <div className="btn flex justify-center items-center w-9 h-9 rounded-xl bg-light-50/70 cursor-pointer">
          <DownSmall theme="outline" size="24" fill="#333" strokeWidth={3} />
        </div>
        <div className="btn flex justify-center items-center w-9 h-9 rounded-xl bg-light-50/70 cursor-pointer">
          <DeleteFour theme="outline" size="20" fill="#333" strokeWidth={3.5} />
        </div>
        <div className="btn flex justify-center items-center w-9 h-9 rounded-xl bg-light-50/70 cursor-pointer">
          <CopyLink theme="outline" size="20" fill="#333" strokeWidth={3} />
        </div>
        <div className="btn flex justify-center items-center w-9 h-9 rounded-xl bg-light-50/70 cursor-pointer">
          <More theme="outline" size="24" fill="#333" strokeWidth={3} />
        </div>
      </div>
      <div>{file.uploadTime}</div>
      <Right
        className="cursor-pointer transform transition-transform hover:translate-x-1"
        theme="outline"
        size="24"
        fill="#333"
        strokeWidth={3}
      />
    </div>
  );
}

export default ListItem;
