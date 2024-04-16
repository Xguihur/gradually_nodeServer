const express = require('express')
const app = express()
// 解决同源策略问题的库
const cors = require('cors')
app.use(cors())

// 导入分类好的接口
const animalRouter = require('./api/animal')
app.use(animalRouter)
// app.use('/example',uploadRouter) // 像这样设置一个新的路由，就是指访问 /example 路径时，对应匹配后续导入的中间件中的路由

const server = app.listen(3000, function () {
  // const host = '8.134.197.161'
  const host = 'localhost'
  const port = server.address().port

  console.log(`Example app listening at http://${host}:${port}`)
})
