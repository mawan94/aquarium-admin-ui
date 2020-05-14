const menuList = [


    {key: '1',label: '支付查询', navLink: '/financial-dealing/index', icon: ''},
    {key: '2',label: '清分', navLink: '/data-clear/index', icon: ''},
    {
        key: '3', label: '对账', navLink: '', icon: '', child: [
            {key: '4',label: '导入导出', navLink: '/import-and-export/index', icon: ''},
            {key: '5',label: '常规处理', navLink: '/reconciliation/index', icon: ''},
            {key: '6',label: '特殊处理', navLink: '/bad-account/index', icon: ''},
            {key: '7',label: '处理结果', navLink: '/average-account/index', icon: ''},
        ]
    },
    {
        key: '8',label: '审核', navLink: '', icon: '', child: [
            {key: '9',label: '结算申请', navLink: '/settlement/index', icon: ''},
            {key: '10',label: '结算审核', navLink: '/work-order/index', icon: ''},

        ]
    },
    {
        key: '11',label: '结算', navLink: '', icon: '', child: [
            {key: '12',label: '结算处理', navLink: '/settlement-pay/index', icon: ''},
            {key: '13',label: '结算查询', navLink: '/settlement-history/index', icon: ''},
        ]
    },

    //=============================================================================

    {key: '12',label: 'testcategory', navLink: '/category/index', icon: ''},


    //=============================================================================
    // {label: '常规账单处理', navLink: '/reconciliation/index', icon: ''},
    // {label: '特殊账单处理', navLink: '/bad-account/index', icon: ''},
    // {label: '账单导入导出', navLink: '/import-and-export/index', icon: ''},
    // {label: '差额调平账单', navLink: '/average-account/index', icon: ''},
    // {label: '账单结算申请', navLink: '/settlement/index', icon: ''},
    // {label: '账单审批管理', navLink: '/work-order/index', icon: ''},
    // {label: '结算账单查询', navLink: '/settlement-history/index', icon: ''},
    // // {label: '1', navLink: '/cpo-emp-bind/index', icon: ''},
    // {
    //     label: 'sub-menu', navLink: '', icon: '', child: [
    //         {label: '账户资金往来', navLink: '/financial-dealing/index', icon: ''},
    //         {label: '清分', navLink: '/data-clear/index', icon: ''},
    //     ]
    // },
];
export default menuList;
