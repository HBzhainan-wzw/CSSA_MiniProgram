var ctx = "" // 用于获取canvas
var leftMargin = "" //文字距离左边边距
var topMargin = "" //文字距离右边边距
Page({
 
 /**
 * 页面的初始数据
 */
 data: {
  access_token:"",
  nickname: "",
  filepath:"",
  List: [{}],
  canvasWidth: '', // canvas宽度
  canvasHeight: '', // canvas高度
  imagePath: '' // 分享的图片路径
 },
 
 /**
 * 生命周期函数--监听页面加载
 */
 onLoad: function (options) {
  var info = JSON.parse(options.info)
  console.log("[info]: ", info)
  this.setData({
    nickname: info.nickname,
    List: info.List,
    access_token: info.access_token
  })
  
  var color = {  
    r: '247',
    g: '218',
    b: '0'
  }
  var paramJson = {
    scene: wx.getLaunchOptionsSync().scene,
    width: 100,
    is_hyaline: true,
    auto_color: false,
    line_color: color
  }
  
  var paramString = JSON.stringify(paramJson)
  var that = this;
  

 console.log("[access token]: ", this.data.access_token)
// wx.request({
//     url:"https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token="+ this.data.access_token,
//     method: 'POST',
//     data: {'path': "/pages/myIndex/myIndex?uid=1",'width': 430},
//     responseType: 'arraybuffer',
//     success(res){
//       console.log(res.statusCode)
//       console.log("[res_buffer]",res.data)

//       let fileManager = wx.getFileSystemManager();//获取文件管理器
//       let filePath = wx.env.USER_DATA_PATH + '/inner.jpg';//设置临时路径

//       fileManager.writeFile({
//         filePath: filePath,
//         encoding: 'binary',
//         data: res.data,
//         success: function(res){
//           console.log(res)
//           console.log("[filepath]: ",filePath)
//           that.setData({
//             filepath: filePath
//           })
//         },
//         fail:  function(res){
//           console.log(res)
//         }
//       })
//     }     
//   });









 var that = this
 var sysInfo = wx.getSystemInfo({
  success: function (res) {
  that.setData({
   //设置宽高为屏幕宽，高为屏幕高的80%，因为文档比例为5:4
   canvasWidth: res.windowWidth,
   canvasHeight: res.windowWidth * 3.2347
  })
  leftMargin = res.windowWidth
  topMargin = res.windowWidth * 3.2347
  },
 })
 },
 
 /**
 * 生命周期函数--监听页面初次渲染完成
 */
 onReady: function () {
 ctx = wx.createCanvasContext('myCanvas')
 this.addImage()
 this.tempFilePath()
  
 },
 addEvent:function(){
  var List = this.data.List;
  console.log("[addEvent]: ", List)
  var i = 0;
  var count = 0;
  while(i < 56){
    if(List[i].s == 1){
      if(count <= 29){
        console.log("[addEvent.drawing]:  ",i)

        var context = wx.createContext();
        var that = this;
        var width = this.data.canvasWidth*0.2
        var height = this.data.canvasWidth*0.2
        var path = "/images/" + i + ".png";     
        var x = this.data.canvasWidth*0.04 + (count%4) * this.data.canvasWidth*0.24;
        var y = this.data.canvasHeight*0.3  + parseInt(count/4) * this.data.canvasWidth*0.24 ; 
        console.log("[addEvent.drawing]:  ",x,"  ", y)
        count++;
        ctx.drawImage(path, x, y, width, height);        
      }else{
        count++;
      }
    }
    i++;
  }
  ctx.font = 'normal bold 20px sans-serif';
  ctx.setTextAlign('center'); // 文字居中
  ctx.setFillStyle("#222222");
  ctx.fillText(JSON.stringify(count), 0.418*this.data.canvasWidth,0.262*this.data.canvasHeight)
  ctx.font = 'italic bold 18px Arial';
  ctx.setFillStyle("#a81818");
  ctx.fillText(this.data.nickname, 0.31*this.data.canvasWidth,0.246*this.data.canvasHeight)
  ctx.drawImage("/images/QRcode.png",this.data.canvasWidth*0.62, this.data.canvasHeight*0.81, 140, 160);
 },

 //画背景图
 addImage: function () {
 var context = wx.createContext();
 var that = this;
 var path = "/images/background.jpg";
 //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
 //不知道是什么原因，手机环境能正常显示
 ctx.drawImage(path, 0, 0, this.data.canvasWidth, this.data.canvasHeight);
 this.addEvent()
 ctx.draw()
 },

 /**
 * 用户点击右上角分享
 */
 //导出图片
 tempFilePath: function(){
  let that = this;
  wx.canvasToTempFilePath({
    x: 0,
    y: 0,
    width: that.data.canvasWidth,
    height: that.data.canvasHeight,
    destWidth: that.data.canvasWidth,
    destHeight: that.data.canvasHeight,
    canvasId: 'myCanvas',
    success (res) {
      console.log('canvasToTempFilePath:', res.tempFilePath)
      wx.getSetting({
        success(res2) {
          // 如果没有则获取授权
          if (!res2.authSetting['scope.writePhotosAlbum']) {
            wx.showModal({
              title: '权限申请',
              content: '点击 “确定” 按钮，打开相册的权限设置界面',
              cancelText: '取消',
              confirmText: '确定',
              success(res3) {
                if (res3.confirm) {
                  wx.openSetting({
                    success: function(res4) {
                      wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success() {
                          wx.showToast({
                            title: '保存成功!'
                          })
                        },
                        fail() {
                        }
                      })
                    },
                    fail: function(res5) {
                      wx.showToast({
                        title: '你阻止了授权!',
                        icon: 'none'
                      })
                    }
                  });
                }
              }
            });
          } else {
            // 有则直接保存
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success() {
                wx.showToast({
                  title: '保存成功!!'
                })
              },
              // fail() {
              //   wx.showToast({
              //     title: '保存失败!!',
              //     icon: 'none'
              //   })
              // }
            })
          }
        }
      })
    },
    fail () {
      // wx.showToast({
      //   title: '保存失败~',
      //   icon: 'none'
      // })
    }
  });



 }
})