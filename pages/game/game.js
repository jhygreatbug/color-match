// const util = require('../../utils/util.js')
var appInstance = getApp();
Page({
  data: {},
  onLoad: function (options) {
    this.setData({
      degreeOfDifficulty: options.mode
    });
    wx.setNavigationBarTitle({
      title: options.mode
    });
  }
})
