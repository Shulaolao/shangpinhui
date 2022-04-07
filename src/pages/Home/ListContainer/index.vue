<template>
  <!--列表-->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <Carousel :list="bannerList"/>
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引包
// import Swiper from "swiper"; 
export default {
  name: "",
  //mounted表组件挂载完毕，组件结构DOM 已经有了
  mounted() {
    console.log("我是mounted");
    //swiper实例不能在mouted 中直接书写，因为bannerList结构还没有完整
    this.$store.dispatch("getBannerList");
    console.log("初始化swiper");
  },
  // Update() {
  //   //在new Swiper实例之前，页面结构中
  //   var mySwiper = new Swiper(document.querySelector(".swiper-container"),{
  //     loop:true,
  //     // 如果需要分页器 
  //     pagination: {
  //       el:".swiper-pagination",
  //     },
  //     // 如果需要前进后退按钮
  //     navigation: {
  //       nextEl:".swiper-button-next", prevEl:".swiper-button-prev",
  //     },
  //   });
  // },
  //右侧需要的是一个函数，当使用这个计算属性时，右侧函数会立即执行一次
  //注入一个参数：state，其实即为大仓库中的数据
  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList,
    }),
  },
  //将监听bannerList 数据变化的watch 放到全局的 Carousel 中
  // watch: {
  //   //监听bannerList数据的变化，由空数据变为有四个数据的数组
  //   bannerList: {
  //     handler(newValue, oldValue) {
  //       //现在咱们通过watch监听bannerList属性的属性值的变化
  //       //如果执行handler方法，代表组件实例身上这个属性的属性以已经有了【数组:四个元素】
  //       //当前这个限数执行:只能保证bannerList数据已经有了，但是你没办法保证v-for已经执行结束了【】
  //       //v-for执行完毕，才有结构，但是没办法确定v-for是否已经遍历完毕
  //       //nextTick：在下次 DOM更新 循环结束之后 执行延迟回调。在 数据修改之后 立即使用这个方法，获取更新后的 DOM。
  //       this.$nextTick(() => {
  //         //在new Swiper实例之前，页面结构中
  //         let mySwiper = new Swiper(
  //           this.$refs.mySwiper,
  //           {
  //             loop: true,
  //             // 如果需要分页器
  //             pagination: {
  //               el: ".swiper-pagination",
  //               //在Swiper 实例中设置小圆点能否点击
  //               clickable: true,
  //             },
  //             // 如果需要前进后退按钮
  //             navigation: {
  //               nextEl: ".swiper-button-next",
  //               prevEl: ".swiper-button-prev",
  //             },
  //           }
  //         );
  //       });
  //     },
  //   },
  // },
};
</script>

<style lang="less">
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(~@/assets/images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>