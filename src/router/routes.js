//引入路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart';
// import Trade from '@/pages/Trade';
// import Pay from '@/pages/Pay';
// import PaySuccess from '@/pages/PaySuccess';
// import Center from '@/pages/Center';
// //引入二级路由
// import MyOrder from '@/pages/Center/myOrder';
// import GroupOrder from '@/pages/Center/groupOrder';

// 路由懒加载：用 import 定义代码块点
// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，
// 然后当路由被访问的时候才加载对应组件，这样就更加高效了。

export default [
    {
        path: "/home",
        component: ()=>import('@/pages/Home'),
        meta: {
            show: true
        }
    },
    {
        //（面试题）path字符串后面加个问号表可传可不传keyword
        path: "/search/:keyword?",
        component: ()=>import('@/pages/Search'),
        meta: {
            show: true
        },
        name: "search",
        //（面）路由组件能不能传递prop数据？可以，有三种写法
        //1、布尔值写法：params
        //props:true,
        //2、对象写法：额外给路由组件传递一些props
        //props：{a:1.b:2},
        //3、函数写法：可以params参数、query参数，通过props传递给路由组件
        // props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})
    },
    {
        path: "/login",
        component: ()=>import('@/pages/Login'),
        meta: {
            show: false
        }
    },
    {
        path: "/register",
        component: ()=>import('@/pages/Register'),
        meta: {
            show: false
        }
    },
    //重定向，在项目跑起来时，访问立马让他定向到首页
    {
        path: '*',
        redirect: "/home"
    },
    {
        path: '/detail/:skuid',
        component: ()=>import('@/pages/Detail'),
        meta: { isShow: true },
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta: {isShow: true},
    },
    {
        path: '/shopcart',
        component: ()=>import('@/pages/ShopCart'),
        meta: {isShow: true},
    },
    {
        path: '/trade',
        component: ()=>import('@/pages/Trade'),
        meta: {isShow: true},
        //去交易页面必须从购物车页面来，其他组件来或手动输入本 url 地址会中断
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next();
            }else {
                next(false);
            }
        }
    },
    {
        path: "/pay",
        component: ()=>import('@/pages/Pay'),
        meta: {
            isshow: true
        },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next();
            }else {
                next(false);
            }
        }
    },
    {
        path: "/paysuccess",
        component: ()=>import('@/pages/PaySuccess'),
        meta: {
            isshow: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/pay') {
                next();
            }else {
                next(false);
            }
        }
    },
    {
        path: "/center",
        component: ()=>import('@/pages/Center'),
        meta: { isshow: true },
        //二级路由组件
        children: [
            {
                path: "myorder",
                component: ()=>import('@/pages/Center/myOrder'),
            },
            {
                path: "grouporder",
                component: ()=>import('@/pages/Center/groupOrder'),
            },
            {
                //进入Center 默认到 MyOrder 组件
                path: "",
                component: ()=>import('@/pages/Center/myOrder'),
            },
        ]
    },
]