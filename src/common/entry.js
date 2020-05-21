const list = [
    {
        key: 'reconciliation',
        router: require('../view/reconciliation/router/reconciliation').default
    },
    {
        key: 'averageAccount',
        router: require('../view/averageAccount/router/averageAccount').default
    },
    {
        key: 'badAccount',
        router: require('../view/badAccount/router/badAccount').default
    },
    {
        key: 'settlement',
        router: require('../view/settlement/router/settlement').default
    },
    {
        key: 'settlementHistory',
        router: require('../view/settlementHistory/router/settlementHistory').default
    },
    {
        key: 'importAndExport',
        router: require('../view/importAndExport/router/importAndExport').default
    },
    {
        key: 'cpoEmpBind',
        router: require('../view/cpoEmpBind/router/cpoEmpBind').default
    },
    {
        key: 'workOrder',
        router: require('../view/workOrder/router/workOrder').default
    },
    {
        key: 'dataClear',
        router: require('../view/dataClear/router/dataClear').default
    },
    {
        key: 'financialDealing',
        router: require('../view/financialDealing/router/financialDealing').default
    },
    {
        key: 'settlementPay',
        router: require('../view/settlementPay/router/settlementPay').default
    },


    // ------------------------------------------------------------
    {
        key: 'category',
        router: require('../view/category/router/category').default
    },
    {
        key: 'supplier',
        router: require('../view/supplier/router/supplier').default
    },
    {
        key: 'banner',
        router: require('../view/banner/router/banner').default
    },
    {
        key: 'product',
        router: require('../view/product/router/product').default
    },
    {
        key: 'sku',
        router: require('../view/sku/router/sku').default
    },
    {
        key: 'order',
        router: require('../view/order/router/order').default
    }
];
export default {list: list};
