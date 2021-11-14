<script setup lang="ts">
import Header from './Header.vue';
import Sider from './Sider.vue';
</script>

<template>
  <a-layout class="layout">
    <a-layout-sider class="sider" theme="light" width="240">
      <Header/>
      <Sider/>
    </a-layout-sider>
    <a-layout style="overflow: hidden;">
      <a-layout-content
        :style="{ margin: 0, minHeight: '280px', overflow: 'auto' }"
      >
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="scss">
.ant-layout {
  background: transparent;
}
.layout {
  height: 100vh;
  min-height: 360px;
  background: url('../assets/bg.png') top / cover no-repeat;
}

.sider {
  background: transparent;
}

.ant-row-rtl .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
