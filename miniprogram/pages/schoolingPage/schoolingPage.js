// pages/schoolingPage/schoolingPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  }
})