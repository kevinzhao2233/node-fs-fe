import React from 'react';

import UploadComp from '@/components/FileAction';
import TransmitList from '@/components/TransmitList';

function Home() {
  return (
    <div className="grid gap-4 grid-cols-[400px_1fr] h-full">
      <UploadComp />
      <TransmitList />
    </div>
  );
}

export default Home;
