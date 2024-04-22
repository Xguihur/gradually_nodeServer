const { execSQL } = require('../db/mysql')
const direction = require('express').Router()

// 根据省份获取动物
direction.get('/direction/:province', function (req, res) {
  const province = req.params.province
  const sql = `SELECT * FROM animal_detail WHERE domestic_distribution LIKE '%${province}%'`
  execSQL(sql).then(data => {
    const result = data.map(item => {
      return {
        name: item.animal_name,
        img: item.img
      }
    })
    res.send({ data: result })
  })
})
// 根据姓名获取动物详细信息
direction.get('/animal_detail/:name', function (req, res) {
  const params = req.params.name
  const sql = `SELECT * FROM animal_detail  WHERE animal_name LIKE '%${params}%' `
  execSQL(sql).then(data => {
    res.send({ data: data[0] })
  })
})

module.exports = direction
