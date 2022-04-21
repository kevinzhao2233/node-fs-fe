import axios from 'axios';

const baseURL = 'http://localhost:10001';

// 上传单个 chunk 文件
export const uploadChunkFile = (formData: FormData, onUploadProgress = (pv: any) => { }) => axios({
  method: 'POST',
  url: '/upload-chunk',
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  data: formData,
  onUploadProgress,
});

// 合并 chunk，在全部 chunk 上传完成后调用
export const mergeChunks = (data: {fileName: string, md5: string, chunkTotal: number}) => axios({
  method: 'POST',
  url: '/merge-chunks',
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  data,
});

// 上传小文件
export const uploadFile = (formData: FormData, onUploadProgress = (pv: any) => { }) => axios({
  method: 'POST',
  url: '/upload',
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  data: formData,
  onUploadProgress,
});
