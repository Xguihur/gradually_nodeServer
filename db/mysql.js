const mysql = require('mysql')
// 设置全局配置文件
const MYSQL_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: 3306,
  database: 'animal'
}

// 创建连接对象
let connection
let connectCount = 0

// 封装错误处理函数
const handleError = error => {
  if (error) {
    // 如果是连接断开则自动连接
    if (error.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR' || error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log(`连接断开，已重新连接。连接次数：${++connectCount}`)
      ghConnect() //重新连接
    } else {
      // 其他的错误
      console.log('Error connecting to database: ', error)
      clearInterval(interval) // Stop sending heartbeats if there is an error
    }
  } else {
    // 正常运行
    console.log('Connected to database successfully')
  }
}
// 创建连接的函数，用于错误重连的方便
const ghConnect = () => {
  connection = mysql.createConnection(MYSQL_CONFIG)
  connection.connect(handleError)
  // 监听错误的事件！（有点奇怪，为什么connect里面监听了，还需要在外面监听）
  connection.on('error', handleError)
}

// 开始连接
ghConnect()
// 开始连接
// connection.connect()

// 执行 sql 语句 改成promise写法优化代码
function execSQL(sql) {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('error', err)
        // return
        // reject(err)//不能 reject，不然一旦有一点错误就直接服务中断了
      }
      resolve(result)
    })
  })

  return promise
}

module.exports = {
  execSQL
}
