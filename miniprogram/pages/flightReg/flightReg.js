// pages/flightReg/flightReg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    account:"",
    haveTicket: false
  },
  onAnnounce: function(e){
    wx.navigateTo({
      url: '../flightAnc/flightAnc',
    })
  },
  nameInput: function(e){
    this.setData({
      name: e.detail.value
    })
    //console.log("[姓名]： "+ this.data.name)
  },
  accountInput: function(e){
    this.setData({
      account: e.detail.value
    })
    //console.log("[微信号]： "+ this.data.account)
  },
  onTicket: function(e){
    var hT = this.data.haveTicket;
    this.setData({
      haveTicket: !hT
    })
    console.log("[选取机票]： " + this.data.haveTicket)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  clickButton: function(e){
    var ac = this.data.account;
    var nm = this.data.name;
    var tk = this.data.haveTicket;
    if(ac == "" || nm == ""){
      wx.showToast({
        title: '信息错误！',
        icon: 'none',
        duration: 2000
      }) 
    }else{
      console.log("[注册信息]： " + this.data.name + "   " + this.data.account + "  " + JSON.stringify(tk))
      wx.navigateTo({
        url: '../flightReg2/flightReg2?account=' + JSON.stringify(ac) + '&name=' + JSON.stringify(nm) + '&haveTicket=' + JSON.stringify(tk),
      })
    }
  },
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {


  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {


  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    
  }
})