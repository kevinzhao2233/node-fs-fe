import axios, { AxiosPromise } from 'axios';

const baseURL = 'http://localhost:10001';

export const isFileExist = (data: {md5?: string, id?: string}): AxiosPromise<any> => axios({
  url: '/is-file-exist',
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: data,
});

// 上传单个 chunk 文件
export const uploadChunkFile = (formData: FormData) => axios({
  method: 'POST',
  url: '/upload-chunk',
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  data: formData,
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

// 秒传
export const quickUpload = (data: {transmissionId: string, fileId: string}) => axios({
  method: 'POST',
  url: '/quick-upload',
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  data,
});

// 创建 transmission
export const createTransmission = (data: {uid: string; description: string; expiration: Date; needPassword: boolean;}) => axios({
  method: 'POST',
  url: '/transmission',
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  data,
});
