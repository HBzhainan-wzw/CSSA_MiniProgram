// pages/courseList/index.js
Page({
  data: {
    list: [
      {
        id: 'math',
        name: 'MATH',
        open: false,
        pages: ['MATH4A', 'MATH4B', 'MATH6A'],
      },
      {
        id: 'cs',
        name: 'CMPSC',
        open: false,
        pages: ['CMPSC8', 'CMPSC16', 'CMPSC24', 'CMPSC32'],
      },
      {
        id: 'chem',
        name: 'CHEM',
        open: false,
        pages: ['CHEM1A/1AL', 'CHEM1B/1BL'],
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