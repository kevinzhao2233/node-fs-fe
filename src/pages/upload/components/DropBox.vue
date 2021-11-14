<script setup lang="ts">
import { IFile } from '../types';

interface IEmit {
  (event: 'chooseFiles', files: IFile[]): void;
}
const emit = defineEmits<IEmit>();

const populateFile = (files: FileList) => {
  const result: IFile[] = [];
  if (files?.length) {
    for (let idx = 0; idx < files.length; idx += 1) {
      const file = files.item(idx) as File;
      result.push({
        name: file.name,
        size: file.size,
        type: file.type,
        process: 0,
        source: file,
      });
    }
  }
  return result;
};

const chooseUploadFile = (e: Event) => {
  const { files } = <HTMLInputElement>e.target;
  if (files?.length) {
    emit('chooseFiles', populateFile(files));
  }
};
const fileDragover = (e: DragEvent) => {
  e.preventDefault();
  if (e.dataTransfer?.dropEffect) {
    e.dataTransfer.dropEffect = 'move';
  }
};
const fileDrop = (e: DragEvent) => {
  e.preventDefault();
  if (!e.dataTransfer?.files) return;
  emit('chooseFiles', populateFile(e.dataTransfer.files));
};
</script>

<template>
  <div class="drop-container" @dragover="fileDragover" @drop="fileDrop">
    <p class="description">拖拽文件到这里，或 <label for="fileInput">选择文件</label></p>
    <p class="sub-desc">文件最大支持 20MB</p>
    <input type="file" id="fileInput" multiple @change="chooseUploadFile" style="display: none;">
  </div>
</template>

<style lang="scss">
@import './dropBox.scss';
</style>
