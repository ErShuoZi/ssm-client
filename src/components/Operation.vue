<template>
  <div class="operation">
    <div class="btn">
      <el-button type="primary" @click="insert">新增</el-button>
      <el-button @click="other">其他</el-button>
    </div>
    <div class="inpt">
      <el-input placeholder="请输入关键字" v-model="search">
        <template #append>
          <el-button type="danger" @click="handleSearch">查询</el-button>
        </template>
      </el-input>
    </div>

    <el-dialog v-model="insertDialogVisible" title="Insert" width="30%">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="家具名">
          <el-input v-model="formData.name" style="width: 100%" />
        </el-form-item>
        <el-form-item label="厂商">
          <el-input v-model="formData.maker" style="width: 100%" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="formData.price" style="width: 100%" />
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="formData.sales" style="width: 100%" />
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="formData.stock" style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="insertDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirmInsert"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import {insertData} from '../api/index'

const search = ref()
const insertDialogVisible = ref(false)
const formData = reactive({
  name: '',
  maker: '',
  price: '',
  sales: '',
  stock: ''
})
const insert = () => {
  insertDialogVisible.value = true
}

const other = () => {
  console.log('点击了其他')
}

const handleSearch = () => {
  console.log('search')
}

const confirmInsert = () => {
  console.log('确认添加')
  insertData(formData)
  
  
}
</script>

<style lang="scss" scoped>
:deep(.el-input-group__append button.el-button) {
  border-color: #f36161;
  background-color: #f36161;
  color: white;
}
</style>
