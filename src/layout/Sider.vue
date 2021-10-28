<script setup lang="ts">

</script>

<template>
  <div class="sider-box">
    <div class="menu-item active">上传文件</div>
    <div class="menu-item">下载文件</div>
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
    }

    &:hover {
      background: #ffffffdd;
    }

    &:active {
      background: #ffffff;
      transform: scale(0.9);
    }
  }
}
</style>
