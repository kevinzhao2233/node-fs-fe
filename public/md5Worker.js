/// <reference path="md5Worker.d.ts" />
/* global importScripts hashwasm */

/**
 * 文件中的 file 变量都是根据业务封装后的，源文件在 file.source
 */

// worker 相关的代码
const workerCode = () => {
  importScripts('https://cdn.jsdelivr.net/npm/hash-wasm@4/dist/md5.umd.min.js');

  const computedMd5 = async ({
    file, chunkSize: initChunkSize = 64, onProcess, onEnd,
  }) => {
    const sourceFile = file.source;
    const startTime = Date.now();
    const blobSlice = File.prototype.slice;
    const chunkSize = initChunkSize * 1024 * 1024;
    const chunks = Math.ceil(sourceFile.size / chunkSize);
    const fileReader = new FileReader();
    const hasher = await hashwasm.createMD5();

    hasher.init();

    let currentChunk = 0;

    const loadNext = () => {
      const start = currentChunk * chunkSize;
      const end = ((start + chunkSize) >= sourceFile.size) ? sourceFile.size : start + chunkSize;
      const chunk = blobSlice.call(sourceFile, start, end);

      fileReader.readAsArrayBuffer(chunk);
    };

    fileReader.onload = (e) => {
      const view = new Uint8Array(e.target.result);
      hasher.update(view);

      currentChunk += 1;

      if (currentChunk < chunks) {
        loadNext();
        onProcess(currentChunk, chunks, { ...file, source: sourceFile });
      } else {
        onProcess(currentChunk, chunks, { ...file, source: sourceFile });
        const md5 = hasher.digest();
        const endTime = Date.now();
        console.log(
          '>> md5 计算完成: ',
          '文件名：',
          file.name,
          'md5:',
          md5,
          `用时：${endTime - startTime}ms`,
          `速度：${sourceFile.size / 1024 / 1024 / ((endTime - startTime) / 1000)}M/s`,
        );
        onEnd(null, md5, { ...file, source: sourceFile });
      }
    };

    fileReader.onerror = (error) => {
      console.warn('oops, 计算 MD5 出错了', error);
      onEnd(error);
    };

    loadNext();
  };

  this.onmessage = function m(e) {
    // console.log('worker 收到 main 的消息', e.data);
    if (!e.data.file) return;
    computedMd5({
      file: e.data.file,
      chunkSize: e.data.chunkSize,
      onProcess: (currentChunk, chunks, file) => {
        this.postMessage({
          type: 'process',
          payload: { currentChunk, chunks, file },
        });
      },
      onEnd: (error, md5, file) => {
        this.postMessage({
          type: 'end',
          payload: { error, md5, file },
        });
      },
    });
  };
};

let code = workerCode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
const workerScript = URL.createObjectURL(blob);

export default workerScript;
