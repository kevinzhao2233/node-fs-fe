import { CloseOne, LoadingFour } from '@icon-park/react';
import cn from 'classnames';
import fileSize from 'filesize';
import React from 'react';

import type { IFile, IFolder } from '@/types';
import { foldString } from '@/utils/util';

import type { State } from './FileAction';

interface P {
  state: State;
  fileList: (IFile | IFolder)[];
  onRemoveFile?: (uploadItem: IFile | IFolder) => void
}

function UploadList({ state, fileList, onRemoveFile }: P) {
  return (
    <div className={cn(
      'max-h-40 mb-3 overflow-y-auto scroll-bar',
      state === 'uploadPending' ? 'border-b-1 border-gray-300 dark:border-gray-700' : '',
    )}
    >
      {fileList.map((file) => (
        <div key={file.name} className="flex justify-between items-center py-2 px-3">
          <div>
            <p className="text-14px mb-1">{foldString(file.name, 20)}</p>
            <p className="text-12px text-gray-400">
              { file.isFolder && `共 ${(file as IFolder).files.length} 个文件 · `}
              {file.isFolder && '共 '}{fileSize(file.size, { standard: 'jedec' })}
            </p>
          </div>
          <div className="flex gap-2">
            {file.state === 'processingMd5' && <LoadingFour className="animate-spin" size="18" strokeWidth={3} />}
            {state !== 'uploading' ? (
              <CloseOne
                className="btn cursor-pointer hover:text-indigo-500"
                size="18"
                strokeWidth={3}
                onClick={() => { onRemoveFile?.(file); }}
              />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

UploadList.defaultProps = {
  onRemoveFile: () => {
    console.warn('>> COMP UploadList | 父组件未传递 onRemoveFile 方法');
  },
};

export default UploadList;
