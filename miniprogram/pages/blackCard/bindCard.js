// pages/blackCard/bindCard.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: -1,
    id:""
  },
  phoneInput: function (e) {
    app.globalData.phoneNum = e.detail.phoneNum
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('1');
  },
  phoneInput: function (e) {
    app.globalData.phoneNum = e.detail.value
  },
  clickButton: function () {
    console.log("[GlobalData.phoneNum]: ", app.globalData.phoneNum)
    if (app.globalData.phoneNum == undefined) {
      console.log("[phoneNum]: Null input")
      return false;
    }
    const db = wx.cloud.database()

    db.collection('BlackCard').where({
      phoneNum: parseInt(app.globalData.phoneNum)
    }).get({
      success: res => {
        console.log("[searchBase success]: ", res)
        console.log("[searchBase success]: ", app.globalData.openid)
        if (res.data.length == 0) {
          console.log("[Base]false")
          wx.showToast({
            title: '绑定成功',
            icon: 'none',
            duration: 6000
          })
          console.log(res.data._id)
        } else {
          console.log("[Base]True")
          wx.showToast({
            title: '手机号已被绑定',
            icon: 'none',
            duration: 6000
          })

        }
      }
    })
  }
})