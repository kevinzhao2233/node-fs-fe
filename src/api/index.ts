import axios from 'axios';

const baseURL = 'http://localhost:10001';

// 上传单个 chunk 文件
export const uploadChunkFile = (url: string, formData: FormData, onUploadProgress = (pv: any) => { }) => axios({
  method: 'POST',
  url,
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  data: formData,
  onUploadProgress,
});

// 合并 chunk，在全部 chunk 上传完成后调用
export const mergeChunks = (url: string, data: {size: number, fileName: string}) => axios({
  method: 'POST',
  url,
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  data,
});

// 上传小文件
export const uploadFule = (url: string, formData: FormData, onUploadProgress = (pv: any) => { }) => axios({
  method: 'POST',
  url,
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  data: FormData,
  onUploadProgress,
});
