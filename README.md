## 图片上传接口服务
### 安装 与 启动
```bash
npm install # 安装
npm run dev # 启动
```

## 当前已完成

* [x] 实现三种类型的图片上传，包括：博客、算法博客、其他
* [x] 并且将 api 放在单独的文件中编写

```javascript
在 node 中分离 js 文件的技术

// app.js
// 导入分类好的接口
const uploadRouter = require('./api/upload')
app.use(uploadRouter)

// api/upload.js
const upload = require('express').Router()

// 初始的 路由 ， 用于 测试 接口
upload.get('/', function (req, res) {
  // console.log(req)
  res.send('Hello World good!')
})

module.exports = upload
```



## 待完善

* [ ] 对上传过来的图片进行格式校验，防止被网络攻击