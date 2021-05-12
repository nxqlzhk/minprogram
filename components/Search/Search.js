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
		foodList: []
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		queryDetails(e) {
			let value = e.detail.value;
			console.log(value);
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
					console.log(res);
					this.setData({
						foodList:res.result.data
					})
				},
				(err) => {
					console.log("error", err);
				}
			);

		},
	},
});
