'use strict';

var appConfig = {
    OFFLINE: window.OFFLINE,
    ROOT_URL: window.ROOT_URL,
    ROUTE_URL: window.ROUTE_URL,
    API: {
        // 用户登录
        USERLOGIN:'authorityUserLogin',
        // 用户登出
        USERLOGOUT:'userLogout',
        //收银台管理
        //主菜单树
        QUERY_MENU_TREE:'menuListSelect',
        //收银台管理－支付方式管理

        PAYMENTMETHOD_QUERY: 'PaymentMethodQuery',
        SAVEPAYMODE:'PaymentMethodAdd',
        UPDATEPAYMODE:'PaymentMethodEdit',
        PAYMENTMETHODDEL:'PaymentMethodDel',

        //产品名称列表查询
        PRODNAMELISTSELECT: 'prodNameListSelect',
        //产品列表查询
        PRODUCTDETAILLIST: 'productDetailList',
        //钱包管理-销售业绩明细分析
        ANALYSALESDETAIL: 'analySalesDetail',
        //钱包管理-销售业绩汇总分析
        ANALYSALESSUMSERVICE: 'analySalesSumService',

        //银行信息
        BANKINFO_QUERY:'bankinfoQuery',
        BNAKINFO_SAVE:'bankinfoAdd',
        BANKINFO_UPDATE:'updateBankInfo',
        BANKINFO_DEL:'delBankInfo',

        //起投金额设置
        DEPOSIT_AMOUNT_QUERY:'startDepositAmountQuery',
        DEPOSIT_AMOUNT_SAVE:'startDepositAmountSave',
        DEPOSIT_AMOUNT_EDIT:'startDepositAmountEdit',
        DEPOSIT_AMOUNT_DEL:'startDepositAmountDel',

        //交易类型管理
        TRANSACTION_TYPE_QUERY:'transactionTypeQuery',
        TRANSACTION_TYPE_SAVE:'transactionTypeAdd',
        TRANSACTION_TYPE_EDIT:'transactionTypeUpdate',
        TRANSACTION_TYPE_DEL:'transactionTypeDel',
        //支付渠道
        PAYMENT_CHANNEL_QUERY:'paymentChannelQuery',
        PAYMENT_CHANNEL_SAVE:'paymentChannelSave',
        PAYMENT_CHANNEL_EDIT:'paymentChannelEdit',
        PAYMENT_CHANNEL_DEL :'paymentChannelDel',
        //理财产品信息
        FINANCING_PRODUCT_QUERY:'financingAllProductList',
        FINANCING_PRODUCT_SAVE:'addFinancingProduct',
        FINANCING_PRODUCT_UPDATE:'updateFinancingProduct',
        FINANCING_PRODUCT_DEL:'financingProductDel',
        FINANCING_PRODUCT_QUERY_DETAIL:'productDetail',
        //基金产品管理
        FUND_PRODUCT_QUERY:'fundAllProductList',
        FUND_PRODUCT_SAVE:'addFundProduct',
        FUND_PRODUCT_UPDATE:'updateFundProduct',
        FUND_PRODUCT_DEL:'fundProductDel',
        FUND_PRODUCT_QUERY_DETAIL:'productDetail',

        //基金经理管理
        FUND_MANAGER_QUERY:'productManagerList',
        FUND_MANAGER_SAVE:'addProductManager',
        FUND_MANAGER_UPDATE:'updateProductManager',
        FUND_MANAGER_DEL:'fundManagerDel',
        FUND_MANAGER_QUERY_DETAIL:'productManagerDetail',
        //产品上架
        PRODUCT_ON_SALE:'productOnSale',
        //产品下架
        PRODUCT_OFF_SALE:'productOffsale',
        // 统一支付-对账差错结果查询
        SEARCHERRORCHECKING:'queryCheckingResultDetailService',
        // 统一支付-对账差错结果查询-对账系统查询
        QUERYCHECKINGSYSTEMSERVICE:'queryCheckingSystemService',
        // 统一支付-对账差错结果查询-对账单笔差错处理
        CHECKINGSINGLEERR:'checkingSingleErrHandleService',
        // 统一支付-对账结果查询
        CHECKINGGROUPRESULT:'queryCheckingGroupService',
        // 统一支付-对账结果查询-对账结果单笔详情查询
        QUERYCHECKINGRESULT:'queryCheckingResultSingleDetailService',
        // 统一支付-对账结果查询-继续对账指令
        PROCESSCHECKINGSERVICE:'processCheckingService',
        // 统一支付-请求对账服务
        REQUESTCHECKING:'requestChecking',
        // 统一支付-支付订单不确定交易查询
        QUERYUNKNOWNPOSUMMARY:'queryUnknownPOSummary',
        // 统一支付-支付订单不确定交易查询-对账结果单笔详情查询
        QUERYUNKNOWNPOSTATUS:'queryUnknownPOStatus',
        // 统一支付-单笔/批量订单概要查询
        QUERYPOSUMMARY:'queryPaymentOrderSummary',
        // 统一支付-单笔/批量订单概要查询-支付订单红冲
        CANCELPAYMENTORDER:'cancelPaymentOrder',
        // 统一支付-单笔/批量订单概要查询-执行订单收付款
        PROCESSPAYMENTORDER:'processPaymentOrderReceivePayment',
        // 权限管理-菜单管理-查询菜单节点信息
        QUERYMENUNODEINFO:'menuChildSelect',
        // 权限管理-菜单管理-新增菜单
        MENUADD:'menuAdd',
        // 权限管理-菜单管理-修改菜单
        MENUUPDATE:'menuUpdate',
        // 权限管理-菜单管理-删除菜单
        MENUDELETE:'menuDelete',
        // 权限管理-角色管理-角色信息的分页查询
        ROLEPAGESELECT:'rolePageSelect',
        // 权限管理-角色管理-新增角色
        ROLEADD:'roleAdd',
        // 权限管理-角色管理-修改角色
        ROLEUPDATE:'roleUpdate',
        // 权限管理-角色管理-删除角色
        ROLEDELETE:'roleDelete',
        // 权限管理-角色管理-角色绑定菜单查询
        ROLEBINDMENUSELECT:'roleBindMenuSelect',
        // 权限管理-角色管理-角色绑定菜单
        ROLEBINDMENU:'roleBindMenu',
        // 权限管理-机构管理-机构信息查询
        QUERYORGDATA:'orgListSelect',
        // 权限管理-机构管理-新增机构
        ORGADD:'orgAdd',
        // 权限管理-机构管理-修改机构
        ORGUPDATE:'orgUpdate',
        // 权限管理-机构管理-删除机构
        ORGDELETE:'orgDelete',
        // 权限管理-机构管理-父级机构查询子机构信息函数
        ORGCHILDINFOREQUEST:'orgChildListSelect',
        // 权限管理-用户管理-用户信息的分页查询
        USERPAGESELECTREQUEST:'userPageSelect',
        // 权限管理-用户管理-用户新增
        USERADD:'userAdd',
        // 权限管理-用户管理-用户修改
        USERUPDATE:'userUpdate',
        // 权限管理-用户管理-用户删除
        USERDELETE:'userDelete',
        // 权限管理-用户管理-用户绑定角色查询
        USERBINDROLESELECT:'userBindRoleSelect',
        // 权限管理-用户管理-用户绑定角色
        USERBINDROLE:'userBindRole',
        //注册用户统计
        QUERYREGISTERCUSTOMER:'statisticsPortalRegistUser',
        //金融代理-供应商信息管理
        QUERYSUPPLIERINFO:'supplyInfoList',

        //金融代理-新增供应商
        ADDSUPPLIERINFO:'addSupplyInfo',
        //金融代理-修改供应商信息
        UPDATESUPPLYINFO:'updateSupplyInfo',
        //金融代理-更新供应商合作状态
        SUPPLYINFOEFFECTSTATUS: 'supplyInfoEffectStatus',

        //金融代理-新增代理协议
        ADDAGENCYAGREEMENT:'addAgencyAgreement',
        //金融代理-更新代理协议
        UPDATEAGENCYAGREEMENT:'updateAgencyAgreement',
        //金融代理-查询代理协议列表
        QUERYAGENCYAGREEMENT:'agencyAgreementList',
        //金融代理-查询代理协议详情
        QUERYAGENCYAGREEMENTDETAIL:'agencyAgreementDetail',
        //金融代理-代理协议生失效
        AGENCYAGREEMENTEFFECTSTATUS:'agencyAgreementEffectStatus',
        //金融代理-代理商资金清结算列表查询
        CLEARINGSUPPLIERPAYMENTLIST:'clearingSupplierPaymentList',
        //金融代理-代理商资金结算
        SUPPLIERSETTLE:'supplierSettle',

        //财富管家-查询方案推荐规则列表
        SELECTPLANCONFIG:'selectPlanConfig',
        //财富管家-查询方案推荐规则详情
        SELECTPRODCONFIG:'selectProdConfig',
        //财富管家-方案推荐规则修改
        UPDATEPLANCONFIG:'updatePlanConfig',
        //财富管家-方案推荐规则删除
        DELETEPLANCONFIG:'deletePlanConfig',
        //财富管家-更新方案中的产品
        UPDATEPRODOFPLAN:'updateProdOfPlan',

        // 创建作业-创建任务
        CREATEBATCHTASK:'createBatchTaskByWS',
        // 批量管理-日终切日-查询对账日期
        QUERYSYSDAY:'uppArapQueryPostingDate',
        // 批量管理-日终切日-切日
        SUBMITSYSDAY:'setCurrentCalendar',
        // 批量管理-定时配置-查询
        QUERYSCHEDULE:'querySchedule',
        //查询作业
        QUERYBATCHCONFIG:'queryBatchJobConfig',
        //新增计划
        CREATESCHEDULE:'createSchedule',
        //删除计划
        DELETESCHEDULE:'deleteSchedule',
        //编辑调度
        UPDATESCHEDULE:'updateSchedule',
        //查询批量任务
        QUERYBATCHTASKINFO:'queryBatchTaskInfo',
        //查询任务步骤
        QUERYBATCHTASKSTEPS:'queryBatchTaskSteps',
        //终止任务
        SUSPENDTASK:'suspendTask',
        //续做任务
        CONTINUETASK:'continueTask',
        //跳过任务
        SKIPFAILSTEP:'skipFailStep',
        //查询数据
        QUERYBATCHDATA:'queryBatchData',
        //润和宝重新对账
        REPEATBATCHUPLOAD:'repeatBatchUploadPurOrRedeFile',
        //润和宝对账结果更新
        REPEATBATCHDOWNLOAD:'repeatBatchDownloadBalOfAccResultFile',
        //银行信息列表
        QUERYBANKNAMELIST:'queryBankNameList'
    },
    ERROR: {
        NO_SERVER: '服务器连接失败,请稍后重试',
        NO_DEAL: '交易失败，请稍后重试',
        ACCOUNT_ERROR: '账户处于非正常状态'
    },
    SESSION:{
        MENU_NAV:'menuNav',
        CUSTOM_ID: 'CUSTOM_ID',                                                                            // 客户号
        CURRENT_USER:'CURRENT_USER'
    }
};

module.exports = appConfig;
