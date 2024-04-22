const { execSQL } = require('../db/mysql')
const dataroom = require('express').Router()

// 获取右侧手风琴列表
dataroom.get('/order_desc/getalldesc', function (req, res) {
  const sql = 'SELECT * FROM order_desc'
  execSQL(sql).then(data => {
    const result = data.map(item => {
      const obj = {}
      obj.title = item.animal_order
      obj.data = item.animal_desc
      return obj
    })
    res.send({ data: result })
  })
})

// 根据 纲 获取动物数据
dataroom.get('/getChangeTest/:animal_class', function (req, res) {
  const params = req.params.animal_class
  const sql = `select * from animal_detail WHERE animal_class LIKE '%${params}%' `
  execSQL(sql).then(data => {
    res.send({ data: data })
  })
})

// 根据 纲 获取左上角的数据
dataroom.get('/getChange/:animal_class', function (req, res) {
  const params = req.params.animal_class
  const sql = `select * from animal_detail WHERE animal_class LIKE '%${params}%' `
  execSQL(sql).then(data => {
    const result = [
      {
        count: 0,
        name: '新增国家二级'
      },
      {
        count: 0,
        name: '新增国家一级'
      },
      {
        count: 0,
        name: '原国家二级'
      },
      {
        count: 0,
        name: '原国家一级'
      }
    ]
    data.forEach(item => {
      if (item.change == '新增二级') {
        result[0].count++
      } else if (item.change == '新增一级') {
        result[1].count++
      } else if (item.change == '未变一级') {
        result[2].count++
      } else if (item.change == '未变一级') {
        result[3].count++
      }
    })

    res.send({ data: result })
  })
})

// 根据 纲 获取左下角的数据
dataroom.get('/getOrderLevelCount/:animal_class', function (req, res) {
  const params = req.params.animal_class
  // 根据纲查询动物，再获取下面的目
  const sql = `select * from animal_detail WHERE animal_class LIKE '%${params}%' `
  execSQL(sql).then(data => {
    let mu = new Set()
    data.map(item => {
      mu.add(item.animal_order)
    })
    mu = [...mu] // 拿到了 目 的数组
    // 接着根据目去查询动物，获取等级
    // const result = data
    const result = mu.map(item => {
      const obj = {
        name: item,
        firstLevel: 0,
        secondLevel: 0
      }
      return obj
    })
    data.forEach(item => {
      result.forEach(item2 => {
        if (item.animal_order == item2.name) {
          if (item.protection_level == '一级') {
            item2.firstLevel++
          } else if (item.protection_level == '二级') {
            item2.secondLevel++
          }
        }
      })
    })
    res.send({ data: result })
  })
})

module.exports = dataroom
