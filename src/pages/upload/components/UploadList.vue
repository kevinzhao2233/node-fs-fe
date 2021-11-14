<script setup lang="ts">
import { inject } from '@vue/runtime-core';
import { FileKey } from '../symbols';

const fileList = inject(FileKey);

interface IEmit {
  (event: 'startAll'): void;
  (event: 'cancelAll'): void;
}
const emit = defineEmits<IEmit>();

const cancelAll = () => {
  emit('cancelAll');
};
const startAll = () => {
  emit('startAll');
};

</script>

<template>
  <div v-show="fileList?.length" class="upload-actions">
    <button class="button gradient" @click="startAll">全部开始</button>
    <button class="button gradient red" @click="cancelAll">全部取消</button>
  </div>
  <ul class="upload-list">
    <li v-for="(file, idx) in fileList" :key="idx" class="upload-file">
      <div class="file-container">
        <div class="file-content">
          <p class="file-name">{{ file.name }}</p>
          <p class="file-desc">
            <span>{{ file.process }}%</span>
            <!-- <span v-if="file.process < 100">大约还需 -- 秒</span> -->
          </p>
        </div>
        <div class="file-action">
          <i class="icon close ri-close-line"></i>
        </div>
      </div>
      <div class="file-process">
        <div class="process" :style="{width: file.process + '%'}"></div>
      </div>
    </li>
  </ul>
</template>

<style lang="scss">
@import './uploadList.scss';
</style>
