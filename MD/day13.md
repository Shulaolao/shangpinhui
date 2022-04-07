1)个人中心完成
面试的时候:是否封装过组件、分页器、日历个人中心当中:分页器

2)全局守卫
未登录访问，交易相关(trade)、支付相关(pay、paysuccess)、用户中心(center)相关跳转到登录页面

3)路由独享守卫
只有从购物车界面才能跳转到交易页面(创建订单)
只有从交易页面(创建订单)页面才能跳转到支付页面
只有从支付页面才能跳转到支付成功页面

4)图片懒加载
https://www.npmjs.com/package/vue-lazyload

5)vee-validate 基本使用
第一步:插件安装与引入
cnpm i vee-validate@2--save 安装的插件安装2版本的
import VeeValidate from 'vee-validate
import zh_CN from 'vee-validate/dist/locale/zh_CN 
Vue.use(VeeValidate)
第二步:提示信息
VeeValidate.Validator.localize("zh_CN',{
    messages: {
        ...zh_CN.messages,
        is:(feild) => `${feild}必须与密码相同` /修改内置规则的 message，让确认密码和密码相同        
    },
    attributes: {
        phone: '手机号',
        code: '',
        password: '',
        password1: '',
        isChecked: '',
    }
})

第三步：基本使用
<input
    placeholder="请输入你的手机号"
    v-model="phone"
    name="phone"
    v-validate="{ required: true, regex: /^1\d{10}$/ }"
    :class="{ invalid: errors.has('phone') }"
/>
<span class="error-msg">{{errors.first('phone')}}</span>
const success = await this.\$validator.validateAll(); //全部表单验证

Veevalidate.Validator.extend('agree',{
    validate: value => {
        retun value
    },
    getMessage: field => field + '必须同意'
    }
})


6)路由懒加载

7)打包上线
7.1打包 npm run build

项目打包后，代码都素经过压缩加密的，如果运行时报错，无法准确得知是哪里的代码报错
有了map 就可以像未加密代码一样，准确输出哪行报错
所以该文件如果项目不需要是可以去掉的
vue.config.js 配置:
productionSourceMap:false

7.2 够买服务器
1 阿里云  腾讯云
2设置安全组，让服务器端口打开
3利用xshell 工具登录服务器
linux常用指令： 
/ 根目录   cd 跳转   ls 查看目录   mkdir 创建目录  pwd 查看你绝对路径

nginx配置:
1:xshell进入根目录/etc
2:进入etc目录，这个目录下有一个nginx目录，进入到这个目录【已经安装过nginx:如果没有安装过，四五个文件】
3:如果想安装nginx:yum install nginx
4:安装完nginx服务器以后，你会发现在nginx目录下，多了一个nginx.conf文件，在这个文件中进行配置
5:vimnginx.conf进行编辑，主要添加如下两项解决第一个问题: 
location/{
root/root/jch/www/shangpinhui/dist; 
    index  index.html;
try files  $uri $uri/ /index.html;
//解决第二个问题 
location /api {
proxy_pass http://39.98.123.211;

6:nginx服务器跑起来 service nginx start