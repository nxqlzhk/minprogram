// 优化setData 减少使用setData
// 存放高度累加数组
let heightArr = [0];

// 点击菜品的数据
let cartData = {};
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
		rightId: "right0",
		// 老板推荐菜品数据
		recommendFoodList: [],
		// 菜品类别数据
		food_types: [],
		// 菜品详情数据
		food_detail: [],
		// openid: null,
	},
	// 左侧菜单点击事件
	handleItemTap(e) {
		// 获取被点击标题的索引
		const { index } = e.currentTarget.dataset;
		this.setData({
			currentIndex: index,
			rightId: "right" + index,
		});
	},

	// 右侧滚动事件
	rightScroll(e) {
		// 获取滚动的高度
		let st = e.detail.scrollTop;
		for (let i = 0; i < heightArr.length - 1; i++) {
			if (st >= heightArr[i] && st < heightArr[i + 1]) {
				this.setData({
					currentIndex: i,
				});
				// 保证性能
				return;
			}
		}
	},
	// 老板推荐部分点击加入购物车
	handleRecommendData(e){
		wx.cloud
		.callFunction({
			name: "getRecommendData",
			// 传递参数
			data: {
				name: e.target.dataset.name,
			},
		})
		.then(
			(res) => {
				cartData = res.result.data[0];
			},
			(err) => {
				console.log("error", err);
			}
		);
		// 设置定时器
		setTimeout(() => {
			// 获取缓存中的购物车 数组
			let cart = wx.getStorageSync("cart") || [];
			// 判断 商品对象是否存在于购物车数组中
			let index = cart.findIndex((v) => v.id === cartData.id);
			if (index === -1) {
				// 数据不存在 第一次添加
				cartData.num = 1;
				cart.push(cartData);
			} else {
				// 已经存在购物车数据 加1
				cart[index].num++;
			}
			// 把购物车重新添加到缓存中
			wx.setStorageSync("cart", cart);
			// 弹窗提示
			wx.showToast({
				title: "加入购物车",
				icon: "success",
				// 防止用户一直点击
				mask: true,
			});
		}, 700);
	},
	// 点击 加入购物车
	handleCartAdd(e) {
		// 获取点击菜品id
		let id = e.target.id;
		wx.cloud
			.callFunction({
				name: "getCartData",
				// 传递参数
				data: {
					cartId: id,
				},
			})
			.then(
				(res) => {
					cartData = res.result.data[0];
				},
				(err) => {
					console.log("error", err);
				}
			);
		// 设置定时器
		setTimeout(() => {
			// 获取缓存中的购物车 数组
			let cart = wx.getStorageSync("cart") || [];
			// 判断 商品对象是否存在于购物车数组中
			let index = cart.findIndex((v) => v.id === cartData.id);
			if (index === -1) {
				// 数据不存在 第一次添加
				cartData.num = 1;
				cart.push(cartData);
			} else {
				// 已经存在购物车数据 加1
				cart[index].num++;
			}
			// 把购物车重新添加到缓存中
			wx.setStorageSync("cart", cart);
			// 弹窗提示
			wx.showToast({
				title: "加入购物车",
				icon: "success",
				// 防止用户一直点击
				mask: true,
			});
		}, 700);
	},

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
	onReady: function () {
		// 获取菜单栏右侧盒子高度
		// 设置定时器，保证数据已经从云端获取到了
		setTimeout(() => {
			const query = wx.createSelectorQuery();
			query.selectAll(".food-detail-box").boundingClientRect();
			query.selectViewport().scrollOffset();
			query.exec(function (res) {
				res[0].map((val) => {
					// 给累加数组赋值
					let result = val.height + heightArr[heightArr.length - 1];
					heightArr.push(result);
				});
			});
		}, 700);
	},

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
