import Vue from 'vue';
import Router from 'vue-router';
const IndexCom = () =>
    import('@/pages/index/index');
const SearchCom = () =>
    import('@/pages/index/search');
// user
const LoginCom = () =>
    import('@/pages/user/login');
const PwdLogin = () =>
    import('@/pages/user/pwd');
const RegisterCom = () =>
    import('@/pages/user/register');
const ForgetPwdCom = () =>
    import('@/pages/user/forget-pwd');

const Project = () =>
    import('@/pages/project/project');
const Crowdfunding = () =>
    import('@/pages/crowdfunding/crowdfunding');

// freshman
const Freshman = () =>
    import('@/pages/freshman/freshman');

// mine
const Mine = () =>
    import('@/pages/mine/mine');
// Transaction
const Transaction = () =>
    import('@/pages/mine/transaction/records');
const Flow = () =>
    import('@/pages/mine/transaction/records/flow');
const Withdraw = () =>
    import('@/pages/mine/transaction/records/withdraw');
// Information
const Information = () =>
    import('@/pages/mine/information/information');
const HeaderUrl = () =>
    import('@/pages/mine/information/headerUrl');
// mine-owner
const Revenue = () =>
    import('@/pages/mine/mine-owner/revenue');
const RecordsOne = () =>
    import('@/pages/mine/mine-owner/children/records-invite');
const Records = () =>
    import('@/pages/mine/mine-owner/children/records-free');
// Mining
const Mining = () =>
    import('@/pages/mine/mining/mining');
const Exchange = () =>
    import('@/pages/mine/exchange/exchange');

// Account-safe
const Account = () =>
    import('@/pages/mine/account-safe/account');
const WalletAddress = () =>
    import('@/pages/mine/account-safe/children/wallet-address');
const SetTrade = () =>
    import('@/pages/mine/account-safe/children/set-trade');
const ChangePassword = () =>
    import('@/pages/mine/account-safe/children/change-password');
const ForgetTrade = () =>
    import('@/pages/mine/account-safe/children/forgetTrade');
const Bind = () =>
    import('@/pages/mine/account-safe/children/bind');
const ChangeBind = () =>
    import('@/pages/mine/account-safe/children/change-bind');
const Authentication = () =>
    import('@/pages/mine/account-safe/children/authentication');
const AuthImg = () =>
    import('@/pages/mine/account-safe/children/authImg');

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: {
                name: 'index',
            },
        },
        {
            path: '/index',
            name: 'index',
            meta: { showFooter: true, keepAlive: true }, // 显示footer
            component: IndexCom,
        },
        {
            path: '/search',
            name: 'search',
            component: SearchCom,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginCom,
        },
        {
            path: '/pwd',
            name: 'pwd',
            component: PwdLogin,
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
            path: '/freshman',
            name: 'freshman',
            component: Freshman,
        },
        {
            path: '/project',
            name: 'project',
            meta: { showFooter: true }, // 显示footer
            component: Project,
        },
        {
            path: '/crowdfunding',
            name: 'crowdfunding',
            meta: { showFooter: true }, // 显示footer
            component: Crowdfunding,
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
            component: Information,
        },
        {
            path: '/authentication',
            name: 'authentication',
            component: Authentication,
        },
        {
            path: '/authImg',
            name: 'authImg',
            component: AuthImg,
        },
        {
            path: '/headerUrl',
            name: 'headerUrl',
            component: HeaderUrl,
        },
        {
            path: '/transaction',
            name: 'transaction',
            component: Transaction,
            redirect: { name: 'flow' },
            children: [
                {
                    path: 'flow',
                    name: 'flow',
                    component: Flow,
                },
                {
                    path: 'withdraw',
                    name: 'withdraw',
                    component: Withdraw,
                },
            ],
        },
        {
            path: '/revenue',
            name: 'revenue',
            component: Revenue,
            redirect: { name: 'recordsOne' },
            children: [
                {
                    path: 'recordsOne',
                    name: 'recordsOne',
                    component: RecordsOne,
                },
                {
                    path: 'records',
                    name: 'records',
                    component: Records,
                },
            ],
        },
        {
            path: '/mining',
            name: 'mining',
            component: Mining,
        },
        {//个人中心，兑换
            path: '/exchange',
            name: 'exchange',
            component: Exchange,
        },
        {
            path: '/account',
            name: 'account',
            component: Account,
        },
        {
            path: '/walletAddress',
            name: 'walletAddress',
            component: WalletAddress,
        },
        {
            path: '/setTrade',
            name: 'setTrade',
            component: SetTrade,
        },
        {
            path: '/changePassword/:value',
            name: 'changePassword',
            component: ChangePassword,
        },
        {
            path: '/forgetTrade',
            name: 'forgetTrade',
            component: ForgetTrade,
        },
        {
            path: '/bind/:value',
            name: 'bind',
            component: Bind,
        },
        {
            path: '/changeBind/:value',
            name: 'changeBind',
            component: ChangeBind,
        },
        { path: '*', redirect: '/' },
    ],
});
