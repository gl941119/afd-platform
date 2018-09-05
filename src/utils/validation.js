import Vue from 'vue';
import VeeValidate, {
    Validator,
} from 'vee-validate';
import zh from 'vee-validate/dist/locale/zh_CN';
/** 自定义验证信息 */
const dictionary = {
    zh: {
        messages: {
            email: () => '请输入正确的邮箱格式',
            required: (field) => field + '是必填的',
        },
        attributes: {
            email: '邮箱',
            password: '密码',
            passwordAgain: '确认密码',
            verifyCode: '验证码',
            phone: '手机号码',
            tradePassword: '交易密码',
            money: '提现金额',
        },
    },
};

Validator.localize({ zh });

/** 配置验证器 */
const VeeConfig = {
    errorBagName: 'errors', // change if property conflicts.
    fieldsBagName: 'fieldBags',
    delay: 0,
    messages: null,
    locale: 'zh',
    dictionary,
    strict: true,
};

Validator.extend('phone', {
    getMessage: field => field + '必须是11位手机号码',
    validate: value => {
        return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value);
    },
});

Vue.use(VeeValidate, VeeConfig);
