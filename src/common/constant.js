const constant = {
    projectName: 'Hubject',
    description: '充电财务系统',
    imgHost: 'http://q7oyh3ppo.bkt.clouddn.com',

    host: 'http://127.0.0.1:8778',
    // host: 'http://adapter-qa.hubject-hbs.cn',
    // host: 'http://adapter.hubject-hbs.cn',

    ws: 'ws://127.0.0.1:8999/reconciliation/socket',
    // ws: 'ws://adapter-qa.hubject-hbs.cn/reconciliation/socket',
    // ws: 'ws://adapter.hubject-hbs.cn/reconciliation/socket',

    // operationUrl: 'http://portal.hubject-hbs.cn/#/operation?token=',
    // ratingUrl: 'http://portal.hubject-hbs.cn/#/?token='
    operationUrl: 'http://localhost:8080/#/operation?token=',
    ratingUrl: 'http://localhost:8080/#/?token=',
};

export default constant
