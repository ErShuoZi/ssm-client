<template>
  <div class="operation">
    <div class="btn">
      <el-button type="primary" @click="insertData">新增</el-button>
      <el-button @click="other">其他</el-button>
    </div>
    <div class="inpt">
      <el-input placeholder="请输入关键字" v-model="searchProxy">
        <template #append>
          <el-button type="danger" @click="handleSearch">查询</el-button>
        </template>
      </el-input>
    </div>

    <el-dialog v-model="dialogShow" title="Insert" width="30%">
      <el-form v-model="formDataProxy" label-width="80px">
        <el-form-item label="家具名">
          <el-input v-model="formDataProxy.name" style="width: 100%" />
        </el-form-item>
        <el-form-item label="厂商">
          <el-input v-model="formDataProxy.maker" style="width: 100%" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="formDataProxy.price" style="width: 100%" />
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="formDataProxy.sales" style="width: 100%" />
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="formDataProxy.stock" style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="CancelInsert(false)">Cancel</el-button>
          <el-button type="primary" @click="confirmInsertBtnClick"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  formData: {
    type: Object,
    default: () => {}
  },
  searchParams: {
    type: String,
    default: ''
  }
})

const emits = defineEmits([
  'update:modelValue',
  'update:formData',
  'update:searchParams',
  'confirmInsert',
  'searchAction'
])
const dialogShow = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val)
})

const formDataProxy = computed({
  get: () => props.formData,
  set: (val) => emits('update:formData', val)
})
const searchProxy = computed({
  get: () => props.searchParams,
  set: (val) => emits('update:searchParams', val)
})

const insertData = () => {
  dialogShow.value = true
}

const other = () => {
  console.log('点击了其他')
}

const handleSearch = () => {
  emits('searchAction')
}

const confirmInsertBtnClick = () => {
  console.log('确认添加')
  emits('confirmInsert')
}
const CancelInsert = (val) => {
  dialogShow.value = val
}
</script>

<style lang="scss" scoped>
:deep(.el-input-group__append button.el-button) {
  border-color: #f36161;
  background-color: #f36161;
  color: white;
}
</style>
