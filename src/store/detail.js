import {reqGetGoodsInfo, reqAddOrUpdateShopCart} from "@/api";
//封装游客身份模块 uuid --> 生成一个随机字符串（不会再变）
import {getUUID} from '@/utils/uuid_token';
const state = {
    goodInfo: {},
    uuid_token: getUUID()
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    },
}; 
const actions = {
    //获取产品信息的action
    async getGoodInfo({commit}, skuId) {
        let result = await reqGetGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GETGOODINFO", result.data);
        }
    },
    //间产品添加到购物车中
    //async函数的返回一定是Promise,要么成功，要么失败
    async addOrUpdateShopCart({commit}, {skuId, skuNum}) {
        //加入购物车返回的结构
        //加入购物车后，前台将参数带给服务器
        //服务器写入数据成功，并没有返回其他数据。至少返回code=200
        //因为服务器没有返回其它数据，所以我们不需要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        //判断服务器加入购物车成功与否
        if(result.code == 200) {
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'));
        }
    }
};
//简化数据
const getters = {
    categoryView(state) {
        //state.goodInfo  初始化状态空对象，空对象categoryView属性值undefined
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    //简化产品售卖属性信息
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
};
export default {
    state,
    actions,
    mutations,
    getters,
};