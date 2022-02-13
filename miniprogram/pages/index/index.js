// index.js
// const app = getApp()
// const { envList } = require('../../envList.js');

Page({
  data: {

  },

  onLoad:function(options){
     /*
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
      console.log(resp.result.openid)
      app.globalData.openid=resp.result.openid
      console.log(app.globalData.openid)
     wx.hideLoading();
   }).catch((e) => {
     wx.hideLoading();
    });*/
  },
  jumpPage(e) {
    var location = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: location,
    });
  }
});
