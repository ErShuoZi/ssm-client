<template>
  <el-container class="layout">
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Aside />
      </el-aside>
      <el-main>
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Main from '@/components/Main.vue'
</script>
<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;
}
</style>
