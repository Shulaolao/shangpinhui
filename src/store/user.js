import { reqGetCode, reqUserRegister,reqUserLogin, reqUserInfo, reqLogout} from "@/api";
import {setToken, getToken, removeToken} from '@/utils/token'; 
//登录注册模块
const state = {
    code: '',
    token: getToken('TOKEN'),
    userInfo: {},
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state) {
        //仓库中的 token 清空
        state.token = '';
        state.userInfo = {};
        //本地存储中的 token 清空
        removeToken();
    },
};
const actions = {
    //获取验证码
    async getCode({commit}, phone) {
        //获取验证码接口，把验证码返回，但是正常情况下，后台把验证码发到用户手机上
        let result = await reqGetCode(phone);
        if(result.code == 200) {
            commit('GETCODE', result.data);
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'));
        }
    },
    //用户注册
    async userRegister({commit}, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok'
        }else {
            return Promise.reject(new Error("faile"));
        }
    },
    //登陆业务
    async userLogin({commit}, data) {
        let result = await reqUserLogin(data);
        //服务器下发token 唯一标识符，类似于uuid
        if (result.code == 200) {
            //用户已经登录成功且获取到 token
            commit('USERLOGIN', result.data.token);
            //持久化存储
            setToken(result.data.token);
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'));
        }
    },
    //主页登陆时获取用户信息
    async getUserInfo({commit}) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit('GETUSERINFO', result.data);
            return 'ok';
        }else {
            return Promise.reject(new Error('faile'));
        }
    },
    //退出登录
    async userLogout({commit}) {
        let result = await reqLogout();
        if (result.code == 200) {
            commit("CLEAR");
            return 'ok'
        }else {
            return Promise.reject(new Error("faile"));
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}