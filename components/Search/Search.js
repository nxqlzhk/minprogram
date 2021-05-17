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
						// 判断是否查找到数据
						// 没有查找到数据，显示提示信息
						if(res.result.data.length == 0){
							this.setData({
								foodList: [],
								isShow: false,
							});
						}else {
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
	},
});
