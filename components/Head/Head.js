
Component({
	
	/**
	 * 组件的初始数据
	 */
	data: {},
	/**
	 * 组件的属性列表
	 */
	properties: {
		numbers: {
			type: Array,
			value: [],
		},
		values: {
			type: Number,
			value: 1,
		},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 选择人数改变背景颜色
		changeBgc(e) {
			const { index } = e.currentTarget.dataset;
			const value = index + 1;
			this.triggerEvent("bgcChange", { index, value });
		},

		// 开始点餐按钮
		getData() {
			// const { values } = e.currentTarget.dataset;
			this.triggerEvent("getValues");
		},
	},
});
