import Request from "./request";
const LSRequest =  new Request({
  baseURL:"http://localhost:8080/ssm",
  timeout:10000
})

export default LSRequest