import { Plus } from '@icon-park/react';
import cn from 'classnames';
import React, { useState } from 'react';

type Action = 'uploadFile' | 'downloadFile' | 'uploadFolder'

function UploadComp() {
  const [action, setAction] = useState<Action>('uploadFile');
  return (
    <div className="flex justify-between items-center w-340px h-80px m-[30px] mt-[30vh] p-4 rounded-3xl
    bg-[#FFFFFFa7] shadow-xl shadow-gray-200/40 dark:shadow-gray-800/40 select-none"
    >
      <div className="grid place-items-center gap-4 w-11 h-11 cursor-pointer border border-gray-500 dark:border-gray-700 rounded-xl">
        <Plus size="20" />
      </div>
      <div className="mr-auto ml-3">
        <p
          className={cn(
            'cursor-pointer transition-all duration-300 ease-out leading-none mb-1',
            action !== 'uploadFolder' ? 'text-xl font-semibold' : 'text-gray-900/80',
          )}
          onMouseEnter={() => { setAction('uploadFile'); }}
        >添加文件
        </p>
        <p
          className={cn(
            'cursor-pointer transition-all duration-300 ease-out leading-none',
            action === 'uploadFolder' ? 'text-xl font-semibold' : 'text-gray-900/80',
          )}
          onMouseEnter={() => { setAction('uploadFolder'); }}
          onMouseLeave={() => { setAction('uploadFile'); }}
        >添加文件夹
        </p>
      </div>
      <div
        className="grid place-items-center w-100px h-40px cursor-pointer hover:font-semibold
        bg-white rounded-3xl shadow shadow-[0px_6px_24px_rgba(150,150,150,0.25)]
        transition-all duration-200"
        onMouseEnter={() => { setAction('downloadFile'); }}
      >
        接收文件
      </div>
    </div>
  );
}

export default UploadComp;
