const { execSQL } = require('../db/mysql')
const dataroom = require('express').Router()
const provinceData = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '香港', '澳门', '台湾']

// 获取动物等级
dataroom.get('/level_animalcount', function (req, res) {
  const sql = `select * from animal_detail`
  execSQL(sql).then(data => {
    const result = {
      level1: 0,
      level2: 0
    }
    data.forEach(item => {
      if (item.protection_level == '一级') {
        result.level1++
      }
      if (item.protection_level == '二级') {
        result.level2++
      }
    })
    res.send({ data: result })
  })
})

// 获取省级保护动物数量
dataroom.get('/province_animalcount', function (req, res) {
  const sql = `select * from animal_detail`
  execSQL(sql).then(data => {
    const result = {}
    provinceData.forEach(item => {
      result[item] = 0
      data.forEach(item2 => {
        // result[item] = String(item2.domestic_distribution).includes(item)
        if (new RegExp(item).test(item2.domestic_distribution)) {
          result[item]++
        }
      })
    })
    res.send({ data: result })
  })
})

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
