import React from 'react';

import UploadComp from '@/components/UploadComp';

function Home() {
  return (
    <div className="grid gap-4 grid-cols-[300px_1fr] p-1">
      <div>
        <UploadComp />
      </div>
      <div>文件列表</div>
    </div>
  );
}

export default Home;
