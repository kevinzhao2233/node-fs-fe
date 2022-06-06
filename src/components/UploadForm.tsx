import React from 'react';

import Select from './Base/Select';
import Switch from './Base/Switch';

function UploadForm() {
  const expirationTimes = ['1 天', '3 天', '7 天'];
  return (
    <div className="mt-3 border-t-1 border-gray-300">
      <div className="flex justify-between items-center h-12 px-3 border-b-1 border-gray-300">
        <p>有效期</p>
        <Select options={expirationTimes} />
      </div>
      <div className="flex justify-between items-center h-12 px-3 border-b-1 border-gray-300">
        <p>下载需要密码</p>
        <Switch />
      </div>
      <div className="h-20 px-2 py-2 border-gray-300 relative">
        <textarea
          className="p-1 w-full h-full border-gray-400 border-dashed border-1 focus:border-gray-600
            bg-transparent resize-none outline-none rounded-8px"
          placeholder="描述信息"
        />
      </div>
    </div>
  );
}

export default UploadForm;
