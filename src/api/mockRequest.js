//对于axios进行二次封装
//在终端用 cnpm install --save axios 命令下载 axios
import axios from "axios";
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";
//start：进度条开始  done：进度条结束
//1:利用axios对象的方法create，去创建一个axios实例
//2:request就是axios，只不过稍微配置一下 
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现api 
    baseURL:"/mock",
    //代表请求超时的时间5S 
    timeout:5000,
});
//请求拦截器:在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情 
requests.interceptors.request.use((config)=>{
    //config:配置对象，对象里面有一个属性很重要，headers请求头 
    nprogress.start();
    return config;
});
//相应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数:服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情 
    //进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
    //响应失败的回调函数
    return Promise.reject(new Error('faile'));
});
//（1）这里用export default requests 表示该模板输出上述requests对象，
//当 api/index.js 当中调用该方法时，会在请求地址前面自动加上 /api 基础地址，
//不会调用requests方法自动的,也就不会引入加载进度条的效果
//（2）若改成export default axios 则直接放返回 axios 请求，
//需要手动在api/index.js请求地址前加上 /api基础地址
export default requests;