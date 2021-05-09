Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		// 用餐人数
		numOrder: "",
		// 被点击的左侧菜单
		currentIndex: 0,
		// 右侧内容的滚动条距离顶部的距离
		scrollTop: 0,
		// 老板推荐菜品数据
		recommendFoodList: [],
		// 菜品类别数据
		food_types: [],
		// 菜品详情数据
		food_detail: [],
		openid: null,
	},

	handleItemTap(e) {
		// 获取被点击标题的索引
		const { index } = e.currentTarget.dataset;
		this.setData({
			currentIndex: index,
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		// 查询操作 传统写法
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

		// 云函数调用 获取recommend_food表中数据
		wx.cloud
			.callFunction({
				name: "getData",
			})
			.then(
				(res) => {
					this.setData({
						recommendFoodList: res.result.data,
					});
				},
				(err) => {
					console.log("error", err);
				}
			);

		// 云函数调用 获取food_types表中数据
		wx.cloud
			.callFunction({
				name: "getTypes",
			})
			.then(
				(res) => {
					this.setData({
						food_types: res.result.data,
					});
				},
				(err) => {
					console.log("error", err);
				}
			);

		// 云函数调用 获取food_detail表中数据
		wx.cloud
			.callFunction({
				name: "getDetail",
			})
			.then(
				(res) => {
					this.setData({
						food_detail: res.result.data,
					});
				},
				(err) => {
					console.log("error", err);
				}
			);
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
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {},
});
