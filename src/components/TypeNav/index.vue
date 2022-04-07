<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //刷新页面时不让 bg高亮
      currentIndex: -1,
      show: true,
    };
  },
  //发请求经常在mounted 生命周期函数中进行
  //组件挂载完毕
  mounted() {
    //this 表该组件
    //当组件挂载完毕，修改show 为false
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  //计算属性
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性时，右侧函数会立即执行一次
      //注入一个参数：state，其实即为大仓库中的数据
      categoryList: state => state.home.categoryList,
    }),
  },
  methods: {
    //一级联动背景颜色
    //鼠标进入修改响应式数据currentIndex属性
    //throttle回调函数别用箭头函数，可能出现上下文this的问题
    changeIndex: throttle(function (index) {
      //index：鼠标到达某一个一级元素的索引值
      //正常情况下鼠标慢慢依次进入，每个一级元素触发鼠标触发事件
      //但在用户操作过快时（非正常情况下），只有一些元素的鼠标进入事件被触发
      //这是由于操作过快，导致浏览器反应不过来，若回调函数中有一些大量的业务，有可能出现卡顿现象
      this.currentIndex = index;
    }, 60),
    //进行路由跳转的方法
    goSearch(event) {
      //最好的解决方法：编程式导航 + 事件委派
      //存在两个问题：1.进行跳转前，咋样确定点击的是 a 标签
      //             2.如何区分是一级二级三级分类的标签
      //问题1：把子节点当中的 a 标签加上自定义属性 data-categoryName
      let element = event.target;
      //获取当前触发的、带有data-categoryname自定义属性的节点（a标签）
      //节点有一个dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //如果标签身上有categoryname一定是a标签
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一级、二级、三级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //判断：如果路由跳转时带有params参数，捎带传递过去（参数合并）
        if (this.$route.params) {
          location.params = this.$route.params;
          //动态给location
          location.query = query;
          //路由跳转
          this.$router.push(location);
        }
      }
    },
    leaveShow() {
      //移除currentIndex变为-1
      this.currentIndex = -1;
      // console.log(this.$route) 包含当前路由信息（路径、params、query）
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    enterShow() {
      this.show = true;
    },
  },
};
</script>
<style lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }

                  a:hover {
                    cursor: pointer;
                    background-color: red;
                    color: white;
                  }
                }
              }
            }
          }
          // 用js实现
            // &:hover {
            //   .item-list {
            //     display: block;
            //   }
            // }
        }

        //鼠标进入一级元素时的效果类
        .cur {
          background: rgba(0, 0, 0, 0.1);
        }
      }
    }

    //过渡动画样式
    //过渡动画开始状态（进入）
    .sort-enter,
    .sort-leave-to {
      // height: 0px;
      opacity: 0;
    }
    //过渡动画结束状态（进入）
    .sort-enter-to,
    .sort-leave {
      // height: 461px;
      opacity: 1;
    }
    //定义动画时间、速率
    .sort-enter-active,
    .sort-leave-active {
      transition: all linear 0.3s;
    }
  }
}
</style>