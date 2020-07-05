import {get, post} from './http'

import constant from '../common/constant'

const server = {
    printOrder(params) {
        return post({
            url: constant.host + '/order/b/v1/print',
            data: params
        })
    },
    feedbackList(params) {
        return get({
            url: constant.host + '/feedback/b/v1/list',
            params: params
        })
    },
    dispatchCoupon(params) {
        return post({
            url: constant.host + '/customer/b/v1/dispatch-coupon',
            data: params
        })
    },
    modifyBalance(params) {
        return post({
            url: constant.host + '/customer/b/v1/modify-balance',
            data: params
        })
    },
    getInstructionManualList(params) {
        return get({
            url: constant.host + '/instruction-manual/b/v1/list',
            params: params
        })
    },
    getInstructionManual(params) {
        return get({
            url: constant.host + '/instruction-manual/b/v1/find',
            params: params
        })
    },
    addInstructionManual(params) {
        return post({
            url: constant.host + '/instruction-manual/b/v1/add',
            data: params
        })
    },
    updateInstructionManual(params) {
        return post({
            url: constant.host + '/instruction-manual/b/v1/modify',
            data: params
        })
    },
    deleteInstructionManual(params) {
        return post({
            url: constant.host + '/instruction-manual/b/v1/del',
            data: params
        })
    },

    updateStock(params) {
        return post({
            url: constant.host + '/sku/b/v1/update-stock',
            data: params
        })
    },
    applyTOrder(params) {
        return post({
            url: constant.host + '/t-order/b/v1/apply',
            data: params
        })
    },
    getTLogList(params) {
        return get({
            url: constant.host + '/t-log/b/v1/list',
            params: params
        })
    },
    getTOrderDetailList(params) {
        return get({
            url: constant.host + '/t-order-detail/b/v1/list',
            params: params
        })
    },
    getTOrderList(params) {
        return get({
            url: constant.host + '/t-order/b/v1/list',
            params: params
        })
    },
    createTOrder(params) {
        return post({
            url: constant.host + '/t-order/b/v1/create',
            data: params
        })
    },
    getTCartList(params) {
        return get({
            url: constant.host + '/t-cart/b/v1/my',
            params: params
        })
    },
    delTCart(params) {
        return post({
            url: constant.host + '/t-cart/b/v1/del',
            data: params
        })
    },
    changeTCart(params) {
        return post({
            url: constant.host + '/t-cart/b/v1/change',
            data: params
        })
    },
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
        return post({
            url: constant.host + '/order/b/v1/list',
            data: params
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
    adminSelector(params) {
        return get({
            url: constant.host + '/admin/b/v1/selectors',
            params: params
        })
    },

    //管理员登陆
    adminLogin(params) {
        return post({
            url: constant.host + '/admin/b/v1/login',
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
