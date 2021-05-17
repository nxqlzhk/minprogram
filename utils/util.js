// // const formatTime = date => {
// //   const year = date.getFullYear()
// //   const month = date.getMonth() + 1
// //   const day = date.getDate()
// //   const hour = date.getHours()
// //   const minute = date.getMinutes()
// //   const second = date.getSeconds()

// //   return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
// // }

// // const formatNumber = n => {
// //   n = n.toString()
// //   return n[1] ? n : `0${n}`
// // }
// const addCart = ()=>{
//   // 设置定时器
//   setTimeout(() => {
//     // 获取缓存中的购物车 数组
//     let cart = wx.getStorageSync("cart") || [];
//     // 判断 商品对象是否存在于购物车数组中
//     let index = cart.findIndex((v) => v.id === cartData.id);
//     if (index === -1) {
//       // 数据不存在 第一次添加
//       cartData.num = 1;
//       cart.push(cartData);
//     } else {
//       // 已经存在购物车数据 加1
//       cart[index].num++;
//     }
//     // 把购物车重新添加到缓存中
//     wx.setStorageSync("cart", cart);
//     // 弹窗提示
//     wx.showToast({
//       title: "添加成功",
//       icon: "success",
//       // 防止用户一直点击
//       mask: true,
//     });
//   }, 1000);
// }

// module.exports = {
//   addCart
// }
