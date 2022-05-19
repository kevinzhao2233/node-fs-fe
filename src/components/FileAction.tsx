import { FileAddition, FolderDownload, FolderPlus } from '@icon-park/react';
import React, { useState } from 'react';

type Action = 'uploadFile' | 'downloadFile' | 'uploadFolder'

function UploadComp() {
  const [action, setAction] = useState<Action>('uploadFile');
  return (
    <div className="flex justify-between items-center w-340px min-h-15 m-[30px] p-3 rounded-3xl border-2 border-gray-300
    dark:border-gray-700 shadow-2xl shadow-blue-gray-300 dark:shadow-blue-gray-800"
    >
      <div className="grid place-items-center gap-4 w-9 h-9 cursor-pointer border border-gray-300 dark:border-gray-700 rounded-xl">
        { action === 'uploadFile' && <FileAddition size="24" /> }
        { action === 'uploadFolder' && <FolderPlus size="24" /> }
        { action === 'downloadFile' && <FolderDownload size="24" /> }
      </div>
      <div className="mr-auto ml-3">
        <p className="cursor-pointer" onMouseEnter={() => { setAction('uploadFile'); }}>上传文件</p>
        <p className="cursor-pointer" onMouseEnter={() => { setAction('uploadFolder'); }}>上传文件夹</p>
      </div>
      <div
        className="grid place-items-center w-100px h-40px cursor-pointer border border-gray-300 dark:border-gray-700 rounded-3xl"
        onMouseEnter={() => { setAction('downloadFile'); }}
      >
        接收文件
      </div>
    </div>
  );
}

export default UploadComp;
