// pages/blackCard/bindCard.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    phoneNum: -1,
    isMember: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    
    const db = wx.cloud.database()
    console.log(app.globalData.openid)
    db.collection('BlackCard').where({
      openID: app.globalData.openid
    }).get({
      success: res => {
        console.log("[searchBase success]: ", res)
        console.log(res.data)
        console.log(app.globalData.openid)
        if (res.data.length == 0) {
          
          console.log("[Base]false")
          
          wx.showToast({
            title: '您还不是黑卡会员，快点加入我们>_<',
            icon: 'none',
            duration: 1000
          })
          wx.navigateTo({
            url: '../blackCard/bindCard',
          })
        } else {
          isMember.setData(true)
          console.log("[Base]True")
          console.log(res.data[0].phoneNum)
          this.setData({
            openId: res.data[0].openID,
            phoneNum: res.data[0].phoneNum
            
          })
          wx.showToast({
            title: '您是黑卡会员',
            icon: 'none',
            duration: 6000
          })
        }
      }
    })


  },
  
  onShow: function (options) {
    
    this.onLoad()


  },

  
})