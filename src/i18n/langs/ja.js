﻿import enLocale from './enE'
const en = {
	header: {
		home: 'Home',
		daico:'DAICO',
		project: 'Project',
		medium:'媒体',
		sunday:'周日狂欢夜',
		bierTalk:'BierTalk',
		login:'LogIn',
		register:'Out',
		help:'帮助',
	},
	login:{
		login:'登录',
		userLogin:'用户登录',
		account:'账号',
		password:'密码',
		verifyCode:'验证码',
		enterAccount:'请输入账号',
		enterPassword:'请输入密码',
		enterCode:'请输入验证码',
	},
	register:{
		register:'注 册',
		userRegister:'用户注册',
		registerEmail:'邮箱',
		registerCode:'验证码',
		sendCode:'发送验证码',
		again:'后重试',
		registerPassword:'密码',
		registerOncePassword:'确认密码',
		registerVerifyCode:'邀请码',
		enterRegisterEmial:'请输入邮箱',
		enterRegisterPassword:'请输入密码',
		enterRegisterCode:'请输入验证码',
		enterOncePassword:'请输入确认密码',
		registerInviteCode:'请输入邀请码，可选',
	},
	passwordNotic:{
		one:'1、密码长度必须介于8到16个字符之间。',
		two:'2、密码只能包含英文字母（A-Z）、数字字符（0-9）以及标点符号。',
		three:'3、密码至少包含1个英文字母和1个数字字符。',
		four:'4、密码不能与账号相同。',
	},
	messageNotice:{
		emailEmpty:'邮箱不能为空',
		emailFormat:'邮箱格式不正确',
		oncePasswordEmpty:'确认密码不能为空',
		oncePasswordEqual:'确认密码不一致',
		passwordEmpty:'密码不能为空',
		passwordFormat:'密码格式不符',
		codeEmpty:'验证码不能为空',
		formatMatch:'信息填写不符合规则',
		notEmpty:'账号和密码不能为空',
		setSuccess:'设置密码成功',
		setTradePassword:'设置交易密码成功',
		emptyTradePassword:'交易密码不能为空',
		changeSuccess:'修改成功',
		getSuccess:'获取成功',
		certificationSuccess:'认证成功',
		nicknameEmpty:'昵称不能为空',
		bindSuccess:'绑定成功',
		addSuccess:'添加成功',
		deleteSuccess:'删除成功',
		noDelete:'不能再删了，再删就没有了',
	},
	home:{
		broadcast:'行情播报',
		begin:'即将开始',
		time:'剩余时间',
		number:'指数',
		immediately:'Buy Now!',
		over:'已结束',
		buy:'Buy It',
		whitePaper:'WhitePaper',
		chName:'中文名',
		readMore:'查看更多',
		learnMore:'了解更多',
		projectNum:'项目编号',
		advertising:'广告',
		thisIssuance:'本轮发行',
	},
	share:{
		shareTiltle:'分享',
		shareOne:'点击即挖矿  流量即币值',
		shareTwo:'上阿凡达不上当不受不受骗',
		shareCopy:'点我复制',
	},
	crowdFunding:{
		all:'全部阶段',
		allConcept:'全部概念',
		start:'即将开始',
		underway:'进行中',
		readWhitePaper:'查看白皮书',
		website:'访问官网',
		volume:'总量',
		totalPrice:'总价',
		crowdfunding:'DAICO',
		calculate:'亿',
		concept:'概念',
		technology:'技术',
		issuance:'发行',
		issueNumber:'本次发行数量',
		crowdPrice:'众筹价格',
		startTime:'抢购开始时间',
		endTime:'抢购结束时间',
		laterStart:'后即将开始',
		order:'立即预约',
		residue:'本轮发行剩余',
		limit:'单账号兑换限制',
		walletAddress:'钱包地址',
		qrCode:'二维码',
		buySuccess:'抢购成功',
		timeLeft:'本轮众筹剩余时间',
		warn:'风险警示：BierInc对众筹项目方合规性已尽审查义务，投资行为所天然具备的风险属性望投资者知悉并谨慎对待',
	},
	projectList:{
		tokenName:'Token名称',
		desc:'描述',
		price:'支付价格',
		status:'状态',
		updateTime:'状态更新时间',
		notic:'所有众筹成功后此昂硬的币会直接充值到您的BierWallet中，未成功的相关款项会原路返回',
	},
	invite:{
		inviteUser:'邀请用户',
		info:'受邀用户今后点击广告创造的价值将会以BRB的形式奖励给您',
		code:'邀请码',
		copy:'复制',
		timer:'邀请时间',
		userAccout:'用户账号',
		recently:'最近登录',
		divided:'分润',
	},
	setting:{//账号设置
		setInfo:'设置信息',
		headUrl:'头像',
		nickname:'昵称',
		enterNickname:'请输入昵称',
		changeNickname:'修改昵称',
		email:'邮箱',
		bindEmail:'绑定邮箱',
		enterBindEmail:'请输入绑定邮箱',
		getEmailCode:'获取邮箱验证码',
		once:'后重试',
		enterEmailCode:'请输入邮箱验证码',
		telegram:'Telegram',
		binded:'已绑定',
		goBind:'去绑定',
		authentication:'身份验证',
		fillInformation:'填写认证信息',
		country:'填写国家或地区',
		pleaseSelect:'请选择',
		identityFileType:'身份文件类型',
		identityFileNumber:'身份文件号码',
		name:'姓名',
		identityFile:'身份文件人像页',
		notic:'注意事项',
		noticOne:'1.请确保你使用的证件真实可信',
		noticTwo:'2.你要手持身份证，距离面部7公分',
		noticThree:'3.进行肩部以上的手持证件照拍摄',
		noticFour:'4.你现在使用的证件在有效期内',
	},
	passwordInfo:{//更改密码、交易密码
		passwords:'密码',
		oldPassword:'原密码',
		newPassword:'新密码',
		oncePassword:'确认新密码',
		enterOPassword:'请输入原密码',
		enNewPassword:'请输入新密码',
		oldPasswordEmpty:'原密码不能为空',
		newPasswordEmpty:'新密码不能为空',
		tradePassword:'交易密码',
		oldTradePassword:'旧交易密码',
		newTradePassword:'新交易密码',
		onceTradePassword:'确认交易密码',
		enterTPassword:'请输入原交易密码',
		enterNTPassword:'请输入新交易密码',
		enterOTPassword:'请输入确认密码',
		setPassword:'设置密码',
		changePassword:'修改密码',
		setTradePassword:'设置交易密码',
		changeTradePassword:'更改交易密码',
		enterTradePassword:'请输入交易密码',
	},
	personal:{//个人中心
		purse:'钱包',
		revenue:'广告收益账户',
		main:'广告主账户',
		crowdfunding:'我的DAICO',
		myCrowdfunding:'我参与的众筹',
		vote:'我的投票',
		invite:'邀请用户',
		settings:'账号设置',
		adserving:'广告方',
		project:'DAICO项目方',
		Investors:'投资人',
		partner:'合伙人',
		exchange:'交易所',
		medium:'媒体',
		loginOut:'退出登录',
	},
	purse:{
		wallet:'钱包',
		balance:'余额',
		bindWalletAddress:'绑定您的钱包地址，用于提现在平台获得的广告收益、核对作为广告主的充值记录、检查您的账户余额。',
		main:'这意味着：',
		one:'1、ETH钱包地址将可以用于接收基于ERC20协议的平台代币AFDT。',
		two:'2、如果您需要投放广告，则需要从本地址向平台充值以便核对',
		eth:'ETH钱包地址',
	},
	buttonAll:{
		confirm:'确定',
		cancle:'取消',
		submitVerification:'提交验证',
		bind:'绑定',
		change:'点击修改',
		revise:'修 改',
		save:'保存',
		add:'添加',
		delete:'删除',
		submits:'提交',
		saveChange:'保存修改',
		finish:'完成',
	},
	initiated:{
		iInitiated:'我发起的众筹',
		token:'Token名称',
		desc:'描述',
		lowTop:'硬顶/软顶',
		degree:'完成度',
		status:'状态',
		newCrowd:'申请新的众筹',
		review:'待审核',
		over:'已上架',
		refuse:'审核未通过',
		statusUpdate:'状态更新时间',
	},
	project:{//广告收益账户以及主账户
		balance:'余额',
		ethWalletAddress:'ETH钱包地址',
		withdraw:'提现',
		recharge:'充值',
		moneyAccount:'收款账户',
		enterMoneyAccount:'请输入收款账户',
		useBalance:'可用余额',
		freeze:'冻结',
		handlingFee:'手续费',
		revenue :'广告收益账户',
		myWallet:'我的钱包',
		withdrawal:'提现金额',
		enterMoney:'请输入金额',
		notic:'充值金额到账后，相应金额会自动出现在广告主账户中',
	},
	accountFlow:{
		accountStatement:'账户流水',
		startTime:'开始日期',
		endTime:'结束日期',
		search:'搜索',
		dataTime:'时间',
		desc:'描述',
		flowDirection:'流向',
		amountOfMoney:'金额（BRB）',
	},
	adServing:{
		adSer:'广告投放',
		trafficking:'投放内容管理',
		averagePrice:'当前均价',
		adjustment:'调整',
		strategy:'竞价策略',
		all:'首页（综合）',
		prompt:'竞价策略调整将于新加坡时间次日00:00:00起生效，每天仅限调整一次',
	},
	projectNotic:{
		title:'项目内容',
		notic:'请尽可能详细得填写相关资料，以便投资委员会合理地评估贵项目（评估期间双方都应严格遵守保密义务）',
		newApplication:'DAICO申请',
	},
	team:{
		teamInfo:'团队',
		teamName:'团队名称',
		teamPhone:'团队联系方式',
		teamAddress:'主要成员所在地',
		coreMember:'核心团队成员',
		consultant:'顾问团队成员',
		openCoreMember:'点击打开核心团队成员',
		openConsultant:'点击打开顾问团队成员',
		name:'全名',
		title:'头衔',
		desc:'简介',
		operating:'操作',
		enterTeamName:'请输入团队名称',
		enterTeamPhone:'请输入团队联系方式',
		enterTeamAddress:'请输入主要成员所在地',
		enterName:'请输入全名',
		enterTitle:'请输入头衔',
		enterDesc:'请输入简介',
		emptyTeamName:'团队名称不能为空',
		emptyTeamPhone:'团队联系方式不能为空',
		emptyTeamAddress:'主要成员所在地不能为空',
		emptyName:'全名不能为空',
		emptyTitle:'头衔不能为空',
		emptyDesc:'简介不能为空',
	},
	projectInfo:{
		info:'项目情况',
		projectName:'项目名称',
		projectDesc:'项目简介',
		concept:'概念',
		technology:'技术',
		enterProjectName:'请输入项目名称',
		enterProjectDesc:'请输入项目简介',
		enterTechnology1:'请输入技术1',
		enterTechnology2:'请输入技术2',
		emptyProjectName:'项目名称不能为空',
		emptyProjectDesc:'项目简介不能为空（限制100个字符）',
	},
	tokenInfo:{
		token:'代币发行',
		tokenIntro:'代币信息',
		english:'英文简写',
		chinese:'中文简写',
		englishName:'英文全名',
		logo:'logo',
		upload:'上传',
		enterEnglish:'请输入英文简写',
		enterChinese:'请输入中文简写',
		enterFullEnglish:'请输入英文全名',
		emptyEnglish:'英文简写不能为空（限制5个字符）',
		emptyFullEnglish:'英文全名不能为空',
		emptyLogo:'logo不能为空',
		title:'本轮众筹标题',
		issueTotal:'发行总量',
		total:'众筹总量',
		thisIssue:'本伦次发行量',
		price:'众筹价格',
		limit:'单账号兑换限制',
		money:'目标货币',
		topLimit:'发行硬顶',
		lowLimit:'发行软顶',
		dataTime:'本轮众筹时间',
		files:'合规性文件',
		about:'相关牌照',
		upload:'上传',
		download:'下载',
		startTime:'开始日期',
		to:'至',
		endTime:'结束日期',
		enterTitle:'请输入本轮众筹标题',
		enterIssueTotal:'请输入发行总量',
		enterTotal:'请输入众筹总量',
		enterThisIssue:'请输入本伦次发行量',
		enterPrice:'请输入众筹价格',
		enterLimit:'请输入单账号兑换限制',
		enterMoney:'请输入目标货币',
		enterTopLimit:'请输入发行硬顶',
		enterLowLimit:'请输入发行软顶',
		emptyTitle:'请输入本轮众筹标题（限制）',
		emptyIssueTotal:'请输入发行总量（限制）',
		emptyTotal:'请输入众筹总量（限制）',
		emptyThisIssue:'请输入本伦次发行量（限制）',
		emptyPrice:'请输入众筹价格（限制）',
		emptyLimit:'请输入单账号兑换限制（限制）',
		emptyMoney:'请输入目标货币（限制）',
		emptyTopLimit:'请输入发行硬顶（限制）',
		emptyLowLimit:'请输入发行软顶（限制）',
		emptyDadataTime:'请输入本轮众筹时间',
		emptyFiles:'合规性文件不能为空',
		emptyAbout:'相关牌照不能为空',
	},
	aboutLink:{
		linkInfo:'相关链接',
		website:'官网',
		whitePaper:'白皮书地址',
		websiteName:'自定义站点名',
		websiteAddress:'自定义站点地址',
		enterWebsite:'请输入官网',
		enterWhitePaper:'请输入白皮书地址',
		enterWebsiteName:'自定义站点名',
		enterWebsiteAddress:'请输入自定义站点地址',
		emptyWebsite:'官网不能为空（符合网站地址）',
		emptyWhitePaper:'白皮书地址不能为空（符合网站地址）',
	},
	messageCode:{
		exceptions:'系统异常',
		success:'操作成功',
		failure:'操作失败',
		registered:'注册成功',
		userNotExist:'用户不存在，无法登录',
		notRegister:'用户已经存在，无法注册',
		tooManyUsers:'用户存在过多，无法登录',
		disabled:'该用户已禁用，无法登录',
		alreadyBound:'当前用户已经绑定邮箱，无法重新绑定',
		wrongPassword:'密码错误，无法登录',
		originalPassword:'原密码错误，请重新输入',
		transactionPassword:'原交易密码错误，请重新输入',
		verificationCode:'验证码错误',
		codeSendSuccess:'验证码发送成功',
		codeSendFaild:'验证码发送失败',
		codeSentTooFrequently:'验证码发送过于频繁，请稍后再试',
		codeNotExist:'邀请码不存在',
		bindedTelegram:'该telegram账号已经注册平台账号，无法绑定',
		onShelves:'众筹信息已经上架，无法修改',
		underReview:'众筹信息审核中，无法修改',
		notApplyAgain:'您已经存在广告，无法再次申请',
		loginInvalid:'登录失效，请重新登录',
		noBindEmail:'该账户未绑定邮箱',
		illegal:'广告非法',
		remove:'广告已下架',
		invalid:'点击挖矿无效',
		exist:'众筹不存在',
		existed:'交易密码已经存在',
		passwordExisted:'密码已经存在',
		unableBind:'钱包地址已经被使用，无法继续绑定',
		itemNoExist:'广告项目不存在',
		noSetConcept:'广告项目还未设置概念',
	},
	...enLocale
};
export default en
