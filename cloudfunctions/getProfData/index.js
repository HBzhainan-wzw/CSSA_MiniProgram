// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let inputValue = event.inputValue
  // 模糊查询
  return await db.collection('Prof').where({
    name: db.RegExp({
      regexp: inputValue,
      options: 'i' // 不区分大小写
    })
  }).get()
}