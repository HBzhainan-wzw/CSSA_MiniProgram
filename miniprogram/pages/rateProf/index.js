// pages/rateProf/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  nameInput: function(e){
    this.setData({
      searchName: e.detail.value
    })
    console.log("[search]: " + this.data.searchName);
  },
 onClickBotton: function(e){
  



 }
})