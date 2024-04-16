const { execSQL } = require('../db/mysql')
const animal = require('express').Router()

// 初始的 路由 ， 用于 测试 接口
animal.get('/', function (req, res) {
  // console.log(req)
  res.send('Hello! This is animal!')
})

// 在这写关于动物的接口
animal.get('/animal', function (req, res) {
  const sql = 'SELECT * FROM sys_role'
  execSQL(sql).then(data => {
    res.send(data)
  })
})

module.exports = animal
