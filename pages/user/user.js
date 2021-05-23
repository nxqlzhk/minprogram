Page({
	data: {
		// 客服电话
		phoneNumber: "044-735735",
		// 个人信息
		userInfo: {},
		// 判断是否登录变量
		hasUserInfo: false,
	},
	onLoad() {
		// 获取缓存中数据
		let user = wx.getStorageSync("user");
		this.setData({
			userInfo: user,
		});
		if (user != "") {
			this.setData({
				hasUserInfo: true,
			});
		}
	},
	// 获取用户信息
	// getInformation(e) {
	// 	// 获取用户信息
	// 	const { encryptedData, errMsg, iv, signature } = e.detail;
	// 	// 获取小程序登录成功后的code
	// 	wx.login({
	// 		timeout: 10000,
	// 		success: (result) => {
	// 			const { code } = result;
	// 		},
	// 	});
	// 	// 封装参数
	// 	const loginParams = { encryptedData, errMsg, iv, signature };
	// 	// 发送请求 获取用户的token
	// 	const res = await request({
	// 		url: "https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin",
	// 		data: loginParams,
	// 		method: "post",
	// 	});
	// 	console.log(res);
	// },

	// 获取用户个人信息
	getUserProfile(e) {
		// wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
		// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
		wx.getUserProfile({
			desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: (res) => {
				// 把用户信息存储在本地
				wx.setStorageSync("user", res.userInfo);
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true,
				});
			},
		});
	},

	//拨打电话
	callPhone() {
		wx.makePhoneCall({
			phoneNumber: this.data.phoneNumber,
			success: function () {
				console.log("拨打成功");
			},
			fail: function () {
				console.log("拨打失败");
			},
		});
	},
});
