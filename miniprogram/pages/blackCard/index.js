// pages/blackCard/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openID: '',
    phoneNum: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('1');
  },
  permInput: function(e){
    app.globalData.phoneNum = e.detail.value
  },
  clickButton: function(){
    console.log("[GlobalData.permNum]: ",app.globalData.permNum )
    if(app.globalData.phoneNum == undefined){
      console.log("[permNum]: Null input")
      return false;
    } 
    const db = wx.cloud.database()


    db.collection('BlackCard').where({
      phoneNum: parseInt(app.globalData.phoneNum)
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