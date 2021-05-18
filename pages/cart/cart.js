/* 
1 页面加载完毕
  0 onLoad  onShow 
  1 获取本地存储中的地址数据
  2 把数据 设置给data中的一个变量
2 onShow 
  0 回到了商品详情页面 第一次添加商品的时候 手动添加了属性
    1 num=1;
    2 checked=true;
  1 获取缓存中的购物车数组
  2 把购物车数据 填充到data中
3 全选的实现 数据的展示
  1 onShow 获取缓存中的购物车数组
  2 根据购物车中的商品数据 所有的商品都被选中 checked=true  全选就被选中
4 总价格和总数量
  1 都需要商品被选中 我们才拿它来计算
  2 获取购物车数组
  3 遍历
  4 判断商品是否被选中
  5 总价格 += 商品的单价 * 商品的数量
  5 总数量 +=商品的数量
  6 把计算后的价格和数量 设置回data中即可
5 商品的选中
  1 绑定change事件
  2 获取到被修改的商品对象
  3 商品对象的选中状态 取反
  4 重新填充回data中和缓存中
  5 重新计算全选。总价格 总数量。。。
6 全选和反选
  1 全选复选框绑定事件 change
  2 获取 data中的全选变量 allChecked
  3 直接取反 allChecked=!allChecked
  4 遍历购物车数组 让里面 商品 选中状态跟随  allChecked 改变而改变
  5 把购物车数组 和 allChecked 重新设置回data 把购物车重新设置回 缓存中 
7 商品数量的编辑
  1 "+" "-" 按钮 绑定同一个点击事件 区分的关键 自定义属性 
    1 “+” "+1"
    2 "-" "-1"
  2 传递被点击的商品id 
  3 获取data中的购物车数组 来获取需要被修改的商品对象
  4 当 购物车的数量 =1 同时 用户 点击 "-"
    弹窗提示(showModal) 询问用户 是否要删除
    1 确定 直接执行删除
    2 取消  什么都不做 
  4 直接修改商品对象的数量 num
  5 把cart数组 重新设置回 缓存中 和data中 this.setCart

8 微信支付
  1 筛选选中的数据
	2 先判断缓存中有没有token，没有跳转到授权页面获取token，
  2 经过以上的验证 跳转到 支付页面！ 
 */

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		// 购物车数据
		cart: [],
		// 全选
		allChecked: false,
		// 总价格
		totalPrice: 0,
		totalNum: 0,
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// 启动刷新动画
		// wx.startPullDownRefresh();
		// this.getCart();
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		// 获取缓存中的购物车数据
		const cart = wx.getStorageSync("cart") || [];
		this.setCart(cart);
	},

	// 设置购物车状态 同时重新计算 价格数量
	setCart(cart) {
		let allChecked = true;
		let totalPrice = 0;
		let totalNum = 0;
		// 计算全选 空数组调用every，返回值为true
		// const allChecked = cart.length ? cart.every((v) => v.checked) : false;
		// 优化 在计算总数量和总价格循环中判断
		cart.forEach((v) => {
			if (v.checked) {
				totalPrice += v.num * v.price;
				totalNum += v.num;
			} else {
				allChecked = false;
			}
		});
		// 判断数组是否为空
		allChecked = cart.length != 0 ? allChecked : false;
		// 把购物车数据重新设置回data中和缓存中
		this.setData({
			cart,
			allChecked,
			totalPrice,
			totalNum,
		});
		wx.setStorageSync("cart", cart);
	},
	// 选择框功能
	handleItemChange(e) {
		// 获取被修改的商品的id
		const id = e.currentTarget.dataset.id;
		// 获取购物车数组
		let { cart } = this.data;
		// 找到被修改的商品对象
		let index = cart.findIndex((v) => v.id === id);
		// 选中的状态取反
		cart[index].checked = !cart[index].checked;
		this.setCart(cart);
	},

	// 商品的全选功能
	handleItemAllChange() {
		// 获取data中数据
		let { cart, allChecked } = this.data;
		// 修改选中状态值
		allChecked = !allChecked;
		// 循环修改cart数组 中的商品状态
		cart.forEach((v) => (v.checked = allChecked));
		// 把修改后的值 填充回data或者缓存中
		this.setCart(cart);
	},

	// 商品数量的编辑功能
	handleItemNumEdit(e) {
		// 获取传递过来的参数
		const { operation, id } = e.currentTarget.dataset;
		// 获取购物车数组
		let { cart } = this.data;
		// 找到需要修改的商品的索引
		const index = cart.findIndex((v) => v.id === id);
		// 判断是否要执行删除
		if (cart[index].num === 1 && operation === -1) {
			// 弹窗提示
			wx.showModal({
				title: "提示",
				content: "您是否要删除？",
				success: (res) => {
					if (res.confirm) {
						cart.splice(index, 1);
						this.setCart(cart);
					} else if (res.cancel) {
						console.log("用户点击取消");
					}
				},
			});
		} else {
			// 进行修改数量
			cart[index].num += operation;
			// 设置回缓存和data中
			this.setCart(cart);
		}
	},

	// 订单支付功能
	handlePay() {
		// 获取缓存中的购物车数据
		const cart = wx.getStorageSync("cart") || [];
		// 过滤后的购物车数组
		let checkedCart = cart.filter((v) => v.checked);
		this.setCart(checkedCart);
		// 判断缓存中有没有token
		const token = wx.getStorageSync("token");
		if (!token) {
			wx.switchTab({
				url: "../user/user",
			});
			return;
		}
		console.log("已经存在token");
	},
});
