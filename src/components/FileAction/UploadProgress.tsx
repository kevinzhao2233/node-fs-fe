import React from 'react';

function UploadProgress() {
  return (
    <div className="my-4 mb-8 px-3">
      <div className="flex justify-between mb-1 text-14px">
        <span>96MB / 478 MB | 20%</span>
        <span>还需 37S</span>
      </div>
      <div className="h-2 bg-blue-gray-500/10 rounded-4px overflow-hidden">
        <div className="w-[20%] h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-4px" />
      </div>
    </div>
  );
}

export default UploadProgress;
