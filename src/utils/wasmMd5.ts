import { createMD5 } from 'hash-wasm';

export const computedMd5 = (async (file: File) => {
  const start = Date.now();
  const chunkSize = 64 * 1024 * 1024;
  const chunksNum = Math.ceil(file.size / chunkSize);
  const fileReader = new FileReader();
  const hasher = await createMD5();

  hasher.init();

  const hashChunk = (chunk: Blob) => new Promise((resolve) => {
    fileReader.onload = async (e) => {
      const view = new Uint8Array(e.target!.result as ArrayBuffer);
      hasher.update(view);
      resolve(true);
    };

    fileReader.readAsArrayBuffer(chunk);
  });

  for (let i = 0; i <= chunksNum; i += 1) {
    const chunk = file.slice(
      chunkSize * i,
      Math.min(chunkSize * (i + 1), file.size),
    );
    console.log(`${i + 1} / ${chunksNum}`);
    // eslint-disable-next-line no-await-in-loop
    await hashChunk(chunk);
  }

  const hash = hasher.digest();
  console.log('计算完成 md5: ', hash);
  const end = Date.now();
  console.log(`用时：${end - start}ms`);
  console.log(`速度：${file.size / 1024 / 1024 / ((end - start) / 1000)}M/s`);
  return Promise.resolve(hash);
});
