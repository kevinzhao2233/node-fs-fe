<script setup lang="ts">
import { watch, ref } from '@vue/runtime-core';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const activeMenu = ref('upload');

watch(() => route.name, () => {
  const metaMenu = route.meta.menu as string | undefined;
  activeMenu.value = metaMenu || activeMenu.value;
}, { immediate: true });

const toggleMenu = (menu: string) => {
  router.push({ name: menu });
};
</script>

<template>
  <div class="sider-box">
    <div
      class="menu-item"
      :class="{active: activeMenu === 'upload'}"
      @click="toggleMenu('upload')"><i class="icon ri-upload-cloud-line"></i>上传文件</div>
    <div
      class="menu-item"
      :class="{active: activeMenu === 'download'}"
      @click="toggleMenu('download')"><i class="icon ri-download-cloud-2-line"></i>下载文件</div>
  </div>
</template>

<style lang="scss">
.sider-box {
  width: 100%;
  padding: 100px 0 0 50px;
  box-sizing: border-box;

  .menu-item {
    margin: 20px 0;
    padding: 0 20px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 46px;
    border-radius: 12px;
    background: #ffffffaa;
    user-select: none;
    cursor: pointer;
    transition: background ease 0.3s, transform ease-out 0.3s;

    &.active {
      border: 2px solid #009dff;
      padding: 0 18px;
    }

    &:hover {
      background: #ffffffdd;
    }

    &:active {
      background: #ffffff;
      transform: scale(0.9);
    }

    .icon {
      font-size: 18px;
      margin-right: 8px;
    }
  }
}
</style>
