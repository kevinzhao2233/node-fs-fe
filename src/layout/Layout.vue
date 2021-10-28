<script setup lang="ts">
import Header from './Header.vue';
import Sider from './Sider.vue';
</script>

<template>
  <a-layout class="layout">
    <a-layout-header>
      <Header/>
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="sider" theme="light" width="240">
        <Sider/>
      </a-layout-sider>
      <a-layout>
        <a-layout-content
          :style="{ margin: 0, minHeight: '280px' }"
        >
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style lang="scss">
.ant-layout {
  background: transparent;
}
.layout {
  height: 100vh;
  background: url('../assets/bg.png') top / cover no-repeat;
}

.ant-layout-has-sider {
  background: transparent;
}

.ant-layout-header {
  background: transparent;
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
