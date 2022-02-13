// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  jumpPage(e) {
    var location = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: location,
    });
  }
})