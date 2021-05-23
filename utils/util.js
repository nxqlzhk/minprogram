/**
 *  promise 形式  showModal
 * @param {object} param0 参数
 */
/*
export const showModal = ({ content }) => {
	return new Promise((resolve, reject) => {
		wx.showModal({
			title: "提示",
			content: content,
			success: (res) => {
				resolve(res);
			},
			fail: (err) => {
				reject(err);
			},
		});
	});
};
*/

// 根据时间生成唯一订单
export const randomOrder = () => {
	const now = new Date();
	const year = now.getFullYear();
	let month = now.getMonth() + 1;
	let day = now.getDate();
	let hour = now.getHours();
	let minutes = now.getMinutes();
	let seconds = now.getSeconds();
	String(month).length < 2 ? (month = Number("0" + month)) : month;
	String(day).length < 2 ? (day = Number("0" + day)) : day;
	String(hour).length < 2 ? (hour = Number("0" + hour)) : hour;
	String(minutes).length < 2 ? (minutes = Number("0" + minutes)) : minutes;
	String(seconds).length < 2 ? (seconds = Number("0" + seconds)) : seconds;
	// 生成1-100随机数
	let number = Math.floor(Math.random() * (10000 - 100)) + 100;
	const yyyyMMddHHmmss =
		number + `${year}${month}${day}${hour}${minutes}${seconds}`;
	return yyyyMMddHHmmss;
};
