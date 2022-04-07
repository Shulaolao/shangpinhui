<template>
  <div>
    <!-- <h1 v-upper="msg"></h1> -->
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home、Search显示的，在登录Login、注册Register隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "",
  data() {
    return {
      // msg: 'abc',
    }
  },
  components: {
    Header,
    Footer,
  },
  //只执行一次,将第一次执行TypeNav时从服务器接口获取的 categoryList 数据保存在 store 中。
  mounted() {
    //派发一个action||获取商品分类的三级列表数据
    //不能放在 main.js文件中，因为 main.js 不是组件，this 指向是 undefined，没有意义。
    this.$store.dispatch('getCategoryList');
  }
};
</script>

<style scoped>
</style>
