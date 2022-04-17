/// <reference path="md5Worker.d.ts" />
/* global importScripts SparkMD5 */

// worker 相关的代码
const workerCode = () => {
  importScripts('https://cdn.bootcdn.net/ajax/libs/spark-md5/3.0.2/spark-md5.min.js');

  const computedMd5 = ({
    file, chunkSize: initChunkSize = 2, onProcess, onEnd,
  }) => {
    const blobSlice = File.prototype.slice;
    const chunkSize = initChunkSize * 1024 * 1024;
    const chunks = Math.ceil(file.size / chunkSize);
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();

    let currentChunk = 0;

    const loadNext = () => {
      const start = currentChunk * chunkSize;
      const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    };

    fileReader.onload = (e) => {
      console.log('read chunk nr', currentChunk + 1, 'of', chunks);
      if (e.target?.result && ArrayBuffer.isView(e.target?.result)) {
        spark.append(e.target.result);
      }
      currentChunk += 1;

      onProcess(currentChunk, chunks, file);

      if (currentChunk < chunks) {
        loadNext();
      } else {
        onEnd(null, spark.end(), file);
        console.info('computed hash', spark.end());
      }
    };

    fileReader.onerror = (error) => {
      console.warn('oops, 计算 MD5 出错了', error);
      onEnd(error);
    };

    loadNext();
  };

  this.onmessage = function m(e) {
    console.log('worker 收到 main 的消息');
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
