import { FileAddition, FolderDownload, FolderPlus } from '@icon-park/react';
import cn from 'classnames';
import React, { useState } from 'react';

type Action = 'uploadFile' | 'downloadFile' | 'uploadFolder'

function UploadComp() {
  const [action, setAction] = useState<Action>('uploadFile');
  return (
    <div className="flex justify-between items-center w-340px h-80px m-[30px] p-4 rounded-3xl
    bg-[#FFFFFFa7] shadow shadow-[0px_2px_24px_-4px_rgba(163,163,163,0.25)] dark:shadow-blue-gray-800"
    >
      <div className="grid place-items-center gap-4 w-9 h-9 cursor-pointer border border-gray-500 dark:border-gray-700 rounded-xl">
        { action === 'uploadFile' && <FileAddition size="24" /> }
        { action === 'uploadFolder' && <FolderPlus size="24" /> }
        { action === 'downloadFile' && <FolderDownload size="24" /> }
      </div>
      <div className="mr-auto ml-3">
        <p
          className={cn('cursor-pointer', action !== 'uploadFolder' ? 'text-2xl' : '')}
          onMouseEnter={() => { setAction('uploadFile'); }}
        >上传文件
        </p>
        <p
          className={cn('cursor-pointer', action === 'uploadFolder' ? 'text-2xl' : '')}
          onMouseEnter={() => { setAction('uploadFolder'); }}
        >上传文件夹
        </p>
      </div>
      <div
        className="grid place-items-center w-100px h-40px cursor-pointer
        bg-white rounded-3xl shadow shadow-[0px_6px_24px_rgba(150,150,150,0.25)]"
        onMouseEnter={() => { setAction('downloadFile'); }}
      >
        接收文件
      </div>
    </div>
  );
}

export default UploadComp;
