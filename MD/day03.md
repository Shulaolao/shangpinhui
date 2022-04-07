10、完成TypeNav三级联动展示数据业务
看见项目外观想到项目模板
[
    {
        id: 1,
        name: '电子书'，
        child: [
            {id:2, name:'喜羊羊',child:[]},
        ]
    }
]


(3)演示卡顿现象
正常:事件触发非常频繁，而且每一次的触发，回调函数都要去执行(如果时间很短，
而回调函数内部有计算，那么很可能出现浏览器卡顿)

(4)函数的防抖与节流
节流:在规定的间隔时间范围内不会重复触发回调，
     只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
防抖:前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，
     也就是说如果连续快速的触发 只会执行一次

（5）完成三级联动的节流操作
    <!-- 引入lodash 工具库，包含 throttle节流函数、debounce防抖函数 -->
    import throttle from 'lodash/throttle';
    <!-- 将changeIndex函数定义为节流函数 --> -->
    changeIndex: throttle(function(index){
      <!-- //index：鼠标到达某一个一级元素的索引值
      //正常情况下鼠标慢慢依次进入，每个一级元素触发鼠标触发事件
      //但在用户操作过快时（非正常情况下），只有一些元素的鼠标进入事件被触发
      //这是由于操作过快，导致浏览器反应不过来，若回调函数中有一些大量的业务，有可能出现卡顿现象 -->
      this.currentIndex = index;
    },60),
    leaveIndex() {
      <!-- //移除currentIndex变为-1 -->
      this.currentIndex = -1;
    }

（6）三级联动组件的路由跳转和传递参数
三级联动用户可以点击：一级分裂、二级分类
Home模板跳转到Search模块，一级会把用户选中的产品（名字、ID）在路由跳转的时候进行传递。
路由跳转：
1.声明式导航：router-link
  <!-- 有多少个a标签就会生成多少个router-link标签，这个标签其实激就是 vue实例化组件，这样很耗内存，当我们频繁操作时会出现卡顿现象。   -->
2.编程式导航：push|replace
  <!-- 通过触发点击事件实现路由跳转。同理有多少个a标签就会有多少个触发函数。
  虽然不会出现卡顿，但是也会影响性能，因此可以选择 编程式导航 + 事件委派组合方法 -->

（7）完成三级联动的路由跳转与传递参数
this.$router.push({name:"search",query:{categoryName:'xxx',2id:'xx'}})

//进行路由跳转的方法：编程式导航 + 事件委派
    goSearch(event) {
      <!-- //最好的解决方法：编程式导航 + 事件委派 -->
      <!-- //存在两个问题：1.进行跳转前，咋样确定点击的是 a 标签
      //             2.如何区分是一级二级三级分类的标签 -->
      <!-- //问题1：把子节点当中的 a 标签加上自定义属性 data-categoryName -->
      let element = event.target;
      <!-- //获取当前触发的、带有data-categoryname自定义属性的节点（a标签）
      //节点有一个dataset属性，可以获取节点的自定义属性与属性值 -->
      let {categoryname, category1id, category2id, category3id} = element.dataset;
      <!-- //如果标签身上有categoryname一定是a标签 -->
      if (categoryname) {
        let location = {name:'search'};
        let query = {categoryNme: categoryname};
        <!-- //一级、二级、三级分类的a标签 -->
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        <!-- //整理完参数 -->
        location.query = query;
        <!-- //路由跳转 -->
        this.$router.push(location);
      }
    }