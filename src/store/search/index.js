import { reqGetSearchInfo } from "@/api";

//search模块小仓库
const state = {
    //仓库初始状态
    searchList:{}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    },
};
const actions = {
    //获取search模块数据
    async getSearchList({commit}, params = {}) {
        //当前这个reqSearchInfo 函数调用获取服务器数据的时候，至少传递一个参数（空对象）
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
};
//计算属性
//简化仓库中的数据
//可以把我们将来在组件中的要用的数据简化一下
const getters = {
    //当前形参state，是当前仓库中的state，非大仓库中的state
    goodsList(state) {
        //服务器数已经回来了，就是一个数组；但是如果网络不好就返回一个空数组.
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
};
