import React from 'react';

import UploadComp from '@/components/FileAction/FileAction';
import TransmitList from '@/components/TransmitList/TransmitList';

function Home() {
  return (
    <div className="grid gap-4 grid-cols-[400px_1fr] h-full">
      <div className="flex justify-end items-center">
        <UploadComp />
      </div>
      <TransmitList />
    </div>
  );
}

export default Home;
