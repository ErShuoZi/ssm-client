<template>
  <div class="main">
    <Operation
      @confirmInsert="confirmInsert"
      v-model="insertDialogVisible"
      v-model:formData="formData"
      v-model:searchParams="searchParams"
      @searchAction="searchAction"
    />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="imgPath" label="图片" width="180" />
      <el-table-column prop="maker" label="厂商" />
      <el-table-column prop="name" label="家具名" />
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="sales" label="销量" />
      <el-table-column prop="stock" label="库存" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEditClick(scope.row)"
            >修改</el-button
          >
          <el-button link type="danger" size="small" @click="handledelClick(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10]"
      layout="total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog v-model="editDialog" title="Edit" width="30%">
      <el-form v-model="formEditData" label-width="80px">
        <el-form-item label="家具名">
          <el-input v-model="formEditData.name" style="width: 100%" />
        </el-form-item>
        <el-form-item label="厂商">
          <el-input v-model="formEditData.maker" style="width: 100%" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="formEditData.price" style="width: 100%" />
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="formEditData.sales" style="width: 100%" />
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="formEditData.stock" style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="CancelEdit">Cancel</el-button>
          <el-button type="primary" @click="confirmEditBtnClick"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import Operation from '@/components/Operation.vue'
import { onMounted, reactive, ref } from 'vue'
import {
  getTableDataSerivce,
  insertData,
  updateFurn,
  deleteFurn,
  findFurnByPage,
  findFurnByConditionPage
} from '@/api/index'
import MsgInstance from '@/utils/msg'
onMounted(() => {
  getTableData()
})
let tableData = ref([])
let formData = reactive({
  name: '',
  maker: '',
  sales: '',
  stock: '',
  imgPath: '',
  price: ''
})
let formEditData = reactive({
  name: '',
  maker: '',
  sales: '',
  stock: '',
  imgPath: '',
  price: ''
})
const editDialog = ref(false)
let total = ref(0)
let pageSize = ref(5)
let pageNum = ref(1)
const insertDialogVisible = ref(false)
const searchParams = ref('')
const getTableData = () => {
  // getTableDataSerivce({}).then((res) => {
  //   tableData.value = res.extend.furnList
  //   console.log(tableData)
  // })
  findFurnByPage({}).then((res) => {
    tableData.value = res.extend.pageInfo.list
    total.value = res.extend.pageInfo.total
  })
}

const confirmInsert = () => {
  insertData().then((res) => {
    if (res.code === 200) {
      insertDialogVisible.value = false
      getTableData()
      MsgInstance.success('新增成功')
    }
  })
}

const handleEditClick = (row) => {
  Object.assign(formEditData, row)
  editDialog.value = true
}
const CancelEdit = () => {
  editDialog.value = false
}

const confirmEditBtnClick = () => {
  updateFurn(formEditData).then((res) => {
    if (res.code === 200) {
      getTableData()
      editDialog.value = false
      MsgInstance.success('修改成功')
    }
  })
}

const handledelClick = (row) => {
  console.log('删除点击了', row)
  deleteFurn(row.id).then((res) => {
    if (res.code === 200) {
      MsgInstance.success('删除成功')
      getTableData()
    }
  })
}

const handleSizeChange = (val) => {
  pageSize.value = val
  findFurnByPage({ pageNum: pageNum.value, pageSize: pageSize.value }).then((res) => {
    tableData.value = res.extend.pageInfo.list
  })
}
const handleCurrentChange = (val) => {
  pageNum.value = val
  findFurnByPage({ pageNum: pageNum.value, pageSize: pageSize.value }).then((res) => {
    tableData.value = res.extend.pageInfo.list
  })
}

const searchAction = () => {
  findFurnByConditionPage({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    search: searchParams.value
  }).then((res) => {
    console.log('first', res)
    tableData.value = res.extend.pageInfo.list
  })
}
</script>

<style lang="scss" scoped></style>
