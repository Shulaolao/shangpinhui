1、vue-cli脚手架初始化项目。
node + webpack + 淘宝镜像

node_modules文件夹：项目依赖文件

public文件夹：一般放置一些静态资源文件图片，
注意，放在public文件夹中的静态资源，webpack进行打包时会原封不动放置到第三天文件夹中。

src文件夹（程序员代码文件夹）:
    assets文件夹：一般也是放置静态资源（多个组件公用的静态资源）
    注意，放置在assets文件夹的惊天资源，在webpack打包时会把静态资源当作一个模板，打包js文件里面。
    components文件夹：一般放置的是非路由组件（全局组件）
    

    App.vue：根组件
    main.js:程序入口文件，也是整个程序当中最先执行的文件

babel.config.js:配置文件（babel相关）
package.json文件：认为项目‘身份证’，记录项目叫什么、项目当中有那些依赖、项目桌面运行
package-lock.json:缓存性文件
README.md:说明性文件

2、项目的其它配置
2.1项目运行起来时让浏览器自动打开
"scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },

2.2 eslint校验功能关闭
--在根目录下，创建一个vue.config.js
比如：声明变量但是没有使用，eslint校验根据报错

2.3src文件夹简写发你发，配置别名。
jsconfig.json配置别名 @提示【@表示src文件夹，文件过多，找的时候方便】
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
           "@/*": ["src/*"]
        }
    },
    "exclude": ["node_modules","dist"]
}

3.项目路由的分析
前端路由：KV键值相对
key: URL（地址栏中的路径）
value: 相应的路由组件
注意：项目上中下结构

路由组件：
Home首页路由组件、Search路由组件、Login登录路由
非路由组件：
Header（首页、搜索页）
Footer（首页、搜索页），但是在登录|注册页面是没有


4、完成非路由组件Header与Footer业务
(1)书写静态页面 HTML+CSS
(2)拆分组件
(3)获取服务器的数据动态展示
(4)完成相应的动态业务逻辑

注意：1 创建组件时，组件结构 + 组件样式 + 图片资源
     2 项目采用less样式，浏览器不识别less样式，需要通过less、less_loader[安装5版本]进行处理
     3 让组件始别less样式，需要在style标签加上lang=less

5、路由组件搭建
四个路由组件：Home、Search、Login、Register
-components文件夹：经常放置的非路由组件（共用全局组件）
-pages|views文件夹：经常放置路由组件
5.1配置路由
项目当中配置路由一般放置在router文件夹中
5.2总结
路由组件与非路由组件区别：
（1）路由组件一般放置在pages|view文件夹，非路由组件一般放置components文件夹中
（2）路由组件一般需要在router文件夹中进行注册（使用的是组件的名字），非路由组件在使用时，以标签形式 
（3）注册完路由，不管路由组件、还是非路由组件身上都有$route、$router属性
$route：一般获取路由信息【路径、query、params等】
$router：一般进行编程式导航进行路由跳转【push|replace】
5.3路由的跳转
路由跳转分为两种形式：
声明式导航router-link
编程式导航push|replace（除了可以进行路由跳转外，还可以做一些业务逻辑）

6、Footer组件显示与隐藏
显示或者隐藏组件：v-if|v-show
Footer组件：在Home、Search显示Footer组件
Footer组件：在登录注册时隐藏
6.1可以在根据组件身上的$route获取当前路由的信息，通过路由路径判断Footer显示与隐藏。
6.2配置路由时，可以给路由添加元信息【meta】，路由需要配置对象，它的key泵瞎写乱写。

7、路由传参

7.路由跳转方式
 声明式导航：router-link，可以实现路由的跳转
  编程式导航：利用组件实例的$router.push|replace方法，可以实现路由跳转（方便书写自己的业务）
7.2路由传参、参数写法：
 params参数：属于路径中的一部分，在配置路由时需要占位
 query参数：不属于路径中的一部分，类似于ajax中的queryString /home?k=v&kv=,不需要占位

 9、路由传参相关面试题（面）
1:路由传递参数(对象写法)path是否可以结合params参数一起使用?
答:路由跳转传参的时候，对象的写法可以是name、path形式，但是需要注意的是，path这种写法不能与params参数一起使用。
this.$router.push({path:'/search',params: {keyword:this.keyword},query:{k:this.keyword.toUpperCase()

2:如何指定params参数可传可不传?
如果路由要求传递params参数，但是你就不传递params参数，发现一件事情，URL会有问题的
如何指定params参数可以传递、或者不传递，在配置路由的时候，在占位的后面加上一个问号【params可以传递或者
this.$router.push({
  name: "search",
  query: { k: this.keyword.toUpperCase() },
});

3:params参数可以传递也可以不传递，但是如果传递是空串，如何解决?
使用undefined解决:params参数可以传递、不传递(空的字符串)
this.$router.push({name: 'search',params:{keyword: '' || undefined},query:{k:this.keyword.toUppe

4:路由组件能不能传递props数据?
答:可以的,有三种写法:
（1）布尔值写法：params
props:true,
（2）对象写法：额外给路由组件传递一些props
props:{a:1,b:2},
（3）函数写法：可以params参数、query参数，通过props传递给路由组件
props: ($route) => ({
  keyword: $route.params.keyword,
  k: $route.query.k,
});
