import Vue from 'vue'
import Vuex from 'vuex'
import Cache from '../utils/cache';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		id: Cache.getSession('bier_userid'),
		username: Cache.getSession('bier_username'),
		usernickname: Cache.getSession('bier_usernickname'),
        token: Cache.getSession('bier_token'),
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
		inviteCode: '',
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
	},
});