<template>
  <div class="swiper-container" id="floorSwiper" ref="cur">
    <div class="swiper-wrapper">
      <!-- 轮播图 -->
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      //立即监听不管数据有没有变化，一上来就监听一次
      //watch监听不大list：因为这个数据从来没有发生变化
      //（数据是父亲给的，父亲给的时候就是一个对象，对象里面有的数据都是有的）
      immediate: true,
      handler() {
        //只能监听到数据已经有了，但是v-for动态渲染结构还没办法确定，因此还是需要nextTick
        this.$nextTick(() => {
          //在new Swiper实例之前，页面结构中
          let mySwiper = new Swiper(this.$refs.cur, {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //在Swiper 实例中设置小圆点能否点击
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>