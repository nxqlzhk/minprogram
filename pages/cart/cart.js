// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getCart(){
    wx.cloud
    .callFunction({
      name: "getData",
    })
    .then(
      (res) => {
        // 结束刷新动画
        wx.stopPullDownRefresh()
        // this.setData({
        //   recommendFoodList: res.result.data,
        // });
      },
      (err) => {
        console.log("error", err);
      }
    );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 启动刷新动画
    wx.startPullDownRefresh()
    this.getCart()
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getCart()
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