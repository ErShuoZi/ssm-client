import LSRequest from '@/utils/index'

export function insertData(data) {
   return LSRequest.post({
    url:"/save",
    data:data
   })
}