<script setup lang="ts">
import { reactive } from '@vue/reactivity';
import { provide } from '@vue/runtime-core';
import axios from 'axios';
import DropBox from './components/DropBox.vue';
import UploadList from './components/UploadList.vue';
import { FileKey } from './symbols';
import { IFile } from './types';

const fileList = reactive<IFile[]>([]);

const chooseFiles = (files: IFile[]) => {
  fileList.length = 0;
  fileList.push(...files);
};

provide(FileKey, fileList);

const sendFile = (file: IFile) => {
  const formData = new FormData();
  formData.append('files', file.source);
  console.log({ formData });
  axios.post('http://localhost:10001/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (pv: any) => {
      if (pv.lengthComputable) {
        const compulate = parseFloat(((pv.loaded / pv.total) * 100).toFixed(1));
        console.log({ compulate });
        const index = fileList.findIndex((item) => item.name === file.name);
        fileList[index].process = compulate;
      }
    },
  }).then((res: any) => {
    console.log({ res });
  });
};

const cancelAll = () => {
  fileList.length = 0;
};

const startAll = () => {
  fileList.forEach((file) => {
    sendFile(file);
  });
};

</script>

<template>
  <div class="container">
    <div class="upload-container">
      <h3>上传</h3>
      <DropBox @choose-files="chooseFiles" />
      <UploadList @start-all="startAll" @cancel-all="cancelAll"/>
    </div>
  </div>
</template>

<style lang="scss">
@import './upload.scss';
</style>
