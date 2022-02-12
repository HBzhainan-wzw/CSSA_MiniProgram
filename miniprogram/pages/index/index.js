// index.js
// const app = getApp()
// const { envList } = require('../../envList.js');

Page({
  data: {

  },
  jumpPage(e) {
    var location = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: location,
    });
  }
});
