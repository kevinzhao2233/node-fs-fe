import cn from 'classnames';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import type { State } from './FileAction';

function UploadComplate() {
  return (
    <div className="flex items-center justify-center h-40 font-semibold text-lg">
      <span>传输完成</span>
    </div>
  );
}

interface P {
  state: State;
  updateState: (state: State) => void
}

function UploadResult({ state, updateState }: P) {
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

  const backToNormal = () => {
    setTimeout(() => {
      updateState('normal');
    }, 200);
  };
  return (
    <div className="px-3 mb-4">
      {state === 'uploadComplate' && <UploadComplate />}
      <div className="flex justify-between items-center gap-2 h-12 font-semibold">
        <div
          className="flex items-center flex-auto p-1 h-full relative
            border-gray-500 border-2 rounded-xl overflow-hidden"
        >
          {res.link}
          <CopyToClipboard text={res.link} onCopy={() => copy('link')}>
            <div
              className="absolute left-0 top-0 w-full h-full flex justify-center items-center
              bg-light-100 dark:bg-blue-gray-700 opacity-0 hover:opacity-90 cursor-pointer transition-opacity active:text-indigo-600"
            >
              {copied.link ? '已复制' : '复制'}
            </div>
          </CopyToClipboard>
        </div>
        {
          hasPassword && (
            <div
              className="flex justify-center items-center flex-[80px] flex-grow-0 flex-shrink-0 relative
                p-1 h-full border-gray-500 border-2 rounded-xl overflow-hidden"
            >
              {res.password}
              <CopyToClipboard text={res.password} onCopy={() => copy('password')}>
                <div
                  className="absolute left-0 top-0 w-full h-full flex justify-center items-center
                  bg-light-100 dark:bg-blue-gray-700 opacity-0 hover:opacity-90 cursor-pointer transition-opacity active:text-indigo-600"
                >
                  {copied.password ? '已复制' : '复制'}
                </div>
              </CopyToClipboard>
            </div>
          )
        }
      </div>
      {state === 'uploadComplate'
      && (
        <div className="flex justify-center pt-6 pb-3">
          <button
            className="btn px-12 py-3 bg-indigo-600 text-light-50 rounded-14px font-semibold shadow-xl shadow-blue-500/50"
            type="button"
            onClick={backToNormal}
          >再传一次
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadResult;
