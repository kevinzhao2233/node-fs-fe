import React, { useState } from 'react';

import type { State } from './FileAction';

interface P {
  state: State
}

function UploadResult({ state }: P) {
  const [hasPassword, setHasPassword] = useState(true);
  const res = {
    link: 'http://baidu.com/link/1234',
    password: '1234',
  };
  return (
    <div className="px-3 mb-4">
      {state === 'upload-complate' && <div>传输完成</div>}
      <div className="flex justify-between items-center gap-2 h-12">
        <div className="flex items-center flex-auto p-1 h-full border-gray-500 border-1 rounded-xl">{res.link}</div>
        {hasPassword
        && <div className="flex items-center flex-[100px] p-1 h-full border-gray-500 border-1 rounded-xl">{res.password}</div>}
      </div>
      {state === 'upload-complate'
      && <div className="btn">再传一次</div>}
    </div>
  );
}

export default UploadResult;
