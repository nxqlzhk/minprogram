// pages/myOrder/myOrder.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		foodOrder: [],
		food: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		// 获取缓存中的数据
		const foodOrder = wx.getStorageSync("foodOrder");
		const food = wx.getStorageSync("food");
		// 设置data中数据 用于渲染页面
		this.setData({
			foodOrder,
			food,
		});
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},
});
