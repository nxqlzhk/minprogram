Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		// 用餐人数
		numOrder: "",
		// 被点击的左侧菜单
		currentIndex: 0,
		// 锚点定位
		// scrollTopList: [0, 2040, 5640, 7150, 7510, 9070, 10630, 10990],
		scrollTop: "",
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

	// 右侧滚动事件
	rightScroll() {},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
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
		// wx.cloud
		// 	.callFunction({
		// 		name: "getTypes",
		// 	})
		// 	.then(
		// 		(res) => {
		// 			this.setData({
		// 				food_types: res.result.data,
		// 			});
		// 		},
		// 		(err) => {
		// 			console.log("error", err);
		// 		}
		// 	);

		// 云函数调用 获取food_detail表中数据
		wx.cloud
			.callFunction({
				name: "getDetail",
			})
			.then(
				(res) => {
					this.setData({
						food_detail: res.result.data,
						food_types: res.result.data,
					});
					console.log(res.result.data)
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

});
