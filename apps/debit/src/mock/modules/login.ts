import Mock from 'mockjs'
interface DataType {
  id: string | number
  name: string
}
const dataList: DataType[] = []
for (let i = 0; i < 33; i++) {
  dataList.push({
    id: Mock.mock('@guid'),
    name: Mock.mock('@cname'),
  })
}
export default {
  url: '/mock_login', // 接口
  method: 'get', // 请求类型
  timeout: 500, // 超时时间
  statusCode: 200,
  response: {
    code: 0,
    msg: '成功',
    data: dataList,
  },
}
