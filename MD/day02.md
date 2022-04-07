1、编程式路由跳转到当前路由(参数不变)，多次执行会抛出NavigationDuplicated的警告错误? 
--路由跳转有两种形式:声明式导航、编程式导航
--声明式导航没有这类问题的，因为vue-router底层已经处理好了
1.1为什么编程式导航进行路由跳转的时候，就有这种警告错误那?
"vue-router":"^3.5.3":最新的vue-router引入promise
1.2通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前错误，可以解决。
1.3通过底部的代码，可以实现解决错误
this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}},()=>{},()=>{});
这种写法:治标不治本，将来在别的组件当中pushlreplace，编程式导航还是有类似错误。

1.4
this:当前组件实例(search)
this.$router属性:当前的这个属性，属性值vueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例添加$routerl$route属性 
push:VueRouter类的一个实例
    function VueRouter(){} //VueRouter类
    VueRouter.prootype.push = function() { //push为VueRouter原型对象的一个方法
        //函数上下文为VueRouter类的一个实例
    }
    let $router = new VueRouter();  //$router为VueRouter的一个实例
    $router.push(xxx);
    this.$router.push();

2、Home模块组件拆分
--先把静态页面完成
--拆分出静态组件
--获取服务器的数据进行展示
--动态业务

3、三级联动组件完成
---由于三级联动在Home、Search、Detail，把三级联动组测为全局组件。
好处：只需要注册一次，就可以在项目中任意地方使用

4、完成静态组件
HTML + CSS + 图片资源

5、POSTMAN测试接口
--用postman工具测试接口
--如果服务器返回的数据code字段200，代表服务器返回数据没成功
--整个项目接口前缀有/api字样

6:axios二次封装
XMLHttpRequest、fetch、JQ、axios
6.1为什么需要进行二次封装axios?
请求拦截器、响应拦截器:请求拦截器，可以在发请求之前可以处理一些业务、响应拦截器，当服务器数据返回以后，可以处理一些事情
6.2在项目当中经常API文件夹【axios】
6:axios二次封装
XMLHttpRequest、fetch、JQ、axios
6.1为什么需要进行二次封装axios?
请求拦截器、响应拦截器:请求拦截器，可以在发请求之前可以处理一些业务、响应拦截器，当服务器数据返回以后，可以处理一些事情
6.2在项目当中经常API文件夹【axios】

6.3 可以参考 git|NPM 关于 axios 文档
axios中文文档
https://www.axios-http.cn/docs/intro


7、接口统一管理
项目很小：完全可以在组件生命周期函数中发请求
项目大：axios.get('xxx')

7.1 跨域问题
http://localhost:8000/#/home --- 前端项目本地服务器
http://39.98.123.211 --- 后台服务器

JSONP、CROS、代理

8、nprogress进度条使用
start：进度条开始
done：进度条结束
进度条颜色可以修改，到nprogress.css的 bar里面修改

9、vuex状态管理库
9.1vuex是官方提供的一个插件，状态管理库，集中式管理项目中组件共用的数据
注意，并不是全部项目都需要Vuex，项目很小，完全不需要；项目很大，组件多，数据多，数据维护费劲，Vuex
state mutations actions getters modules

9.2 vuex基本使用
<!-- store/index.js -->
import Vuex from 'vuex';
<!-- 需要使用插件一次 -->
Vue.use(Vuex);
<!-- state:仓库存储数据的地方 -->
 const state = {};
<!-- mutations：修改state的唯一手段 -->
 const mutations = {};
<!-- actions：处理action，可以书写自己的业务逻辑，也可以处理异步 -->
 const actions = {};
<!-- getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更方便 -->
 const getters = {};
import home from './home';
import search from './search';
<!-- 对外暴露Store类的一个实例 -->
export default new Vuex.Store({
    <!-- state,
    mutations,
    actions,
    getters -->
    modules: {
        home,
        search
    }
});

9.3 vuex实现模块式开发
如果项目过大，组件过多，接口也很多，数据也多，可以让vuex实现模块式开发
模拟state存储数据
<!-- 对外暴露一个Store实例 -->
export default new Vuex.Store{
    modules:{
        home:{},
        search:{}
    }
}
