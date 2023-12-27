import axios from "axios";


class Request{
  constructor(config){
    this.instance = axios.create(config)
    this.instance.interceptors.request.use((config) => {
      config.headers["Content-Type"] = "application/json;charset=utf-8"
      return config
    },(err) => {
      return err
    })

    this.instance.interceptors.response.use((response) => {
      let res = response.data
      //如果返回文件，直接返回
      if(response.config.responseType === 'blob'){
        return res
      }
      if(typeof res === "string") {
        res = res ? JSON.parse(res): res
      }
      return res
     
    },(err) => {
      return err
    })
  }

  request(config){
    return new Promise((resolve,reject) => {
      return this.instance.request(config).then((res) => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({...config,method:"GET"})
  }
  post(config) {
    return this.request({...config,method:"POST"})
  }
  delete(config) {
    return this.request({...config,method:"DELETE"})
  }
  put(config) {
    return this.request({...config,method:"PUT"})
  }
}

export default Request
