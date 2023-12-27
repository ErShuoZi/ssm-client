import LSRequest from '@/utils/index'

export function insertData(data) {
   return LSRequest.post({
    url:"/save",
    data:data
   })
}

export function getTableDataSerivce(data) {
   return LSRequest.post({
    url:"/all",
    data:data
   })
}

export function updateFurn(data) {
   return LSRequest.put({
    url:"/update",
    data:data
   })
}



export function deleteFurn(id) {
   return LSRequest.delete({
    url:`/delete/${id}`,
   //  params:{
   //    id
   //  }
   })
}

export function findFurnByPage(params) {
   return LSRequest.post({
    url:`/findFurnByPage`,
    params:{
      pageNum: params.pageNum,
      pageSize:params.pageSize
    }
   })
}

export function findFurnByConditionPage(data) {
   return LSRequest.post({
    url:`/findFurnByConditionPage`,
   data
   })
}