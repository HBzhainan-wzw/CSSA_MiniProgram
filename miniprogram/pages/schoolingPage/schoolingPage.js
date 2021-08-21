// pages/schoolingPage/schoolingPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warnSigned: false,
    signed: false,
    signCounts: 0,
    signedToday: false,
    selected: 0,
    list: ['返校前', '返校中', '返校后'],
  },
  //tab框
  selected: function (e) {
    let that = this
    //console.log(e)
    let index = e.currentTarget.dataset.index
    //console.log("index",index)
    if (index == 0) {
      that.setData({
        selected: 0
      })
    } else if (index == 1) {
      that.setData({
        selected: 1
      })
    } else {
      that.setData({
        selected: 2
      })
    } 
  },
  sign: function(e) {
    var that = this;
    if(that.data.signedToday == false){
      that.setData({
        signed: true,
        signCounts: that.data.signCounts + 1,
        signedToday: true,
      })
    }
    else{
      that.setData({
        warnSigned: true,
      })
    }
    
  },
  close: function(e) {
    this.setData({
      warnSigned: false,
    })
  }
})