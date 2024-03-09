const upload = require('express').Router()
// 处理文件上传的中间件
const multer = require('multer')
const path = require('path')
fs = require('fs')

// 初始的 路由 ， 用于 测试 接口
upload.get('/', function (req, res) {
  // console.log(req)
  res.send('Hello World good!')
})

let url // 用来存储图片的名称
// 配置multer中间件
const getStorage = rootUrl => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, rootUrl) // 指定文件保存的目录
    },
    filename: function (req, file, cb) {
      url = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
      cb(null, url) // 生成文件名
    }
  })
}

// blog 部分的图片上传接口实现
const blogStorage = getStorage('uploads/blogImgs/')
const blogUploads = multer({ storage: blogStorage })
// POST路由，接收formData中的图片
upload.post('/upload/blog', blogUploads.single('image'), (req, res) => {
  // 图片已保存到指定目录
  res.send({
    text: `图片已上传并保存成功`,
    url: `/images/blog/${url}`
  })
})

// 算法博客 部分的图片上传接口实现
const arithmeticStorage = getStorage('uploads/arithmeticImgs/')
const arithmeticUploads = multer({ storage: arithmeticStorage })
// POST路由，接收formData中的图片
upload.post('/upload/arithmetic', arithmeticUploads.single('image'), (req, res) => {
  // 图片已保存到指定目录
  res.send({
    text: `图片已上传并保存成功`,
    url: `/images/arithmetic/${url}`
  })
})

// 其他 部分的图片上传接口实现
const otherStorage = getStorage('uploads/otherImgs/')
const otherUploads = multer({ storage: otherStorage })
// POST路由，接收formData中的图片
upload.post('/upload/other', otherUploads.single('image'), (req, res) => {
  // 图片已保存到指定目录
  res.send({
    text: `图片已上传并保存成功`,
    url: `/images/other/${url}`
  })
})

// 博客图片访问端点
upload.get('/api/images/blog/:imageName', (req, res) => {
  const imageName = req.params.imageName
  // res.send(imageName)
  // 构建图片路径,用于匹配服务器中 图片所在的路径，找到图片并且返回出去
  const imagePath = `/uploads/blogImgs/${imageName}`
  // 返回图片
  const root = path.join(__dirname, '../') // 获取当前文件的绝对路径，再通过相对路径获取到根目录
  res.sendFile(imagePath, { root: root })
})

// 算法博客图片访问端点
upload.get('/api/images/arithmetic/:imageName', (req, res) => {
  const imageName = req.params.imageName
  // res.send(imageName)
  // 构建图片路径,用于匹配服务器中 图片所在的路径，找到图片并且返回出去
  const imagePath = `/uploads/arithmeticImgs/${imageName}`
  // 返回图片
  const root = path.join(__dirname, '../') // 获取当前文件的绝对路径，再通过相对路径获取到根目录
  res.sendFile(imagePath, { root: root })
})

// 其他 图片访问端点
upload.get('/api/images/other/:imageName', (req, res) => {
  const imageName = req.params.imageName
  // res.send(imageName)
  // 构建图片路径,用于匹配服务器中 图片所在的路径，找到图片并且返回出去
  const imagePath = `/uploads/otherImgs/${imageName}`
  // 返回图片
  const root = path.join(__dirname, '../') // 获取当前文件的绝对路径，再通过相对路径获取到根目录
  res.sendFile(imagePath, { root: root })
})

module.exports = upload
