Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		numOrder: "",
		recommendFoodList: [],
		openid: null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		// 查询操作
		// 传统写法
		/*
		wx.cloud.database().collection('recommend_food')
			.get({
				success(res){
					console.log('请求成功',res)
				},
				fail(err){
					console.log('请求失败',err)
				}
			})
			
		es6的写法
		wx.cloud.database().collection('recommend_food')
			.get().then(res => {
				this.setData({
					recommendFoodList: res.data
				})
			},err=>{
				console.log('请求失败',err)
			})
		*/

			// 云函数调用
			wx.cloud.callFunction({
				name: 'getData',
			}).then(res => {
				console.log(res)
					// this.setData({
					// 	recommendFoodList: res.result.data
					// })
			},err => {
				console.log('error',err)
			})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		const numOrder = wx.getStorageSync("numOrder");
		this.setData({
			numOrder,
		});
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {},
});
