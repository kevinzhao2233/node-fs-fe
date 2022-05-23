import {
  CloseSmall, DownSmall, More, Right, ShareOne,
} from '@icon-park/react';
import cn from 'classnames';
import React, { useState } from 'react';

function TransmitList() {
  const [activeTab, setActiveTab] = useState('upload');

  const [list, setList] = useState([{
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
              activeTab === 'upload' ? 'border-b-light-50' : 'text-gray-500/50',
            )}
            onClick={() => { setActiveTab('upload'); }}
          >我的上传
          </div>
          <div
            className={cn(
              'pb-2 border-b-4 border-transparent cursor-pointer transform translate-y-px',
              activeTab === 'receive' ? 'border-b-light-50' : 'text-gray-500/50',
            )}
            onClick={() => { setActiveTab('receive'); }}
          >我的接收
          </div>
        </div>
        <div className="overflow-auto">
          {list.map((file) => (
            <div key={file.id} className="flex justify-between items-center gap-3 p-4 rounded-xl bg-light-50/50 not-last:mb-2">
              <div className="max-w-[40%]">
                <p title={file.name} className="mb-1 font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {file.fileCount > 1 ? `${file.name} 等 ${file.fileCount} 个文件` : file.name}
                </p>
                <p className="text-14px text-gray-600/70">
                  {file.downloadCount} 次下载 | {file.fileCount} 个文件 | {file.totalSize} | {file.expirationTime} 后失效
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex justify-center items-center w-9 h-9 rounded-xl bg-light-50/70 cursor-pointer">
                  <DownSmall theme="outline" size="24" fill="#333" strokeWidth={3} />
                </div>
                <div className="flex justify-center items-center w-9 h-9 rounded-xl bg-light-50/70 cursor-pointer">
                  <CloseSmall theme="outline" size="24" fill="#333" strokeWidth={3} />
                </div>
                <div className="flex justify-center items-center w-9 h-9 rounded-xl bg-light-50/70 cursor-pointer">
                  <ShareOne theme="outline" size="18" fill="#333" strokeWidth={4} />
                </div>
                <div className="flex justify-center items-center w-9 h-9 rounded-xl bg-light-50/70 cursor-pointer">
                  <More theme="outline" size="24" fill="#333" strokeWidth={3} />
                </div>
              </div>
              <div>{file.uploadTime}</div>
              <Right theme="outline" size="24" fill="#333" strokeWidth={3} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default TransmitList;
