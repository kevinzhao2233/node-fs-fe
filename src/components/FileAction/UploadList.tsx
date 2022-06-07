import { CloseOne } from '@icon-park/react';
import classNames from 'classnames';
import React, { useState } from 'react';

import { foldString } from '@/utils/util';

import type { State } from './FileAction';

interface P {
  state: State
}

function UploadList({ state }: P) {
  const [fileList, setFileList] = useState([
    { name: 'hello.jpg', size: 1234 },
    { name: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈.jpg', size: 1234 },
    { name: '哈哈哈哈哈.jpg', size: 1234 },
  ]);
  return (
    <div className={classNames('max-h-40 mb-3 overflow-y-auto', state === 'upload-pending' ? 'border-b-1 border-gray-300' : '')}>
      {fileList.map((file) => (
        <div key={file.name} className="flex justify-between items-center py-2 px-3">
          <div>
            <p className="text-14px mb-1">{foldString(file.name, 20)}</p>
            <p className="text-12px text-gray-400">{file.size}MB</p>
          </div>
          <div>
            <CloseOne size="18" fill="#333" strokeWidth={3} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default UploadList;
