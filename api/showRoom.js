// 陈列馆相关接口
const { execSQL } = require('../db/mysql')
const showRoom = require('express').Router()

const men = ['半索动物门', '刺胞动物门', '脊索动物门', '节肢动物门', '软体动物门']
const gang = ['两栖纲', '双壳纲', '哺乳纲', '圆口纲', '头足纲', '文昌鱼纲', '昆虫纲', '水螅纲', '爬行纲', '珊瑚纲', '硬骨鱼纲', '肠鳃纲', '肢口纲', '腹足纲', '蛛形纲', '软甲纲', '软骨鱼纲', '鸟纲']
// 获取动物分支树状图
showRoom.get('/animaltree', function (req, res) {
  const sql = `select * from animal_detail`
  execSQL(sql).then(data => {
    // 第一层
    const result = []
    let men = new Set()
    data.map(first => {
      men.add(first.animal_phylum)
    })
    men = Array.from(men) // 拿到门的列表
    men.map(item => {
      const obj = {
        name: item,
        children: []
      }
      result.push(obj)
    })

    // 纲
    result.forEach(item => {
      let gang = new Set()
      data.map(second => {
        if (second.animal_phylum === item.name) {
          gang.add(second.animal_class)
        }
      })
      gang = Array.from(gang) // 拿到了这个门的所有纲
      item.children = gang.map(gangItem => {
        const obj = {
          name: gangItem,
          children: []
        }
        return obj
      })
    })

    // 目
    result.forEach(item => {
      item.children.forEach(second => {
        let family = new Set()
        data.map(third => {
          if (third.animal_class === second.name) {
            family.add(third.animal_order)
          }
        })
        family = Array.from(family) // 拿到了这个纲的所有目
        second.children = family.map(familyItem => {
          const obj = {
            name: familyItem,
            children: []
          }
          return obj
        })
      })
    })

    // 科
    result.forEach(item => {
      item.children.forEach(second => {
        second.children.forEach(third => {
          let order = new Set()
          data.map(fourth => {
            if (fourth.animal_order === third.name) {
              order.add(fourth.animal_family)
            }
          })
          order = Array.from(order) // 拿到了这个目的所有科
          third.children = order.map(orderItem => {
            const obj = {
              name: orderItem,
              children: []
            }
            return obj
          })
        })
      })
    })
    // 属
    result.forEach(item => {
      item.children.forEach(second => {
        second.children.forEach(third => {
          third.children.forEach(fourth => {
            let genus = []
            data.map(fifth => {
              if (fifth.animal_family === fourth.name) {
                genus.push(fifth)
              }
            })
            fourth.children = genus
          })
        })
      })
    })

    res.send({ data: result })
  })
})

// 获取动物完整信息
showRoom.get('/animalMsg', function (req, res) {
  const sql = `select * from animal_detail`
  execSQL(sql).then(data => {
    // 第一层
    const result = data

    res.send({ data: result })
  })
})

// 获取纲列表
showRoom.get('/test', function (req, res) {
  const sql = 'SELECT * FROM order_desc'
  execSQL(sql).then(data => {
    const result = data.map(item => item.animal_order)
    res.send({ data: result })
  })
})

module.exports = showRoom
