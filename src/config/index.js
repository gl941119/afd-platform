export default {
    GetSystemTime: 'blockchainadvert/common/now-date',
    QueryCrowdSale: 'blockchainadvert/crowd-funding/home-page',
    QueryAdvertInfo: 'blockchainadvert/advertservice/home-page',
    QueryCrowdSaleDetailInfo: 'blockchainadvert/crowd-funding/secondary',
    QueryAllConcept: 'blockchainadvert/common/concept',
    QueryAdvertDetailInfo: 'blockchainadvert/advertservice/secondary',
    QueryAdvertInfoForPage: 'blockchainadvert/advertservice/secondPage',
    ClickAdvertToProfit: 'blockchainadvert/share/click-advert',
    QueryCrowdDataById: 'blockchainadvert/crowd-funding/id', // 根据主ID获取单个众筹
    GetQrCode: 'blockchainadvert/common/createRrCode',
    FindAdvertisement: 'blockchainadvert/advertservice/findAdvertisement',
    // Login and Register
    Register: 'blockchainadvert/account/registered',
    Login: 'blockchainadvert/account/accountLogin',
    GetVerifyFromSer: 'blockchainadvert/account/getValidateCode', // get verify from service
    SendVerifyCode: 'blockchainadvert/account/sendRegistCode', // email verify
    TelegramAuthorizeCB: 'blockchainadvert/authorize/telegram',
    SignOut: 'blockchainadvert/account/signout',
    SendForgetPwdCode: 'blockchainadvert/account/sendForgetPasswordCode',
    SetNewPassword: 'blockchainadvert/account/setNewPassword',
    JudgeEmail: 'blockchainadvert/account/emailIsRegistered',
    GetUserInfoById: 'blockchainadvert/account',
    SendSmsVerify: 'blockchainadvert/account/send-smscode', // 快速登录
    QuickSmsLogin: 'blockchainadvert/account/smslogin', // 快速登录

    QueryRevenueBasicInformation: 'blockchainadvert/advert-income/account-id', // mine* // 首页获取收益
    QueryRevenue: 'blockchainadvert/income-flows/token', // revenue*
    QueryWithdraw: 'blockchainadvert/deal-flows/token', // 提现记录*
    QueryRevenueBalance: 'blockchainadvert/advert-income/token', // revenue-balance
    QueryRevenueAccountFlow: 'blockchainadvert/income-flow/income-id', // 收益账户流水
    QueryMainBasicInformation: 'blockchainadvert/advert-main/account-id', // 主账户
    QueryMainAccountFlow: 'blockchainadvert/main-flow/main-id', // 账户流水
    PostWithdraw: 'blockchainadvert/account/withdraw', // 提现
    /* 图片上传*/
    Upload: 'blockchainadvert/common/upload-file',
    UploadImg: 'blockchainadvert/common/uploadImageWithWatermark',
    /* 我发起的众筹*/
    QueryMyNewCrowdfunding: 'blockchainadvert/crowd-funding/initiate',
    /* 钱包地址的绑定*/
    QueryBindWalletAddress: 'blockchainadvert/account/bindWalletAddress',
    QueryWalletAddress: 'blockchainadvert/account/findWalletAddress',
    QueryBalance: 'blockchainadvert/account/getWalletBalance',
    /* 我参与的众筹*/
    QueryMyCrowdfunding: 'blockchainadvert/join-crowd-funding/account-id',
    /* 获取所有概念*/
    QueryConcept: 'blockchainadvert/common/concept',
    /* 众筹项目方-申请新众筹*/
    QueryNewCrowdfunding: 'blockchainadvert/crowd-funding',
    QueryCrowdfundingDetails: 'blockchainadvert/crowd-funding/id', // 众筹详情
    ChangeCrowdfundingDetails: 'blockchainadvert/crowd-funding/put', // 修改众筹申请
    /* 广告方-添加新项目*/
    QueryPrice: 'blockchainadvert/advertservice/findAdvertProPriceByAccountId', // 查询价格信息
    ChangePrice: 'blockchainadvert/advertservice/advert/modifyPrice', // 修改概念价格
    QueryNewProject: 'blockchainadvert/advertservice/advert',
    QueryProject: 'blockchainadvert/advertservice/findAdvertProByAccountId', // 查詢詳情
    ChangeProject: 'blockchainadvert/advertservice/modifyAdvertProj', // 修改
    QueryAdCoreMember: 'blockchainadvert/advert-team-member/getAll/advert-id', // 查询核心团队
    AddAdCoreMember: 'blockchainadvert/advert-team-member/add', // 添加核心团队
    DeletedAdCoreMember: 'blockchainadvert/advert-team-member/delete/advert-id/id', // 删除核心团队
    ChangeAdCoreMember: 'blockchainadvert/advert-team-member/put', // 修改核心团队
    QueryAdConsultant: 'blockchainadvert/advert-team-consultants/getAll/advert-id', // 查询顾问团队
    AddAdConsultant: 'blockchainadvert/advert-team-consultants/add', // 添加顾问团队
    DeletedAdConsultant: 'blockchainadvert/advert-team-consultants/delete/advert-id/id', // 删除顾问团队
    ChangeAdConsultant: 'blockchainadvert/advert-team-consultants/put', // 修改顾问团队
    /* 邀请用户*/
    QueryInviteCode: 'blockchainadvert/account/getInviteCode', // 获取验证码
    QueryInviteData: 'blockchainadvert/account/getInvitePerson', // 获取邀请用户
    /* 账号设置*/
    QueryAccountSettings: 'blockchainadvert/account/modifyAccountMessage', // 账号设置
    BindPhoneOrEmail: 'blockchainadvert/account-ext/bind-phoneemail',
    QueryCode: 'blockchainadvert/account/sendBindEmailCode', // 获取验证码
    // 获取验证码 3 修改密码，4修改交易密码 接受验证码类型：0: 手机号， 1：邮箱
    QueryPasswordCode: 'blockchainadvert/account/sendUpdateAccountCode',
    // 获取验证码 3 修改密码，4修改交易密码 接受验证码类型：0: 手机号， 1：邮箱
    GetCode: 'blockchainadvert/account/send-bindcode', // 2: 绑定邮箱验证码 、 8: 绑定手机号、7: 绑定钱包地址 4,交易密码
    NoBindGetCode: 'blockchainadvert/account/send-updatecode', // 2: 绑定邮箱验证码 、 8: 绑定手机号
    NoBind: 'blockchainadvert/account-ext/valid-phoneemail', // 2: 绑定邮箱验证码 、 8: 绑定手机号、9: 忘记交易密码 ,
    ReBindPhoneEmail: 'blockchainadvert/account-ext/modify-phoneemail',
    ChangeLogin: 'blockchainadvert/account-ext/modify-loginpwd',
    ChangeTradePassword: 'blockchainadvert/account-ext/modify-tradepwd',
    SetTradePassword: 'blockchainadvert/account-ext/set-newtradepwd', // 设置交易密码

    // QueryPasswordCodes: 'blockchainadvert/account/send-updatecode', // 更新
    QueryAuthentication: 'blockchainadvert/account/idAuthentication', // 身份验证
    ChangeAuthStatus: 'blockchainadvert/account/updateAuthStatus',
    // SetPassword: 'blockchainadvert/account/setPassword', // 设置密码
    // SetTradePassword: 'blockchainadvert/account/setTradePassword', // 设置 交易密码
    QuerySettings: 'blockchainadvert/account/getAccountStatus', // 获取设置信息
    BindTelegram: 'blockchainadvert/account/bindTelegram', // 绑定telegram
    /* 核心团队*/
    AddCoreMember: 'blockchainadvert/crowd-team-member',
    DeletedCoreMember: 'blockchainadvert/crowd-team-member/delete/crowd-id/id',
    ChangeCoreMember: 'blockchainadvert/crowd-team-member/put',
    QueryCoreMember: 'blockchainadvert/crowd-team-member/getAll/crowd-id',
    /* 顾问团队团队*/
    addConsultant: 'blockchainadvert/crowd-team-consultants',
    deletedConsultant: 'blockchainadvert/crowd-team-consultants/delete/crowd-id/id',
    ChangeConsultant: 'blockchainadvert/crowd-team-consultants/put',
    QueryConsultant: 'blockchainadvert/crowd-team-consultants/getAll/crowd-id/',
};
