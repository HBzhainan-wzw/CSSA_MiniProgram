// pages/rateProf/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchName: "",
    resultArr: {},
    hideResult: true
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
    //console.log("[search]: " + this.data.searchName);
  },
 onClickButton: function(e){
  wx.cloud.callFunction({
    name: 'getProfData',
    data: {
      inputValue: this.data.searchName
    }
  }).then(res=>{
    this.setData({
      resultArr: res.result.data
    })
    console.log("[搜索成功]： ");
    console.log(this.data.resultArr);    
  })
 },
 showResult: function(e){


 }
})