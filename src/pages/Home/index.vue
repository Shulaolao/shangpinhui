<template>
  <div>
    <!-- 三级联动全局组件：三级组件已经注册为全局组件，因此不需要再引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
//引入其余组件
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';
import {mapState} from 'vuex';
export default {
  name:'',
  components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
  },
  //发请求经常在mounted 生命周期函数中进行
  //组件挂载完毕
  mounted() {
    //派发action,获取floor 组件的数据
    this.$store.dispatch('getFloorList');
  },
  //右侧需要的是一个函数，当使用这个计算属性时，右侧函数会立即执行一次
  //注入一个参数：state，其实即为大仓库中的数据
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>

</style>