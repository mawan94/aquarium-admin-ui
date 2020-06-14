import {get, post} from './http'

import constant from '../common/constant'

const server = {
    getCustomerOrderList(params) {
        return get({
            url: constant.host + '/customer/b/v1/order',
            params: params
        })
    },
    getCustomerReceiveAddressList(params) {
        return get({
            url: constant.host + '/customer/b/v1/receive-address',
            params: params
        })
    },
    getCustomerRechargeRecordList(params) {
        return get({
            url: constant.host + '/customer/b/v1/recharge-record',
            params: params
        })
    },
    getCustomerCouponList(params) {
        return get({
            url: constant.host + '/customer/b/v1/coupon',
            params: params
        })
    },
    getCustomerCartList(params) {
        return get({
            url: constant.host + '/customer/b/v1/cart-info',
            params: params
        })
    },
    getCustomerBrowseHistoryList(params) {
        return get({
            url: constant.host + '/customer/b/v1/browse-history',
            params: params
        })
    },
    getCustomerList(params) {
        return get({
            url: constant.host + '/customer/b/v1/list',
            params: params
        })
    },


    getArticleList(params) {
        return get({
            url: constant.host + '/article/b/v1/list',
            params: params
        })
    },
    getArticle(params) {
        return get({
            url: constant.host + '/article/b/v1/find',
            params: params
        })
    },
    addArticle(params) {
        return post({
            url: constant.host + '/article/b/v1/add',
            data: params
        })
    },
    updateArticle(params) {
        return post({
            url: constant.host + '/article/b/v1/modify',
            data: params
        })
    },
    deleteArticle(params) {
        return post({
            url: constant.host + '/article/b/v1/del',
            data: params
        })
    },


    getTagList(params) {
        return get({
            url: constant.host + '/tag/b/v1/list',
            params: params
        })
    },
    getTag(params) {
        return get({
            url: constant.host + '/tag/b/v1/find',
            params: params
        })
    },
    addTag(params) {
        return post({
            url: constant.host + '/tag/b/v1/add',
            data: params
        })
    },
    updateTag(params) {
        return post({
            url: constant.host + '/tag/b/v1/modify',
            data: params
        })
    },
    deleteTag(params) {
        return post({
            url: constant.host + '/tag/b/v1/del',
            data: params
        })
    },
    tagSelectors(params) {
        return get({
            url: constant.host + '/tag/b/v1/selectors',
            params: params
        })
    },

    changeRoleMenu(params) {
        return post({
            url: constant.host + '/role-menu/b/v1/change',
            data: params
        })
    },
    getRoleList(params) {
        return get({
            url: constant.host + '/role/b/v1/list',
            params: params
        })
    },
    getRole(params) {
        return get({
            url: constant.host + '/role/b/v1/find',
            params: params
        })
    },
    addRole(params) {
        return post({
            url: constant.host + '/role/b/v1/add',
            data: params
        })
    },
    updateRole(params) {
        return post({
            url: constant.host + '/role/b/v1/modify',
            data: params
        })
    },
    deleteRole(params) {
        return post({
            url: constant.host + '/role/b/v1/del',
            data: params
        })
    },


    getMenuSelectors(params) {
        return get({
            url: constant.host + '/menu/b/v1/selectors',
            params: params
        })
    },
    getMenuRootList(params) {
        return get({
            url: constant.host + '/menu/b/v1/root',
            params: params
        })
    },
    getMenuChildList(params) {
        return get({
            url: constant.host + '/menu/b/v1/child',
            params: params
        })
    },
    getMenu(params) {
        return get({
            url: constant.host + '/menu/b/v1/find',
            params: params
        })
    },
    addMenu(params) {
        return post({
            url: constant.host + '/menu/b/v1/add',
            data: params
        })
    },
    updateMenu(params) {
        return post({
            url: constant.host + '/menu/b/v1/modify',
            data: params
        })
    },
    deleteMenu(params) {
        return post({
            url: constant.host + '/menu/b/v1/del',
            data: params
        })
    },


    getDeliveryList(params) {
        return get({
            url: constant.host + '/delivery/b/v1/list',
            params: params
        })
    },
    getDelivery(params) {
        return get({
            url: constant.host + '/delivery/b/v1/find',
            params: params
        })
    },
    addDelivery(params) {
        return post({
            url: constant.host + '/delivery/b/v1/add',
            data: params
        })
    },
    updateDelivery(params) {
        return post({
            url: constant.host + '/delivery/b/v1/modify',
            data: params
        })
    },
    deleteDelivery(params) {
        return post({
            url: constant.host + '/delivery/b/v1/del',
            data: params
        })
    },

    getRechargeRuleList(params) {
        return get({
            url: constant.host + '/recharge-rule/b/v1/list',
            params: params
        })
    },
    getRechargeRule(params) {
        return get({
            url: constant.host + '/recharge-rule/b/v1/find',
            params: params
        })
    },
    addRechargeRule(params) {
        return post({
            url: constant.host + '/recharge-rule/b/v1/add',
            data: params
        })
    },
    updateRechargeRule(params) {
        return post({
            url: constant.host + '/recharge-rule/b/v1/modify',
            data: params
        })
    },
    deleteRechargeRule(params) {
        return post({
            url: constant.host + '/recharge-rule/b/v1/del',
            data: params
        })
    },

    getCouponList(params) {
        return get({
            url: constant.host + '/coupon/b/v1/list',
            params: params
        })
    },
    getCoupon(params) {
        return get({
            url: constant.host + '/coupon/b/v1/find',
            params: params
        })
    },
    addCoupon(params) {
        return post({
            url: constant.host + '/coupon/b/v1/add',
            data: params
        })
    },
    updateCoupon(params) {
        return post({
            url: constant.host + '/coupon/b/v1/modify',
            data: params
        })
    },
    deleteCoupon(params) {
        return post({
            url: constant.host + '/coupon/b/v1/del',
            data: params
        })
    },
    getCouponSelectors(params) {
        return get({
            url: constant.host + '/coupon/b/v1/selectors',
            params: params
        })
    },

    getOrder(params) {
        return get({
            url: constant.host + '/order/b/v1/find',
            params: params
        })
    },
    updateOrder(params) {
        return post({
            url: constant.host + '/order/b/v1/modify',
            data: params
        })
    },
    getOrderList(params) {
        return get({
            url: constant.host + '/order/b/v1/list',
            params: params
        })
    },
    getOrderDetailListByOrderId(params) {
        return get({
            url: constant.host + '/order-detail/b/v1/list-by-order-id',
            params: params
        })
    },

    getSku(params) {
        return get({
            url: constant.host + '/sku/b/v1/find',
            params: params
        })
    },
    addSku(params) {
        return post({
            url: constant.host + '/sku/b/v1/add',
            data: params
        })
    },
    updateSku(params) {
        return post({
            url: constant.host + '/sku/b/v1/modify',
            data: params
        })
    },
    deleteSku(params) {
        return post({
            url: constant.host + '/sku/b/v1/del',
            data: params
        })
    },


    getSupplierSelectors(params) {
        return get({
            url: constant.host + '/supplier/b/v1/supplier',
            params: params
        })
    },
    getCategorySelectors(params) {
        return get({
            url: constant.host + '/category/b/v1/category',
            params: params
        })
    },
    getChildCategorySelectors(params) {
        return get({
            url: constant.host + '/category/b/v1/child',
            params: params
        })
    },
    getSkuListByProductId(params) {
        return get({
            url: constant.host + '/sku/b/v1/list-by-product-id',
            params: params
        })
    },
    getProductList(params) {
        return get({
            url: constant.host + '/product/b/v1/list',
            params: params
        })
    },
    getProduct(params) {
        return get({
            url: constant.host + '/product/b/v1/find',
            params: params
        })
    },
    addProduct(params) {
        return post({
            url: constant.host + '/product/b/v1/add',
            data: params
        })
    },
    productSelectors(params) {
        return get({
            url: constant.host + '/product/b/v1/selectors',
            params: params
        })
    },
    updateProduct(params) {
        return post({
            url: constant.host + '/product/b/v1/modify',
            data: params
        })
    },
    deleteProduct(params) {
        return post({
            url: constant.host + '/product/b/v1/del',
            data: params
        })
    },


    getBannerList(params) {
        return get({
            url: constant.host + '/banner/b/v1/list',
            params: params
        })
    },
    getBanner(params) {
        return get({
            url: constant.host + '/banner/b/v1/find',
            params: params
        })
    },
    addBanner(params) {
        return post({
            url: constant.host + '/banner/b/v1/add',
            data: params
        })
    },
    updateBanner(params) {
        return post({
            url: constant.host + '/banner/b/v1/modify',
            data: params
        })
    },
    deleteBanner(params) {
        return post({
            url: constant.host + '/banner/b/v1/del',
            data: params
        })
    },


    getSupplierList(params) {
        return get({
            url: constant.host + '/supplier/b/v1/list',
            params: params
        })
    },
    getSupplier(params) {
        return get({
            url: constant.host + '/supplier/b/v1/find',
            params: params
        })
    },
    addSupplier(params) {
        return post({
            url: constant.host + '/supplier/b/v1/add',
            data: params
        })
    },
    updateSupplier(params) {
        return post({
            url: constant.host + '/supplier/b/v1/modify',
            data: params
        })
    },
    deleteSupplier(params) {
        return post({
            url: constant.host + '/supplier/b/v1/del',
            data: params
        })
    },

    getCategoryList(params) {
        return get({
            url: constant.host + '/category/b/v1/list',
            params: params
        })
    },
    getParentCategoryList(params) {
        return get({
            url: constant.host + '/category/b/v1/parent',
            params: params
        })
    },
    getChildCategoryList(params) {
        return get({
            url: constant.host + '/category/f/v1/child-list',
            params: params
        })
    },
    getCategory(params) {
        return get({
            url: constant.host + '/category/b/v1/find',
            params: params
        })
    },
    addCategory(params) {
        return post({
            url: constant.host + '/category/b/v1/add',
            data: params
        })
    },
    updateCategory(params) {
        return post({
            url: constant.host + '/category/b/v1/modify',
            data: params
        })
    },
    deleteCategory(params) {
        return post({
            url: constant.host + '/category/b/v1/del',
            data: params
        })
    },

    getAdminMenuList(params) {
        return get({
            url: constant.host + '/role-menu/b/v1/list',
            params: params
        })
    },
//
    // http://adapter.hubject-hbs.cn/reconciliation
    // 获取cecPartner，初始化下拉框
    cecPartnerSelector(params) {
        return get({
            url: constant.host + '/reconciliation/cecPartner/v1/selectors',
            params: params
        })
    },
    // 加载级联的cpo & emp 账单列表
    handleLoadReconciliationList(params) {
        return post({
            url: constant.host + '/reconciliation/reconciliation/v1/list',
            data: params
        })
    },

    // 获取账单预编辑数据列表
    handleLoadPreEditRecordList(params) {
        return post({
            url: constant.host + '/reconciliation/averageAccount/v1/preEditRecordList',
            data: params
        })
    },

    // 批量添加账单到预编辑数据
    handleBatchAddPreEditRecord(params) {
        return post({
            url: constant.host + '/reconciliation/averageAccount/v1/batchAddPreEditRecord',
            data: params
        })
    },

    //移除预编辑数据记录
    handleDeletePreEditRecord(params) {
        return post({
            url: constant.host + '/reconciliation/averageAccount/v1/delPreEditRecord',
            data: params
        })
    },

    //回滚已修改的预编辑记录
    handleRollbackPreEditRecord(params) {
        return post({
            url: constant.host + '/reconciliation/averageAccount/v1/rollbackPreEditRecord',
            data: params
        })
    },

    //回滚已平账的记录
    handleRollbackSubmitRecord(params) {
        return post({
            url: constant.host + '/reconciliation/averageAccount/v1/rollbackSubmitRecord',
            data: params
        })
    },

    //按比例划分三方责任金
    handleDivideDifferenceMoney(params) {
        return post({
            url: constant.host + '/reconciliation/averageAccount/v1/divideDifferenceMoney',
            data: params
        })
    },

    //编辑预编辑数据的备注
    handleEditPreEditRecordRemark(params) {
        return post({
            url: constant.host + '/reconciliation/averageAccount/v1/preEditRecordModify',
            data: params
        })
    },

    //查询结账账单历史
    handleLoadSettlementHistory(params) {
        return post({
            url: constant.host + '/reconciliation/settlementHistory/v1/list',
            data: params
        })
    },

    // 平账
    handleSubmitPreEditRecord(params) {
        return post({
            url: constant.host + '/reconciliation/averageAccount/v1/submitPreEditRecord',
            data: params
        })
    },

    handleLoadSubmitRecordList(params) {
        return get({
            url: constant.host + '/reconciliation/averageAccount/v1/submitRecordList',
            params: params
        })
    },

    //查询预编辑记录详情
    handleLoadPreEditRecordById(params) {
        return get({
            url: constant.host + '/reconciliation/averageAccount/v1/findPreEditRecord',
            params: params
        })
    },

    //查询坏账
    handleLoadBadAccount(params) {
        return post({
            url: constant.host + '/reconciliation/badDebt/v1/query',
            data: params
        })
    },

    //将坏账添加到预编辑
    handleFixBadDebt(params) {
        return post({
            url: constant.host + '/reconciliation/badDebt/v1/fix',
            data: params
        })
    },

    //管理员登陆
    adminLogin(params) {
        return post({
            url: constant.host + '/admin/b/v1/login',
            data: params
        })
    },

    //加载邮件接受人下拉框
    recipientSelector(params) {
        return get({
            url: constant.host + '/reconciliation/admin/v1/selectors',
            params: params
        })
    },

    // 异步推送excel到指定邮箱
    handleDownloadExcel(params) {
        return post({
            url: constant.host + '/reconciliation/reconciliation/v1/download',
            data: params
        })
    },

    // 提交工单 createSettleWorkOrder
    createSettleWorkOrder(params) {
        return post({
            url: constant.host + '/reconciliation/workOrder/v1/create',
            data: params
        })
    },

    //加载邮件接受人下拉框
    workOrderList(params) {
        return get({
            url: constant.host + '/reconciliation/workOrder/v1/list',
            params: params
        })
    },

    //审核
    handle2Review(params) {
        return post({
            url: constant.host + '/reconciliation/reviewWorkOrder/v1/confirm',
            data: params
        })
    },

    //预览附件
    previewFile(params) {
        return post({
            url: constant.host + '/reconciliation/reviewWorkOrder/v1/preview',
            data: params
        })
    },

    //结账划款
    pay(params) {
        return post({
            url: constant.host + '/reconciliation/workOrder/v1/settlement',
            data: params
        })
    },

    // 已结算明细下载
    historyDetailDownload(params) {
        return post({
            url: constant.host + '/reconciliation/settlementHistory/v1/download',
            data: params
        })
    },

    // 资金往来查询
    financialDealings(params) {
        return post({
            url: constant.host + '/reconciliation/data-clear/v1/financial-dealings',
            data: params
        })
    },

    // 清分问题账单列表
    dataClearList(params) {
        return post({
            url: constant.host + '/reconciliation/data-clear/v1/list',
            data: params
        })
    },

    // 清分问题账单列表
    skipData(params) {
        return post({
            url: constant.host + '/reconciliation/data-clear/v1/skip',
            data: params
        })
    },

    // 校验token是否可用
    checkToken(params) {
        return get({
            url: constant.host + '/reconciliation/charging/detail-loging',
            params: params
        })
    },

    test(params) {
        return post({
            url: 'http://101.133.170.13:8888/test',
            data: params
        })
    }
};

export default server
