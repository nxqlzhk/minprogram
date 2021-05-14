Page({
	data: {
		// 客服电话
		phoneNumber: "044-735735",
		userInfo: {},
		hasUserInfo: false,
	},
	onLoad() {},

	getUserProfile(e) {
		// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
		// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
		wx.getUserProfile({
			desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: (res) => {
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
