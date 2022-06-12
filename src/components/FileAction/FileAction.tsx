import { Plus } from '@icon-park/react';
import cn from 'classnames';
import React, { useState } from 'react';

import UploadForm from './UploadForm';
import UploadList from './UploadList';
import UploadProgress from './UploadProgress';
import UploadResult from './UploadResult';

type Action = 'uploadFile' | 'receiveFile' | 'uploadFolder';

export type State =
'normal' | // 初始状态，等待用户选择上传文件、接收文件等等
'upload-pending' |
'uploading' |
'upload-complate'

function UploadComp() {
  const [action, setAction] = useState<Action>('uploadFile');

  const [state, setState] = useState<State>('upload-pending');

  const updateState = (_state: State) => {
    setState(_state);
  };

  return (
    <div className="w-340px h-auto m-7 mr-2 mb-15 p-4 pb-8 rounded-3xl transition-all duration-300 ease-out
    bg-white/50 select-none border border-white dark:(border-1 border-gray-700 bg-blue-gray-800/50)"
    >
      {state === 'upload-pending' && <UploadList state={state} />}
      {(state === 'normal' || state === 'upload-pending') && (
        <div className="flex justify-between items-center px-3">
          <div
            className="btn grid place-items-center gap-4 w-11 h-11 cursor-pointer border border-gray-500 dark:border-gray-700 rounded-xl"
          >
            <Plus size="20" />
          </div>
          <div className="mr-auto ml-3">
            <p
              className={cn(
                'btn cursor-pointer transition-all duration-300 ease-out leading-none mb-1',
                action !== 'uploadFolder' ? 'text-xl font-semibold' : '',
              )}
              onMouseEnter={() => { setAction('uploadFile'); }}
            >{state === 'upload-pending' && '继续'}添加文件
            </p>
            <p
              className={cn(
                'btn cursor-pointer transition-all duration-300 ease-out leading-none',
                action === 'uploadFolder' ? 'text-xl font-semibold' : '',
              )}
              onMouseEnter={() => { setAction('uploadFolder'); }}
              onMouseLeave={() => { setAction('uploadFile'); }}
            >{state === 'upload-pending' && '继续'}添加文件夹
            </p>
          </div>
          {state === 'normal' && (
            <div
              className="btn grid place-items-center w-100px h-40px cursor-pointer hover:font-semibold
              bg-white rounded-3xl shadow shadow-[0px_6px_24px_rgba(150,150,150,0.25)]
              transition-all duration-200"
              onMouseEnter={() => { setAction('receiveFile'); }}
            >
              接收文件
            </div>
          )}
        </div>
      )}
      {state === 'upload-pending' && (
        <>
          <UploadForm />
          <div className="flex justify-center pt-6 pb-3">
            <button
              className="btn px-12 py-3 bg-indigo-600 text-light-50 rounded-14px font-semibold
                shadow-xl shadow-indigo-500/50 dark:shadow-indigo-700/50"
              type="button"
            >开始上传
            </button>
          </div>
        </>
      )}
      {state === 'uploading' && <UploadProgress />}
      {(state === 'uploading' || state === 'upload-complate') && <UploadResult state={state} updateState={updateState} />}
      {state === 'uploading' && <UploadList state={state} />}
    </div>
  );
}

export default UploadComp;
