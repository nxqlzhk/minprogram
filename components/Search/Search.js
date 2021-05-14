// components/Search/Search.js
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
						v: value,
					},
				})
				.then(
					(res) => {
						this.setData({
							foodList: res.result.data,
						});
						console.log(this.data.foodList);
						if (this.data.foodList === []) {
							console.log("sss");
							this.setData({
								isShow: false,
							});
						}
					},
					(err) => {
						console.log("error", err);
					}
				);
		},
	},
});
