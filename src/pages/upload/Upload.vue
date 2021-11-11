<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="upload-container">
      <h3>上传</h3>
      <div class="drop-container">
        <p class="description">拖拽文件到这里，或 <a>选择文件</a></p>
        <p class="sub-desc">文件最大支持 20MB</p>
      </div>
      <ul class="upload-list">
        <li class="upload-file">
          <div class="file-container">
            <div class="file-content">
              <p class="file-name">图片文件名.jpg</p>
              <p class="file-desc">
                <span>68%</span><span>大约还需 12 秒</span>
              </p>
            </div>
            <div class="file-action">
              <i class="icon close ri-close-line"></i>
            </div>
          </div>
          <div class="file-process"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import './upload.scss';
</style>
