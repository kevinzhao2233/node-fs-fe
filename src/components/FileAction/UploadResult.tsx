import cn from 'classnames';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import type { State } from './FileAction';

interface P {
  state: State
}

function UploadResult({ state }: P) {
  const [hasPassword, setHasPassword] = useState(true);
  const res = {
    link: 'http://baidu.com/link/1234312313',
    password: '1234',
  };
  const [copied, setCopied] = useState({
    link: false,
    password: false,
  });
  const timeoutID: Record<string, any> = {
    link: undefined,
    password: undefined,
  };
  // TODO 这个清除 timeout 的不管用，检查是不是 react 的问题
  const copy = (target: string) => {
    clearTimeout(timeoutID[target]);
    setCopied({
      ...copied,
      [target]: true,
    });
    timeoutID[target] = setTimeout(() => {
      setCopied({
        ...copied,
        [target]: false,
      });
    }, 2000);
  };
  return (
    <div className="px-3 mb-4">
      {state === 'upload-complate' && <div>传输完成</div>}
      <div className="flex justify-between items-center gap-2 h-12 font-semibold">
        <div
          className="flex items-center flex-auto p-1 h-full relative
            border-gray-500 border-1 rounded-xl overflow-hidden"
        >
          {res.link}
          <CopyToClipboard text={res.link} onCopy={() => copy('link')}>
            <div
              className="absolute left-0 top-0 w-full h-full flex justify-center items-center
              bg-light-100 dark:bg-blue-gray-700 opacity-0 hover:opacity-90 cursor-pointer transition-opacity active:text-blue-600"
            >
              {copied.link ? '已复制' : '复制'}
            </div>
          </CopyToClipboard>
        </div>
        {
          hasPassword && (
            <div
              className="flex justify-center items-center flex-[80px] flex-grow-0 flex-shrink-0 relative
                p-1 h-full border-gray-500 border-1 rounded-xl overflow-hidden"
            >
              {res.password}
              <CopyToClipboard text={res.password} onCopy={() => copy('password')}>
                <div
                  className="absolute left-0 top-0 w-full h-full flex justify-center items-center
                  bg-light-100 dark:bg-blue-gray-700 opacity-0 hover:opacity-90 cursor-pointer transition-opacity active:text-blue-600"
                >
                  {copied.password ? '已复制' : '复制'}
                </div>
              </CopyToClipboard>
            </div>
          )
        }
      </div>
      {state === 'upload-complate'
      && <div className="btn">再传一次</div>}
    </div>
  );
}

export default UploadResult;
