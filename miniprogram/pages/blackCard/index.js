// pages/blackCard/bindCard.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    phoneNum: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('1');
    wx.showLoading({
      title: '',
    });
   wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getOpenId'
      }
    }).then((resp) => {
      this.setData({
        haveGetOpenId: true,
        openId: resp.result.openid
      });
     wx.hideLoading();
   }).catch((e) => {
      this.setData({
        showUploadTip: true
      });
     wx.hideLoading();
    });
    
    const db = wx.cloud.database()
    
    db.collection('BlackCard').where({
      openID: app.globalData.openId
    }).get({
      success: res => {
        console.log("[searchBase success]: ", res)
        if (res.data.length == 0) {
          console.log("[Base]false")
          /*
          wx.showToast({
            title: '您还不是黑卡会员，快点加入我们>_<',
            icon: 'none',
            duration: 6000
          })*/
          wx.navigateTo({
            url: '../blackCard/bindCard',
          })
        } else {
          console.log("[Base]True")
          wx.showToast({
            title: '您是黑卡会员',
            icon: 'none',
            duration: 6000
          })
        }
      }
    })


  },


  
})