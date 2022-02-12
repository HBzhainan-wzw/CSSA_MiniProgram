// pages/flightReg2/flightReg2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flightCode: "",
    account: "",
    name: "",
    haveTicket: 0,
    target: "学校宿舍",
    showComplete: false,
    date: "2021-09-12",
    time:"12：00 - 15：00",
    items: [
      {value: '10：00 - 12：00', name: '10：00 - 12：00'},
      {value: '12：00 - 15：00', name: '12：00 - 15：00', checked: true},
      {value: '16：00 – 19：00', name: '16：00 – 19：00'},
      {value: '20：00 - 24：00', name: '20：00 - 24：00'},
      {value: '24：00 - 02：00', name: '24：00 - 02：00'}
    ],
    hotel:[
      {value: "学校宿舍", name: "学校宿舍", checked: true},
      {value: "Santa Catalina", name: "Santa Catalina"},
      {value: "Isla Vista 公寓", name: "Isla Vista 公寓"},
      {value: "学校周边酒店", name: "学校周边酒店"},
      {value: "其他酒店", name: "其他酒店"},
      {value: "还没订", name: "还没订"},
    ]
  },
  flightCodeInput: function(e){
    this.setData({
      flightCode: e.detail.value
    })
    console.log("[获得航班号]： " + this.data.flightCode)
  },
  onSubmit: function(e){
    console.log("[上传信息]： " + this.data.name + "   " + this.data.account + "   " + this.data.flightCode + "   " + this.data.date + "   " + this.data.time + "   " + this.data.target)
    const db = wx.cloud.database();
    db.collection('newFilghtReg').add({
      data:{
        name: this.data.name,
        account: this.data.account,
        flightCode: this.data.flightCode,
        flight_date: this.data.date,
        pickupTime: this.data.time,
        target: this.data.target
      }
    })
    wx.showToast({
      title: '报名成功！',
      icon: 'success',
      duration: 2000
    }) 
    this.setData({
      showComplete: true
    })
  },
  radioChange(e) {
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      time: e.detail.value
    })
    console.log('[选择时间]： ',this.data.time)
  },
  targetChange(event) {
    const hotels = this.data.hotel
    for (let i = 0, len = hotels.length; i < len; ++i) {
      hotels[i].checked = hotels[i].value === event.detail.value
    }
    this.setData({
      target: event.detail.value
    })
    console.log('[选择目的地]： ', this.data.target)
  },
  clickButton: function(e){
    console.log("click")
    wx.switchTab({
      url: '../myIndex/myIndex',
    })
  },
  bindDateChange: function(e){
    this.setData({
      date: e.detail.value
    })
    console.log("[获取日期]： " + this.data.date)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var Name = JSON.parse(options.name);
    var Account = JSON.parse(options.account);
    var HaveTicket = (options.haveTicket == 'true') ? true : false;
    this.setData({
      account: Account ,
      name: Name,
      haveTicket: HaveTicket
    })
    console.log("[注册信息]： " + this.data.name + "   " + this.data.account + "  " + this.data.haveTicket)

    if(this.data.haveTicket == false){
      this.setData({
        showComplete: true
      })
      const db = wx.cloud.database();
      console.log("[上传信息]： " + Name + "   " + Account + "   " + "NA" + "   " + "NA")
      db.collection('newFilghtReg').add({
        data:{
          name: Name,
          account: Account,
          flightCode: "NA",
          flight_date: "NA",
          pickupTime: "NA",
          target: "NA"
        }
      })
    }


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