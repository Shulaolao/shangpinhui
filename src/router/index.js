//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
//使用插件
Vue.use(VueRouter);

//引入store
import store from '@/store';

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//编程式导航，重写push|replace；注意：声明式导航没有这个问题
//第一个参数：告诉原来的push方法，往哪里跳转（传参）
//第二个参数：成功的回调resolve
//第三个参数：失败的回调reject
//call||apply区别
//相同点:都可以调用函数一次，都可以篡改函数上下文一次
//不同点:call与apply传递参数：call传参用逗号隔开，apply用方法执行，传数组。
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

//配置路由
let router = new VueRouter({
    //配置路由
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { y: 0 };
    }
});

//路由全局组件
router.beforeEach(async (to, from, next) => {
    //to:可以获取到你要跳转到那个路由信息
    //from:可以获取到你从哪个路由而来的信息
    //next:放行函数 next()放行 next(path)放行到指令路由
    //为了测试先全都放行
    // next();
    //用户已经登录才会有 token，未登录一定没有 token
    let token = store.state.user.token;
    //用户信息
    let name = store.state.user.userInfo.name;
    //用户已经登录
    if (token) {
        if (to.path == '/login') {
            next('/home')
        } else {
            //登录了，但是不是去 login【home|search|detail】
            //若用户名已有
            if (name) {
                next();
            } else {
                try {
                    //没有用户信息，派发 actions 让仓库存储用户信息跳转
                    await store.dispatch('getUserInfo');
                    //放行
                    next();
                } catch (error) {
                    //token 失效了
                    //清除 token 
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        //未登录不能去交易相关、支付相关、个人中心
        //未登录去的是上面的路由
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //把未登录的时候想去而没有去成的信息，存包处于地址栏中【路由】
            next('/login?redirect='+toPath);
        }else {
            //去的是不是上面的路由(home|search|shopCart)--放行
            next();
        }
    }
})

export default router;
