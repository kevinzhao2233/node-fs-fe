import { Plus } from '@icon-park/react';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import type { State } from './FileAction';

type Action = 'uploadFile' | 'receiveFile' | 'uploadFolder';

interface P {
  state: State;
  updateState: (state: State) => void;
  clearPreUpload: () => void
}

function BaseAction({ state, updateState, clearPreUpload }: P) {
  const [action, setAction] = useState<Action>('uploadFile');

  const inputFolderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputFolderRef.current) {
      inputFolderRef.current.setAttribute('directory', '');
      inputFolderRef.current.setAttribute('webkitdirectory', '');
    }
  }, [inputFolderRef]);

  const chooseFile = () => {

  };

  const chooseFolder = () => {
  };

  return (
    <div className="flex justify-between items-center px-3">
      <label
        htmlFor="inputId"
        className="block btn grid place-items-center gap-4 w-11 h-11 cursor-pointer border border-gray-500 dark:border-gray-700 rounded-xl
          hover:(text-indigo-600)"
      >
        <Plus size="20" />
      </label>
      <div className="mr-auto ml-3">
        <label
          htmlFor="inputId"
          className={cn(
            'block btn cursor-pointer transition-all duration-300 ease-out leading-none mb-1',
            action !== 'uploadFolder' ? 'text-xl font-semibold' : '',
          )}
          onMouseEnter={() => { setAction('uploadFile'); }}
        >{state === 'uploadPending' && '继续'}添加文件
        </label>
        <label
          htmlFor="inputFolderId"
          className={cn(
            'block btn cursor-pointer transition-all duration-300 ease-out leading-none',
            action === 'uploadFolder' ? 'text-xl font-semibold' : '',
          )}
          onMouseEnter={() => { setAction('uploadFolder'); }}
          onMouseLeave={() => { setAction('uploadFile'); }}
        >或添加文件夹
        </label>
      </div>
      <input type="file" id="inputId" multiple onChange={chooseFile} style={{ display: 'none' }} />
      <input ref={inputFolderRef} type="file" id="inputFolderId" multiple onChange={chooseFolder} style={{ display: 'none' }} />
      {(state === 'normal' || state === 'uploadPending') && (
        <div
          className="btn grid place-items-center w-100px h-40px cursor-pointer hover:font-semibold
          bg-white rounded-3xl shadow shadow-[0px_6px_24px_rgba(150,150,150,0.25)]
            transition-all duration-200"
          onMouseEnter={() => { if (state === 'normal') setAction('receiveFile'); }}
          onClick={() => { if (state === 'normal') { updateState('receivePending'); } else { clearPreUpload(); } }}
        >
          {state === 'uploadPending' ? '取消所有' : '接收文件'}
        </div>
      )}
    </div>
  );
}

export default BaseAction;
