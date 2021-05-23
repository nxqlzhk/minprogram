// 点击菜品的数据
let cartData = {};
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {},

	/**
	 * 组件的初始数据
	 */
	data: {
		// 匹配菜品
		foodList: [],
		isShow: true,
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		queryDetails(e) {
			let value = e.detail.value;
			// 云函数调用 查询用户搜索菜名
			wx.cloud
				.callFunction({
					name: "queryFood",
					data: {
						v: value || 1,
					},
				})
				.then(
					(res) => {
						// 判断是否查找到数据
						// 没有查找到数据，显示提示信息
						if (res.result.data.length == 0) {
							this.setData({
								isShow: false,
							});
						} else {
							// 查找到数据，显示数据
							this.setData({
								foodList: res.result.data,
								isShow: true,
							});
						}
					},
					(err) => {
						console.log("error", err);
					}
				);
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
					cartData.checked = true;
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
	},
});
