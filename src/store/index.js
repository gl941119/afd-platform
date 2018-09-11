import Vue from 'vue';
import Vuex from 'vuex';
import Cache from '../utils/cache';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        id: Cache.getSession('bier_userid') || Cache.getCookie('login_identify'),
        username: Cache.getSession('bier_username'),
        usernickname: Cache.getSession('bier_usernickname'),
        token: Cache.getSession('bier_token') || Cache.getCookie('login_token'),
        incomeId: '', // 收益账户根据id请求流水
        dialogVisible: false, // share component visible
        conceptId: 0, // advert concept id
        instantBuyVisible: false, // buy dialog visible
        dialogModalVisible: false, // login dialog
        instantBuyDataId: undefined,
        change: false,
        bullsData: undefined,
        globalShow: Cache.getSession('globalShow') || 'show', // global share
        slangChange: Cache.getLocal('bier_langChange') || 'zh',
        heardUrl: Cache.getSession('bier_heardUrl'),
        registerVisible: false,
        inviteCode: Cache.getSession('bier_inviteCode') || Cache.getCookie('bier_inviteCode'),
        registerCode: Cache.getSession('bier_register_code'),
        // mobile add
        showFooter: Cache.getSession('show_footer') || '1', // 是否显示底部导航 string-> '1'-> show '0'-> hide
        authName: '',
        authIdType: '',
        authIdNum: '',
        authCountry: '',
        tradeAdId: Cache.getSession('trade_group'),
        tradeSuc: Cache.getSession('trade_suc'),
    },
    mutations: {
        setUserId(state, val) {
            state.id = val;
        },
        setUserName(state, val) {
            state.username = val;
        },
        setUserNickName(state, val) {
            state.usernickname = val;
        },
        setToken(state, val) {
            state.token = val;
        },
        setIncomeId(state, val) {
            state.incomeId = val;
        },
        setDialogVisible(state, val) {
            state.dialogVisible = val;
        },
        setConceptId(state, val) {
            state.conceptId = val;
        },
        setInstantBuyVisible(state, val) {
            state.instantBuyVisible = val;
        },
        setDialogModalVisible(state, val) {
            state.dialogModalVisible = val;
        },
        setRegisterVisible(state, val) {
            state.registerVisible = val;
        },
        saveInstantBuyDataId(state, id) {
            state.instantBuyDataId = id;
        },
        valueChange(state) {
            state.change = !state.change;
        },
        setBullsData(state, val) {
            state.bullsData = val;
        },
        setGlobalShow(state, val) {
            state.globalShow = val;
        },
        setHeardUrl(state, val) {
            state.heardUrl = val;
        },
        setLanguage(state, val) {
            state.slangChange = val;
        },
        setInviteCode(state, val) {
            state.inviteCode = val;
        },
        setRegisterCode(state, val) {
            state.registerCode = val;
        },
        // mobile add
        setShowFooter(state, val) {
            state.showFooter = val;
        },
        setTradeAdId(state, group) {
            state.tradeAdId = group;
        },
        setTradeSuc(state, val) {
            state.tradeSuc = val;
        },
        // auth
        setAuthName(state, val) {
            state.authName = val;
        },
        setAuthIdType(state, val) {
            state.authIdType = val;
        },
        setAuthIdNum(state, val) {
            state.authIdNum = val;
        },
        setAuthCountry(state, val) {
            state.authCountry = val;
        },
    },
});
