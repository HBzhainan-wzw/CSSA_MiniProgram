// pages/vrfPage/vrfPage.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
     permNum: -1
  },
  permInput: function(e){
    app.globalData.permNum = e.detail.value
  },

  clickButton: function(){
    console.log("[GlobalData.permNum]: ",app.globalData.permNum )
    if(app.globalData.permNum == undefined){
      console.log("[permNum]: Null input")
      return false;
    } 
    const db = wx.cloud.database()

    db.collection('blMemberBase').where({
      _perm: parseInt(app.globalData.permNum)
    }).get({
      success: res => {
        console.log("[searchBase success]: ", res)
        if(res.data.length == 0){
          console.log("[Base]false")
          wx.showToast({
            title: '您还不是黑卡会员，快点加入我们>_<',
            icon: 'none',
            duration: 6000
          })     
        }else{
          console.log('[Base]true')
          db.collection('blMember').where({
            _perm: app.globalData.permNum
          }).get({
            success: function(res_1){
              if(res_1.data.length != 0){
                console.log('[blMemberSearch success]', res_1)
                wx.showToast({
                  title: '这个perm已经被绑定了呢OvO',
                  icon: 'none',
                  duration: 6000
                })
              }else{
                console.log('[blMemberSearch false]',res_1)
                app.globalData.blackID = true;
                db.collection('blMember').add({
                  data: {
                    _openid: app.globalData._openid,
                    _permNum: app.globalData.permNum
                  }
                }).then(res_2=>{
                  console.log("[blMember][_openid]: ", res.data[0]._openid)
                  wx.showToast({
                    title: '绑定成功！',
                    icon: 'success',
                    duration : 6000
                  })
                })
              }
            },
            fail: function(res_1){
              console.log('[blMemberSearch fail]')
            }
          })
        }
      },
      fail: res=>{
        console.log("[blMember][查询]： false")
      }
    })
  }
})