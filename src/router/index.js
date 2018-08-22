import Vue from 'vue'
import Router from 'vue-router'
const IndexCom = () =>
    import ('@/pages/index/index');
const SearchCom = () =>
    import ('@/pages/index/search')
// user
const LoginCom = () =>
    import('@/pages/user/login');
const RegisterCom = () =>
    import ('@/pages/user/register');
const ForgetPwdCom = () =>
    import ('@/pages/user/forget-pwd');

const Project = () =>
    import ('@/pages/project/project')
const Crowdfunding = () =>
    import ('@/pages/crowdfunding/crowdfunding')
const Mine = () =>
    import ('@/pages/mine/mine')
const Purse = () =>
    import ('@/pages/mine/purse/purse')
const Information = () =>
    import ('@/pages/mine/information/information')
const Authentication = () =>
    import('@/pages/mine/information/authentication')
const AuthImg = () =>
    import('@/pages/mine/information/authImg')
const HeaderUrl = () =>
    import('@/pages/mine/information/headerUrl')
const Revenue = () =>
    import ('@/pages/mine/revenue/revenue')
const Invite = () =>
    import ('@/pages/mine/invite/invite')

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: {
                name: 'index'
            },
        },
        {
            path: '/index',
            name: 'index',
            meta: { showFooter: true, keepAlive: true }, // 显示footer
            component: IndexCom
        },
        {
            path: '/search',
            name: 'search',
            component: SearchCom
        },
        {
            path: '/login',
            name: 'login',
            component: LoginCom,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterCom,
        },
        {
            path: '/forget',
            name: 'forget',
            component: ForgetPwdCom,
        },
        {
            path: '/project',
            name: 'project',
            meta: { showFooter: true }, // 显示footer
            component: Project
        },
        {
            path: '/crowdfunding',
            name: 'crowdfunding',
            meta: { showFooter: true }, // 显示footer
            component: Crowdfunding
        },
        {
            path: '/mine',
            name: 'mine',
            meta: { showFooter: true }, // 显示footer
            component: Mine,

        },
        {
            path: '/information',
            name: 'information',
            component: Information
        },
        {
            path: '/authentication',
            name: 'authentication',
            component: Authentication
        },
        {
            path: '/authImg',
            name: 'authImg',
            component: AuthImg
        },
        {
            path: '/headerUrl',
            name: 'headerUrl',
            component: HeaderUrl
        },
        {
            path: '/purse',
            name: 'purse',
            component: Purse
        },
        {
            path: '/revenue',
            name: 'revenue',
            component: Revenue
        },
        {
            path: '/invite',
            name: 'invite',
            component: Invite
        },
        { path: '*', redirect: '/' }
    ]
})