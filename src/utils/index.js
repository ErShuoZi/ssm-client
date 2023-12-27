import Request from "./request";
const LSRequest =  new Request({
  baseURL:"/api",
  timeout:10000
})

export default LSRequest