import Vue from 'vue';
import VeeValidate from 'vee-validate';
//引入中文的提示
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Vue.use(VeeValidate);

VeeValidate.Validator.localize("zh_CN", {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}与密码不一致` //修改内置规则的 message，让确认密码和密码相同        
    },
    attributes: {
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        agree: '协议',
    }
})

//自定义校验
VeeValidate.Validator.extend('agree',{
    validate: value => {
        return value
    },
    messages: {
        getMessage: (field) => `${field}必须同意`
    }  
});