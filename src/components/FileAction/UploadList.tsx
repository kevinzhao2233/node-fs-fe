import { CloseOne } from '@icon-park/react';
import cn from 'classnames';
import fileSize from 'filesize';
import React from 'react';

import type { IFile, IFolder } from '@/types';
import { foldString } from '@/utils/util';

import type { State } from './FileAction';

interface P {
  state: State;
  fileList: IFile[] | IFolder[]
}

function UploadList({ state, fileList }: P) {
  return (
    <div className={cn(
      'max-h-40 mb-3 overflow-y-auto',
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
          <div>
            <CloseOne size="18" strokeWidth={3} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default UploadList;
