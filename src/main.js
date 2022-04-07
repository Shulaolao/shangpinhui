import Vue from 'vue'
import App from './App.vue'
//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav';
//引入路由
import router from '@/router';
//引入轮播图全局组件
import Carousel from '@/components/Carousel';
//引入分页器全局组件
import Pagination from '@/components/Pagination';
//测试
import store from '@/store';
// import {reqGetCategoryList} from '@/api';
import '@/mock/mockServe';
//引入swiper样式
import "swiper/css/swiper.css";
//统一接收api文件里面的全部函数
//统一引入
import * as API from '@/api';
//只引入button MessageBox组件
import {Button, MessageBox} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入插件和图片
import VueLazyload from 'vue-lazyload';
import atm from '@/assets/1.gif';
//引入表单校验插件
import '@/plugins/validate';

Vue.config.productionTip = false
//第一个参数：全局组件名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
//第一种注册全局组件的写法
Vue.component(Button.name,Button);
//ElementUI注册组件，还有一种写法，挂载在原型上
Vue.prototype.$msgbox =  MessageBox;
Vue.prototype.$alert =  MessageBox.alert;

// import {reqGetSearchInfo} from '@/api';
// console.log(reqGetSearchInfo({}));
//调用api/index.js中的reqGetCategoryList()函数获取三级联动数据
// reqGetCategoryList();
//使用图片懒加载
Vue.use(VueLazyload, {
  //懒加载默认图
  loading: atm,
});
//引入自定义插件
// import myPlugins from '@/plugins/myplugins';
// Vue.use(myPlugins, {
//   name: "upper"
// });1
new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate() {
    //挂载 $bus 后组件才能访问
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由
  //注册路由信息:这里的router组件身上有$route $router属性
  router,
  //注册仓库：组件实例身上会多一个属性$store属性
  store
}).$mount('#app')
