import cn from 'classnames';
import React, { useState } from 'react';

import ListItem, { FileItem } from './TransmitItem';

function TransmitList() {
  const [activeTab, setActiveTab] = useState('upload');

  const [list, setList] = useState<FileItem[]>([{
    id: '1',
    name: '这是一个文件.jpg',
    downloadCount: 21,
    fileCount: 1,
    totalSize: '123MB',
    uploadTime: '2022-5-23',
    expirationTime: '24 小时',
  }, {
    id: '2',
    name: '随便文件.jpg',
    downloadCount: 21,
    fileCount: 3,
    totalSize: '123MB',
    uploadTime: '2022-5-23',
    expirationTime: '24 小时',
  }]);

  return (
    <div className="px-7 py-15 overflow-hidden">
      <div className="px-3 py-5 h-auto max-h-full rounded-3xl border-light-500 border bg-light-50/20">
        <div className="flex gap-10 mb-8 border-b-1 border-b-light-50 font-semibold select-none">
          <div
            className={cn(
              'pb-2 border-b-4 border-transparent cursor-pointer transform translate-y-px',
              activeTab === 'upload' ? 'border-b-blue-600 text-blue-600' : 'text-gray-500/50',
            )}
            onClick={() => { setActiveTab('upload'); }}
          >我的上传
          </div>
          <div
            className={cn(
              'pb-2 border-b-4 border-transparent cursor-pointer transform translate-y-px',
              activeTab === 'receive' ? 'border-b-blue-600 text-blue-600' : 'text-gray-500/50',
            )}
            onClick={() => { setActiveTab('receive'); }}
          >我的接收
          </div>
        </div>
        <div className="overflow-auto">
          {list.map((file) => (
            <ListItem file={file} key={file.id} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default TransmitList;
