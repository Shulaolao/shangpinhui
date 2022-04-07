//当前这个模块：API进行统一管理
import requests from './request';
import mockRequests from './mockRequest';
//三级联动解接口
//api/product/getBaseCategoryList get 无参数
//发请求:axios发请求返回结果Promise对象
//对外暴露一个函数，如果外部调用这个函数，就向服务器发起 ajax请求,进而获取三级菜单数据
export const reqGetCategoryList = () => requests({url:"/product/getBaseCategoryList",method:'get'});
//切记：当前函数执行需要把服务器返回结果返回

//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get("/banner");
 
//获取floor数据
export const reqGetFloorList = () => mockRequests.get('/floor');

//获取搜索模块数据 请求api、请求地址、携带参数、请求方式
//当前这个函数需不需要接受外部传递参数
//当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params) => requests({url:'/list', method:'post', data:params})

//获取产品详情信息的接口 URL：/api/item/{skuId} 请求方式：get
export const reqGetGoodsInfo = (skuId) => requests({url:`item/${skuId}`,method:'get'});

//将产品添加到购物车中（或者更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({url: `/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'});

//获取购物车列表数据接口
export const reqCartList = () => requests({url: '/cart/cartList', method: 'get'});

//删除购物产品接口
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

// 修改商品选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked} method: get
export const reqUpdateCheckedByid = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`, method: 'get'});

//获取验证码
export const reqGetCode = (phone) => requests({url: `/user/passport/sendCode/${phone}`, method:'get'});

//注册接口
export const reqUserRegister = (data) => requests({url:'/user/passport/register',data, method:'post'});

//登录接口
export const reqUserLogin = (data) => requests({url:'/user/passport/login', data, method:"post"});

//获取用户信息【需要带着用户的token向服务器要用户信息】
export const reqUserInfo = () => requests({url: '/user/passport/auth/getUserInfo', method:'get'})

//退出登录
export const reqLogout = () => requests({url:'/user/passport/logout', method:'get'});

//获取用户地址信息
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList', method:'get'});

//获取商品清单
export const reqOrderInfo = () => requests({url:'/order/auth/trade', method:'get'});

//提交订单接口
export const reqSubmitOrder = (tradeNo, data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method:'post'});

//获取订单支付信息
export const reqPayInfo = (orderId) => requests({url: `/payment/weixin/createNative/${orderId}`, method:'get'});

//获取订单支付状态
export const reqPayStatus = (orderId) => requests({url: `/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

//获取个人中心数据
export const reqMyOrderList = (page, limit) => requests({url:`/order/auth/${page}/${limit}`, method:'get'});