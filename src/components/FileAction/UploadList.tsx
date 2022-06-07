import { CloseOne } from '@icon-park/react';
import React, { useState } from 'react';

import { foldString } from '@/utils/util';

function UploadList() {
  const [fileList, setFileList] = useState([
    { name: 'hello.jpg', size: 1234 },
    { name: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈.jpg', size: 1234 },
    { name: '哈哈哈哈哈.jpg', size: 1234 },
  ]);
  return (
    <div className="max-h-40 mb-3 border-b-1 border-gray-300 overflow-y-auto">
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
