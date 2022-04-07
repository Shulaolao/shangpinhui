import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from '@/api';
const state = {
    cartList: [],
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    },
};
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit('GETCARTLIST', result.data);
        }
    },
    //删除购物车某个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //修改商品选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedByid(skuId, isChecked) 
        if (result.code == 200) {
            return 'ok';                
        }else {
            return Promise.reject(new Error('faile'));
        }
    },
    deleteAllCheckedCart({dispatch,getters}) {
        //context：小仓库，commit【提交mutations 修改 state】
        //getter【计算属性】 dispatch【派发 actions】state【当前仓库数据】
        //获取购物车全部产品
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked==1?dispatch('deleteCartListBySkuId', item.skuId):'';
            PromiseAll.push(promise);
        });
        //只要全部p1|p2...都成功，返回结果即为成功
        //如果有一个失败，返回即为失败结果
        return Promise.all(PromiseAll);
    },
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
};
export default {
    state,
    mutations,
    actions,
    getters,
}