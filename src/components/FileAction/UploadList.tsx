import { CloseOne } from '@icon-park/react';
import cn from 'classnames';
import React, { useState } from 'react';

import { foldString } from '@/utils/util';

import type { IFile, State } from './FileAction';

interface P {
  state: State;
  fileList: IFile[]
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
            <p className="text-12px text-gray-400">{file.size}MB</p>
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
