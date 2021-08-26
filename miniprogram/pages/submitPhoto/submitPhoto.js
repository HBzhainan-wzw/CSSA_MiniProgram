// pages/submitPhoto/submitPhoto.js
Page({
  
  data: {
      files: [],
      functionID: 0,
      titles: ["","标题1","标题2"],
      guidelines: ["","规则1","规则2"],
      title: "",
      guideline: "",
  },
  onLoad:function(options){
    this.setData({
        functionID: options.functionID,
    })
    this.setData({
        title: this.data.titles[this.data.functionID],
        guideline: this.data.guidelines[this.data.functionID],
    })
  },

  chooseImage: function (e) {
      var that = this;
      wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              that.setData({
                  files: that.data.files.concat(res.tempFilePaths)
              });
          }
      })
  },
  previewImage: function(e){
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.files // 需要预览的图片http链接列表
      })
  },
  deleteImage: function(e){
    var that = this;
    var images = that.data.files;
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定删除此图片吗？',
      success (res) {
      if (res.confirm) {
      console.log('用户点击确定');
      images.splice(index,1);
      } else if (res.cancel) {
      console.log('用户点击取消');
      return false;
      }
      that.setData({
        files:images,
      });
      }
      })
  }
});