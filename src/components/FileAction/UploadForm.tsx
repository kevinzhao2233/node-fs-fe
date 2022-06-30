import React, { useState } from 'react';

import Select from '../Base/Select';
import Switch from '../Base/Switch';

export interface UploadConfig {
  expirationTime: string,
  needPassword: boolean,
  description: string,
}
interface P {
  onUpload: (uploadConfig: UploadConfig) => void
}

function UploadForm(props: P) {
  const { onUpload } = props;
  const expirationTimes = [
    { label: '1 天', value: '1-day' },
    { label: '3 天', value: '3-day' },
    { label: '7 天', value: '7-day' },
  ];

  const [formData, setFormData] = useState<UploadConfig>({
    expirationTime: '1-day',
    needPassword: false,
    description: '',
  });

  const handleUpload = () => {
    onUpload(formData);
  };
  return (
    <div className="mt-3 border-t-1 border-gray-300 dark:border-gray-700">
      <div className="flex justify-between items-center h-12 px-3 border-b-1 border-gray-300 dark:border-gray-700">
        <p>有效期</p>
        <Select
          options={expirationTimes}
          value={formData.expirationTime}
          onChange={(time) => setFormData({ ...formData, expirationTime: time })}
        />
      </div>
      <div className="flex justify-between items-center h-12 px-3 border-b-1 border-gray-300 dark:border-gray-700">
        <p>下载需要密码</p>
        <Switch checked={formData.needPassword} onChange={(checked) => { setFormData({ ...formData, needPassword: checked }); }} />
      </div>
      <div className="h-20 px-2 py-2 border-gray-300 relative">
        <textarea
          className="p-1 w-full h-full border-gray-400 border-dashed border-1 focus:border-gray-600
            bg-transparent resize-none outline-none rounded-8px dark:border-gray-600 dark:focus:border-gray-400"
          placeholder="描述信息"
          value={formData.description}
          onChange={(val) => setFormData({ ...formData, description: val.target.value })}
        />
      </div>
      <div className="flex justify-center pt-6 pb-3">
        <button
          className="btn px-12 py-3 bg-indigo-600 text-light-50 rounded-14px font-semibold
            shadow-xl shadow-indigo-500/50 dark:shadow-indigo-700/50"
          type="button"
          onClick={handleUpload}
        >开始上传
        </button>
      </div>
    </div>
  );
}

export default UploadForm;
