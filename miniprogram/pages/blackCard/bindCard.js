// pages/blackCard/bindCard.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: -1,
    id: ""
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
        if (res.data.length != 0) {
          console.log("[Base]false")
          if (res.data[0].openID == "-1") {
            
            wx.showToast({
              title: '绑定成功',
              icon: 'none',
              duration: 6000,
              mask:true,
              success: function () {
                setTimeout(function () {
                  //要延时执行的代码
                  wx.navigateBack({
                    delta: 1
                   })
                }, 1500) //延迟时间
              }
            })


            this.setData({
              id: res.data[0]._id
            })

            console.log(this.data.id)
            console.log(app.globalData.openid)
            db.collection('BlackCard').doc(this.data.id).update({
              data:{
                openID: app.globalData.openid
              }
            })
            /*
            wx.navigateBack({
              delta: 2,
            })
            */


          } else{
            console.log("[Base]True")
            wx.showToast({
              title: '检测到已绑定过黑卡，请重新输入手机号',
              icon: 'none',
              duration: 6000
            })
          }
        } else {
          console.log("[Base]True")
          wx.showToast({
            title: '滚去买黑卡',
            icon: 'none',
            duration: 6000
          })

        }
      }
    })
  }
})