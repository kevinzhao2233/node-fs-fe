import { Plus } from '@icon-park/react';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import React, { useEffect, useRef, useState } from 'react';

import type { IFile, IFolder } from '../../types';
import type { State } from './FileAction';

type Action = 'uploadFile' | 'receiveFile' | 'uploadFolder';

interface P {
  state: State;
  updateState: (state: State) => void;
  clearPreUpload: () => void;
  fileList:(IFile | IFolder)[];
  onChooseFile: (fileList: (IFile | IFolder)[]) => void;
  onChooseFolder: (folderList: (IFile | IFolder)[]) => void;
}

function BaseAction({
  state, updateState, clearPreUpload, fileList, onChooseFile, onChooseFolder,
}: P) {
  const [action, setAction] = useState<Action>('uploadFile');

  const inputFileRef = useRef<HTMLInputElement>(null);

  const inputFolderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputFolderRef.current) {
      inputFolderRef.current.setAttribute('directory', '');
      inputFolderRef.current.setAttribute('webkitdirectory', '');
    }
  }, [inputFolderRef]);

  const removeDuplicates = (origin: (IFile | IFolder)[], current: (IFile | IFolder)[]) => {
    const originMap: any = {};
    origin.forEach((item) => {
      originMap[item.name] = 1;
    });
    const removedDups: (IFile | IFolder)[] = [];
    const duplicateNames: string[] = [];
    current.forEach((item) => {
      if (originMap[item.name]) {
        duplicateNames.push(item.name);
      } else {
        removedDups.push(item);
      }
    });
    return { removedDups, duplicateNames };
  };

  const chooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files?.length) return;

    const tempFileList: IFile[] = [];

    for (let idx = 0; idx < files.length; idx += 1) {
      const file = files.item(idx) as File;
      tempFileList.push({
        id: nanoid(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadProcess: 0,
        md5Process: 0,
        md5: '',
        source: file,
        state: 'chosen',
        isFolder: false,
      });
    }

    const { removedDups, duplicateNames } = removeDuplicates(fileList, tempFileList);

    if (duplicateNames.length > 0) {
      alert(`${duplicateNames.join('，')} ${duplicateNames.length < 1 ? '已在上传列表' : `等 ${duplicateNames.length} 个文件已在上传列表`}，已帮你过滤`);
    }

    onChooseFile([...fileList, ...removedDups]);
    if (inputFileRef.current) inputFileRef.current.value = '';
  };

  const chooseFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files?.length) return;

    const tempFileList: IFile[] = [];

    const tempFolderList: IFolder[] = [];

    let totalSize = 0;

    const folderId = nanoid();

    const folderName = files[0].webkitRelativePath.split('/')[0];

    for (let idx = 0; idx < files.length; idx += 1) {
      const file = files.item(idx) as File;
      totalSize = file.size + totalSize;
      tempFileList.push({
        id: nanoid(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadProcess: 0,
        md5Process: 0,
        md5: '',
        state: 'chosen',
        relativePath: file.webkitRelativePath,
        source: file,
        isFolder: false,
        folderId,
      });
    }

    tempFolderList.push(
      {
        id: folderId,
        name: folderName,
        isFolder: true,
        size: totalSize,
        files: tempFileList,
        state: 'chosen',
      },
    );

    const { removedDups, duplicateNames } = removeDuplicates(fileList, tempFolderList);

    if (duplicateNames.length > 0) {
      alert(`${duplicateNames.join('，')} ${duplicateNames.length < 1 ? '目录已在上传列表' : `等 ${duplicateNames.length} 个目录已在上传列表`}，已帮你过滤`);
    }

    onChooseFolder([...fileList, ...removedDups]);
    if (inputFolderRef.current) inputFolderRef.current.value = '';
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
      <input ref={inputFileRef} type="file" id="inputId" multiple onChange={chooseFile} style={{ display: 'none' }} />
      <input ref={inputFolderRef} type="file" id="inputFolderId" multiple onChange={chooseFolder} style={{ display: 'none' }} />
      {(state === 'normal' || state === 'uploadPending') && (
        <div
          className="btn grid place-items-center w-100px h-40px cursor-pointer hover:font-semibold
          bg-white rounded-3xl dark:bg-blue-gray-700/70
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
