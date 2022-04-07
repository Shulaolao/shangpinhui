import { reqGetCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";
//home模块小仓库
// state:仓库存储数据的地方 
const state = {
    //state中的数据默认初始值（根据接口返回值进行初始化）勿乱写，服务器返回对象、数组
    categoryList: [],
    //轮播图数据
    bannerList:[],
    //floor数据
    floorList:[],
};
// mutations：修改state的唯一手段
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        console.log('修改仓库中的数据');
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    },
};
// actions：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getCategoryList({commit}){
        //通过API里面的接口函数调用，向服务器发出请求，获取服务器数据
        let result = await reqGetCategoryList();
        if (result.code == 200) {
            commit("GETCATEGORYLIST", result.data);
        }
    },
    //获取首页轮播图数据
    async getBannerList({commit}) {
        console.log('获取服务器');
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data);
        }
    },

    async getFloorList({commit}) {
        let result = await reqGetFloorList();
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data);
        }
    },
};
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更方便
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
