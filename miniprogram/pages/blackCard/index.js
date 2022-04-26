// pages/blackCard/bindCard.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    phoneNum: -1,
    isMember: 0

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
          this.setData({
            isMember: -1,
          })

          wx.showToast({
            title: '您还不是黑卡会员，快点加入我们>_<',
            icon: 'none',
            duration: 1000
          })
          wx.navigateTo({
            url: '../blackCard/bindCard',
          })
        } else {
          
          console.log("[Base]True")
          console.log(res.data[0].phoneNum)
          this.setData({
            openId: res.data[0].openID,
            phoneNum: res.data[0].phoneNum,
            isMember: 1,
          })
          wx.showToast({
            title: '您是黑卡会员',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
    

  },
  
  onShow: function (options) {
    console.log("onshow running")
    const db = wx.cloud.database()//要延时执行的代码
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
          
        } else {
          
          console.log("[Base]True")
          console.log(res.data[0].phoneNum)
          this.setData({
            openId: res.data[0].openID,
            phoneNum: res.data[0].phoneNum,
            isMember: true,
          })
          wx.showToast({
            title: '您是黑卡会员',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
    
    




  },

  
})