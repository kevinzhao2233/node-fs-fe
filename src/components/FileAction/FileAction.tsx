import cn from 'classnames';
import React, { useEffect, useState } from 'react';

import { IFile, IFolder } from '@/types';

import BaseAction from './BaseAction';
import UploadForm from './UploadForm';
import UploadList from './UploadList';
import UploadProgress from './UploadProgress';
import UploadResult from './UploadResult';

export type State =
  'normal' | // 初始状态，等待用户选择上传文件、接收文件等等
  'uploadPending' |
  'uploading' |
  'uploadComplate' |
  'receivePending'

function FileAction() {
  const [state, setState] = useState<State>('normal');

  const updateState = (_state: State) => {
    setState(_state);
  };

  const clearPreUpload = () => {
    setState('normal');
  };

  const [fileList, setFileList] = useState<(IFile | IFolder)[]>([]);

  useEffect(() => {
    if (fileList.length) { setState('uploadPending'); }
    if (fileList.length === 0) (setState('normal'));
  }, [fileList]);

  const RemoveFile = (file: IFile | IFolder) => {
    const index = fileList.findIndex((item) => item.name === file.name);
    const cpFileList = [...fileList];

    cpFileList.splice(index, 1);
    setFileList(cpFileList);
  };

  return (
    <div className={cn(
      'w-340px h-auto m-7 mr-2 mb-15 p-4 rounded-3xl transition-all duration-300 ease-out',
      'bg-white/50 select-none border border-white dark:(border-1 border-gray-700 bg-blue-gray-800/50)',
      state === 'normal' ? 'pb-4' : 'pb-8',
    )}
    >
      {state === 'uploadPending' && <UploadList state={state} fileList={fileList} onRemoveFile={(file) => RemoveFile(file)} />}
      {(state === 'normal' || state === 'uploadPending')
       && (
         <BaseAction
           state={state}
           updateState={updateState}
           clearPreUpload={clearPreUpload}
           onChooseFile={(tempFileList) => { setFileList(tempFileList); }}
           onChooseFolder={(tempFolderList) => { setFileList(tempFolderList); }}
         />
       )}
      {state === 'uploadPending' && <UploadForm />}
      {state === 'uploading' && <UploadProgress />}
      {(state === 'uploading' || state === 'uploadComplate') && <UploadResult state={state} updateState={updateState} />}
      {state === 'uploading' && <UploadList state={state} fileList={fileList} />}
    </div>
  );
}

export default FileAction;
