// pages/header/header.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		numbers: [
			{
				id: 1,
				isClick: true,
			},
			{
				id: 2,
				isClick: false,
			},
			{
				id: 3,
				isClick: false,
			},
			{
				id: 4,
				isClick: false,
			},
			{
				id: 5,
				isClick: false,
			},
			{
				id: 6,
				isClick: false,
			},
			{
				id: 7,
				isClick: false,
			},
			{
				id: 8,
				isClick: false,
			},
		],
		values: 1,
	},
	// 自定义事件 用来接受子组件传来的参数
	handleBgcChange(e) {
		const { index } = e.detail;
		let { numbers } = this.data;
		let values = index + 1;
		wx.setStorageSync("numOrder",values);
		numbers.forEach((v, i) =>
			i == index ? (v.isClick = true) : (v.isClick = false)
		);
		this.setData({
			numbers,
			values,
		});
	},
	// 获取点餐人数
	handleValues() {
		const { values } = this.data;
		console.log(values);
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

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
