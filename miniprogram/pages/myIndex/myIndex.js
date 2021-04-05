// pages/myIndex/myIndex.js
const app = getApp()
Page({
// 四个按钮的贴图+链接+导航方式
  data: {
    

    imageItems: [{
      id: 0,
      link: "https://s3.ax1x.com/2020/11/24/DNZQaR.jpg",
    }, {
      id: 1,
      link: "https://s3.ax1x.com/2021/02/01/yZ4Ruq.jpg",
    }, {
      id: 2,
      link: "https://s3.ax1x.com/2020/11/24/DNKqaQ.png",
    }],
    imgs1:[
      { url: 'https://s3.ax1x.com/2021/01/06/sVVlqJ.png', 
        name: '商家优惠',
        id:"0",
        navigator: "sponsorNavigate"},
      { url: 'https://s3.ax1x.com/2021/01/06/sVmPKO.png', 
        name: '表白墙',
        id:"1",
        navigator: "confessWallNavigate"},
      { url: 'https://s3.ax1x.com/2021/01/06/sVmMM8.png', 
        name: '课群',
        id:"2",
        navigator: "courseGroupNavigate"},
      { url: 'https://s3.ax1x.com/2021/01/09/sM9uKU.png', 
        name: 'CSSA',
        id:"3",
        navigator: "introNavigate"},
    ],
    info:""
  },
  sponsorNavigate: function (e) {
    wx.navigateTo({
      url: '../sponsorList/sponsorList',

    })
  },
  springNavigate: function(e){
    wx.navigateTo({
      url: '../SpringPosterEntrance/SpringPosterEntrance',
    })
  },
  confessWallNavigate: function (e) {
    wx.navigateTo({
      url: '../confessWall/confessWall',
    })
  },
  courseGroupNavigate: function (e) {
    wx.navigateTo({
      url: '../ClassGroup/ClassGroup',
    })
  },
  introNavigate: function (e) {
    wx.navigateTo({
      url: '../CSSAintro/CSSAintro',
    })
  },
  //跳转对应的blog
  OnNavigate1: function(e){
    wx.navigateTo({
      url: '../Blogs/blog1/blog1',
    })
  },
  OnNavigate2: function(e){
    wx.navigateTo({
      url: '../Blogs/blog2/blog2',
    })
  },
    //跳转对应的banner
    imgTap1: function(e){
      wx.navigateTo({
        url: '../Banner/banner1/banner1',
      })
    },

    imgTap2: function(e){
      wx.navigateTo({
        url: '../Banner/banner2/banner2',
      })
    },

    imgTap3: function(e){
      wx.navigateTo({
        url: '../Banner/banner3/banner3',
      })
    },
// 自动登录+获取信息

  onLoad: function() {
    //获取授权，载入信息
    var that = this;
    // 查看是否授权
    wx.getSetting({
        success: function(res) {
            if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                    success: function(res) {
                        // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
                        // 根据自己的需求有其他操作再补充
                        // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                        wx.login({
                            success: res => {
                                // 获取到用户的 code 之后：res.code
                                console.log("用户的code:" + res.code);
                            }
                        });
                    }
                });
            } else {
                // 用户没有授权
                // 改变 isHide 的值，显示授权页面
                that.setData({
                    isHide: true
                });
            }
        }
    });
    // 调用云函数 获取openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        console.log('[云函数] [login] user openid: ', app.globalData.openid)
        // 检查是否为会员
        const db = wx.cloud.database()
        db.collection('blMember').where({
          _openid: app.globalData.openid
        }).get({
            success: res=>{
              console.log(res)
              if(res.data.length != 0){
                app.globalData.blackID = true
                console.log("[blMember]: true")
              }else{
                app.globalData.blackID = false
                console.log("[blMember]: false")                
              }
            },
            fail: err=>{
              console.log("[blMember][查询]: 失败")
            }

        })        
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  

})