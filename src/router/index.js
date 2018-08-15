import Vue from 'vue'
import Router from 'vue-router'
const IndexCom = () =>
    import ('@/pages/index/index');
// user
const LoginCom = () =>
    import ('@/pages/user/login');

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
            component: IndexCom
        },
        {
            path: '/login',
            name: 'login',
            component: LoginCom,
        },
        {
            path: '/project',
            name: 'project',
            component: Project
        },
        {
            path: '/crowdfunding',
            name: 'crowdfunding',
            component: Crowdfunding
        },
        {
            path: '/mine',
            name: 'mine',
            component: Mine,

        },
        {
            path: '/information',
            name: 'information',
            component: Information
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