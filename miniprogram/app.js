// app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'my-cloud-4g5edkwzfa83ec44',
    })
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }

    this.globalData = {};
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name:'quickstartFunctions',
      data:{type: 'getOpenId'},
      success: res=>{

        this.globalData.openid=res.result.openid
        console.log(this.globalData.openid)
        wx.hideLoading()
      },
      fail: err=>{
        console.error("调用失败")
      }
    })

  }
});
