import {get, post} from './http'

import constant from '../common/constant'

const server = {
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
            url: constant.host + '/category/b/v1/parentCategory',
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
