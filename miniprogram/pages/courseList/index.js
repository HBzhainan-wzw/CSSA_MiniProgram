// pages/courseList/index.js
Page({
  //mixins: [require('../courseList/common')],
  data: {
    list: [
      {
        id: 'math',
        name: 'MATH',
        open: false,
        pages: ['MATH 4A', 'MATH 4B', 'MATH 6A'],
      },
      {
        id: 'cs',
        name: 'CMPSC',
        open: false,
        pages: ['CMPSC 8', 'CMPSC 16', 'CMPSC 24', 'CMPSC 32'],
      },
      {
        id: 'chem',
        name: 'CHEM',
        open: false,
        pages: ['CHEM 1A/1AL', 'CHEM 1B/1BL'],
      },
    ],
  },
  kindToggle(e) {
    const { id } = e.currentTarget; const { list } = this.data;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list,
    });
  },
  changeTheme() {
    console.log(this.data);
    getApp().themeChanged(this.data.theme === 'light' ? 'dark' : 'light');
  },
});