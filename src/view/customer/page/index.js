import React from 'react'
import {Button, Modal, Tabs, Tag, Select, message, InputNumber} from 'antd';

import MyTable from '../../../component/MyTable'
import api from '../../../common/api'
import MyImg from "../../../component/MyImg";
import moment from "moment";
import FORM_ITEM_TYPE from "../../../common/formItemType";
import MyForm from "../../../component/MyForm";
import storage from "../../../common/storage";

const confirm = Modal.confirm;
const {TabPane} = Tabs;
// 优惠券使用限制
const COUPON_USE_LIMIT = {
    1: '余额',
    2: '无限制',
}
// 优惠券使用状态
const COUPON_USE_TYPE = {
    1: '未使用',
    2: '已使用',
    3: '过期',
}

// 支付方式
const PAY_TYPE = {
    1: '支付宝',
    2: '微信',
    3: '门店线下',
    4: '余额',
    5: '其他',
}

// 订单类型
const ORDER_TYPE = {
    1: '常规单',
    2: '团购',
    3: '秒杀',
}

// 配送方式
const TAKE_TYPE = {
    1: '送货上门',
    2: '到店自提',
}

// 订单状态
const ORDER_STATUS = {
    1: '待付款',
    2: '已付款',
    3: '待发货',
    4: '配送中',
    5: '交易完成',
    6: '已退款',
    7: '超时',
}
export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentProcessCustomerId: '',
            currentProcessCouponId: '',
            currentProcessBalance: '',

            balanceModalVisible: false,
            couponModalVisible: false,
            couponList: [],
            data: [],
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            // 表单条件
            condition: {},

            customerId: '',
            nickName: '',
            key: 'browseHistory',


            browseHistory: {
                data: [],
                pageIndex: 1,
                pageSize: 10,
                total: 0
            },
            cart: {
                data: [],
                pageIndex: 1,
                pageSize: 10,
                total: 0
            },
            coupon: {
                data: [],
                pageIndex: 1,
                pageSize: 10,
                total: 0
            },
            rechargeRecord: {
                data: [],
                pageIndex: 1,
                pageSize: 10,
                total: 0
            },
            receiveAddress: {
                data: [],
                pageIndex: 1,
                pageSize: 10,
                total: 0
            },
            order: {
                data: [],
                pageIndex: 1,
                pageSize: 10,
                total: 0
            }
        }
    }


    // 钩子函数 頁面渲染完成时
    componentDidMount() {
        this.handleLoadCouponSelectors()
        this.handleSearch(this.state.pageIndex, this.state.pageSize);
    }

    handleLoadCouponSelectors = () => {
        api.getCouponSelectors().then(res => {
            this.setState({couponList: res.data})
        })
    }

    handleSearch = (pageIndex, pageSize) => {
        api.getCustomerList({...this.state.condition, pageIndex, pageSize}).then(res => {
            let {records, total} = res.data;
            this.setState({total, pageIndex, pageSize, data: records})
        })
        this.callback(this.state.key)
    };

    showModal = (type) => {
        if (type == 'balance') {
            this.setState({
                balanceModalVisible: true,
            });
        } else if (type == 'coupon') {
            this.setState({
                couponModalVisible: true,
            });
        }
    };
    handleOk = type => {
        console.log(type);
        let {currentProcessCustomerId, currentProcessCouponId, currentProcessBalance, pageIndex, pageSize} = this.state;
        if (type == 'balance' && currentProcessBalance) {
            api.modifyBalance({customerId: currentProcessCustomerId, balance: currentProcessBalance}).then(res => {
                if (res.data) {
                    message.success('操作成功')
                    this.handleSearch(pageIndex, pageSize)
                }
            })
        } else if (type == 'coupon' && currentProcessCouponId) {
            api.dispatchCoupon({
                customerId: currentProcessCustomerId,
                couponId: currentProcessCouponId
            }).then(res => {
                if (res.data) {
                    message.success('操作成功')
                    this.handleSearch(pageIndex, pageSize)
                }
            })
        }
        this.setState({
            balanceModalVisible: false,
            couponModalVisible: false,
            currentProcessCustomerId: '',
            currentProcessCouponId: '',
            currentProcessBalance: '',
        });
    };
    handleCancel = e => {
        console.log('handleCancel');
        this.setState({
            balanceModalVisible: false,
            couponModalVisible: false,
            currentProcessCustomerId: '',
            currentProcessCouponId: '',
            currentProcessBalance: '',
        });
    };

    callback = (key) => {
        this.setState({key: key})
        if (key === 'browseHistory') {
            this.handleSearchBrowseHistory(this.state.browseHistory.pageIndex, this.state.browseHistory.pageSize)
        } else if (key === 'cart') {
            this.handleSearchCart(this.state.cart.pageIndex, this.state.cart.pageSize)
        } else if (key === 'coupon') {
            this.handleSearchCoupon(this.state.coupon.pageIndex, this.state.coupon.pageSize)
        } else if (key === 'rechargeRecord') {
            this.handleSearchRechargeRecord(this.state.rechargeRecord.pageIndex, this.state.rechargeRecord.pageSize)
        } else if (key === 'receiveAddress') {
            this.handleSearchReceiveAddress(this.state.receiveAddress.pageIndex, this.state.receiveAddress.pageSize)
        } else if (key === 'order') {
            this.handleSearchOrder(this.state.order.pageIndex, this.state.order.pageSize)
        }
    }

    //-------------------------------------------------------------------------------------------------------------------
    handleSearchBrowseHistory = (pageIndex, pageSize) => {
        if (this.state.customerId) {
            api.getCustomerBrowseHistoryList({pageIndex, pageSize, customerId: this.state.customerId}).then(res => {
                let {records, total} = res.data;
                let {browseHistory} = this.state
                browseHistory.total = total
                browseHistory.data = records
                browseHistory.pageIndex = pageIndex
                browseHistory.pageSize = pageSize
                this.setState({browseHistory})
            })
        }
    };

    //-------------------------------------------------------------------------------------------------------------------
    handleSearchCart = (pageIndex, pageSize) => {
        if (this.state.customerId) {
            api.getCustomerCartList({pageIndex, pageSize, customerId: this.state.customerId}).then(res => {
                let {records, total} = res.data;
                let {cart} = this.state
                cart.total = total
                cart.data = records
                cart.pageIndex = pageIndex
                cart.pageSize = pageSize
                this.setState({cart})
            })
        }
    };
    //-------------------------------------------------------------------------------------------------------------------
    handleSearchCoupon = (pageIndex, pageSize) => {
        if (this.state.customerId) {
            api.getCustomerCouponList({pageIndex, pageSize, customerId: this.state.customerId}).then(res => {
                let {records, total} = res.data;
                let {coupon} = this.state
                coupon.total = total
                coupon.data = records
                coupon.pageIndex = pageIndex
                coupon.pageSize = pageSize
                this.setState({coupon})
            })
        }
    };
    //-------------------------------------------------------------------------------------------------------------------
    handleSearchRechargeRecord = (pageIndex, pageSize) => {
        if (this.state.customerId) {
            api.getCustomerRechargeRecordList({
                pageIndex,
                pageSize,
                customerId: this.state.customerId
            }).then(res => {
                let {records, total} = res.data;
                let {rechargeRecord} = this.state
                rechargeRecord.total = total
                rechargeRecord.data = records
                rechargeRecord.pageIndex = pageIndex
                rechargeRecord.pageSize = pageSize
                this.setState({rechargeRecord})
            })
        }
    };
    //-------------------------------------------------------------------------------------------------------------------
    handleSearchReceiveAddress = (pageIndex, pageSize) => {
        if (this.state.customerId) {
            api.getCustomerReceiveAddressList({
                pageIndex,
                pageSize,
                customerId: this.state.customerId
            }).then(res => {
                let {records, total} = res.data;
                let {receiveAddress} = this.state
                receiveAddress.total = total
                receiveAddress.data = records
                receiveAddress.pageIndex = pageIndex
                receiveAddress.pageSize = pageSize
                this.setState({receiveAddress})
            })
        }
    };
//-------------------------------------------------------------------------------------------------------------------
    handleSearchOrder = (pageIndex, pageSize) => {
        if (this.state.customerId) {
            api.getCustomerOrderList({pageIndex, pageSize, customerId: this.state.customerId}).then(res => {
                let {records, total} = res.data;
                let {order} = this.state
                order.total = total
                order.data = records
                order.pageIndex = pageIndex
                order.pageSize = pageSize
                this.setState({order})
            })
        }
    };

    render() {
        let columns = [{
            title: '客户编号',
            dataIndex: 'customerId',
            key: 'customerId',
        }, {
            title: '昵称',
            dataIndex: 'nickName',
            key: 'nickName',
        }, {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            render: text => {
                if (text == 1) {
                    return '男'
                } else if (text == 2) {
                    return '女'
                } else {
                    return '未知'
                }
            }
        }, {
            title: '头像',
            dataIndex: 'avatarUrl',
            key: 'avatarUrl',
            render: text => <MyImg src={text}/>
        }, {
            title: '客户类型',
            dataIndex: 'customerType',
            key: 'customerType',
            render: text => {
                if (text == 1) {
                    return '新客户(未下单)'
                } else if (text == 2) {
                    return '老顾客'
                } else {
                    return '未知'
                }
            }
        }, {
            title: '余额',
            dataIndex: 'balance',
            key: 'balance',
        }, {
            title: '积分',
            dataIndex: 'integral',
            key: 'integral',
        }, {
            title: '操作', dataIndex: '', key: 'x', render: (record) => {
                if (!storage.get('userInfo')) {
                    return ''
                }
                return storage.get('userInfo').roleType == 1 ?
                    (
                        <div>
                            <div>
                                <Button type="danger" onClick={() => {
                                    this.setState({
                                        currentProcessCustomerId: record.customerId,
                                        currentProcessBalance: record.balance
                                    })
                                    this.showModal('balance')
                                }}>余额变更</Button>
                            </div>
                            <div>
                                <Button style={{marginTop: "20px"}} type="primary" onClick={() => {
                                    this.setState({currentProcessCustomerId: record.customerId})
                                    this.showModal('coupon')
                                }}>派发优惠券</Button>
                            </div>
                        </div>
                    ) : ''
            }
        }
        ]

        // --------------------------------------------------------------------------------------------
        let browseHistoryColumns = [{
            title: '编号',
            dataIndex: 'browseHistoryId',
            key: 'browseHistoryId',
        }, {
            title: '引用编号',
            dataIndex: 'referenceId',
            key: 'referenceId',
        }, {
            title: '类型',
            dataIndex: 'referenceType',
            key: 'referenceType',
            render: text => {
                if (text === 1) {
                    return <Tag color={'green'}>商品</Tag>
                } else if (text === 2) {
                    return <Tag color={'volcano'}>文章</Tag>
                } else {
                    return <Tag color={'geekblue'}>未知</Tag>
                }
            }
        }, {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '图片',
            dataIndex: 'img',
            key: 'img',
            render: text => <MyImg src={text}/>
        }, {
            title: '浏览时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (text) => {
                return moment(text).format('YYYY-MM-DD HH:mm:ss')
            }
        }];

        //----------------------------------------------------------------------------------------------
        let cartColumns = [{
            title: '编号',
            dataIndex: 'cartId',
            key: 'cartId',
        }, {
            title: '商品名称',
            dataIndex: 'productName',
            key: 'productName',
        }, {
            title: '规格名称',
            dataIndex: 'skuName',
            key: 'skuName',
        }, {
            title: '商品图片',
            dataIndex: 'coverImg',
            key: 'coverImg',
            render: text => <MyImg src={text}/>
        }, {
            title: '规格图片',
            dataIndex: 'skuImg',
            key: 'skuImg',
            render: text => <MyImg src={text}/>
        }, {
            title: '数量',
            dataIndex: 'num',
            key: 'num'
        }, {
            title: '是否选中',
            dataIndex: 'selected',
            key: 'selected',
            render: text => {
                if (text === 1) {
                    return <Tag color={'green'}>是</Tag>
                } else if (text === 2) {
                    return <Tag color={'volcano'}>否</Tag>
                } else {
                    return <Tag color={'geekblue'}>未知</Tag>
                }
            }
        }];

        //----------------------------------------------------------------------------------------------
        let couponColumns = [{
            title: '编号',
            dataIndex: 'customerCouponId',
            key: 'customerCouponId',
        }, {
            title: '优惠券名称',
            dataIndex: 'couponName',
            key: 'couponName',
        }, {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: '抵扣金额',
            dataIndex: 'deduction',
            key: 'deduction'
        }, {
            title: '使用门槛',
            dataIndex: 'priceLimit',
            key: 'priceLimit'
        }, {
            title: '使用限制',
            dataIndex: 'useLimit',
            key: 'useLimit',
            render: text => <span>{COUPON_USE_LIMIT[text]}</span>
        }, {
            title: '使用状态',
            dataIndex: 'status',
            key: 'status',
            render: text => <span>{COUPON_USE_TYPE[text]}</span>
        }, {
            title: '失效时间',
            dataIndex: 'endTime',
            key: 'endTime',
            render: (text) => {
                return moment(text).format('YYYY-MM-DD HH:mm:ss')
            }
        }];
//----------------------------------------------------------------------------------------------
        let rechargeRecordColumns = [{
            title: '编号',
            dataIndex: 'customerRechargeId',
            key: 'customerRechargeId',
        }, {
            title: '充值规则编号',
            dataIndex: 'rechargeRuleId',
            key: 'rechargeRuleId',
            render: text => {
                if (text) return text
                return '自定义充值'
            }
        }, {
            title: '充值金额',
            dataIndex: 'amount',
            key: 'amount',
        }, {
            title: '充值状态',
            dataIndex: 'rechargeStatus',
            key: 'rechargeStatus',
            render: text => {
                if (text === 1) {
                    return <Tag color={'green'}>未支付</Tag>
                } else if (text === 2) {
                    return <Tag color={'volcano'}>已支付</Tag>
                } else {
                    return <Tag color={'geekblue'}>未知</Tag>
                }
            }
        }, {
            title: '付款方式',
            dataIndex: 'payType',
            key: 'payType',
            render: text => <span>{PAY_TYPE[text]}</span>
        }, {
            title: '充值时间',
            dataIndex: 'rechargeTime',
            key: 'rechargeTime',
            render: (text) => {
                return moment(text).format('YYYY-MM-DD HH:mm:ss')
            }
        }];
        //----------------------------------------------------------------------------------------------
        let receiveAddressColumns = [{
            title: '编号',
            dataIndex: 'customerReceiveId',
            key: 'customerReceiveId',
        }, {
            title: '省',
            dataIndex: 'province',
            key: 'province',
        }, {
            title: '市',
            dataIndex: 'city',
            key: 'city',
        }, {
            title: '区/县',
            dataIndex: 'district',
            key: 'district'
        }, {
            title: '地址',
            dataIndex: 'address',
            key: 'address'
        }, {
            title: '楼号门牌',
            dataIndex: 'detailAddress',
            key: 'detailAddress'
        }, {
            title: '收货人',
            dataIndex: 'receiveName',
            key: 'receiveName'
        }, {
            title: '电话',
            dataIndex: 'receiveTel',
            key: 'receiveTel'
        }, {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            render: text => {
                if (text == 1) {
                    return '男'
                } else if (text == 2) {
                    return '女'
                } else {
                    return '未知'
                }
            }
        }];
        //----------------------------------------------------------------------------------------------
        let orderColumns = [{
            title: '编号',
            dataIndex: 'orderId',
            key: 'orderId',
        }, {
            title: '支付方式',
            dataIndex: 'payType',
            key: 'payType',
            render: text => <span>{PAY_TYPE[text]}</span>
        }, {
            title: '订单类型',
            dataIndex: 'orderType',
            key: 'orderType',
            render: text => <span>{ORDER_TYPE[text]}</span>
        }, {
            title: '配送方式',
            dataIndex: 'takeType',
            key: 'takeType',
            render: text => <span>{TAKE_TYPE[text]}</span>
        }, {
            title: '订单状态',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            render: text => <span>{ORDER_STATUS[text]}</span>
        }, {
            title: '实际付款',
            dataIndex: 'actualPay',
            key: 'actualPay'
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (text) => {
                return moment(text).format('YYYY-MM-DD HH:mm:ss')
            }
        }];

        let selectorItemDOM = []
        this.state.couponList.map(item => {
            selectorItemDOM.push(<Select.Option value={item.value}>{item.label}</Select.Option>)
        })

        return (
            <div>
                <MyForm _this={this} onRowDisplayNum={3} bindName={'condition'} fields={
                    [
                        {
                            fieldType: FORM_ITEM_TYPE.INPUT,
                            labelName: '客户编号',
                            fieldName: 'customerId'
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.INPUT,
                            labelName: '昵称',
                            fieldName: 'nickName'
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.SELECT,
                            labelName: '客户类型',
                            fieldName: 'customerType',
                            optionList: [
                                {label: '新客户', value: 1},
                                {label: '老客户', value: 2},
                            ]
                        }
                    ]}
                        buttonList={[
                            {
                                type: "primary", text: '搜索', callback: () => {
                                    this.setState({
                                        pageIndex: 1,
                                        pageSize: 10
                                    })
                                    this.handleSearch(this.state.pageIndex, this.state.pageSize)
                                }
                            }
                        ]}/>
                {/* 列表数据 */}
                <MyTable
                    buttonClick={() => {
                    }}
                    onRow={record => {
                        return {
                            onClick: event => {
                                this.setState({customerId: record.customerId, nickName: record.nickName})
                                // todo fix
                                setTimeout(() => {
                                    if (this.state.key) {
                                        this.callback(this.state.key)
                                    }
                                }, 200)

                            }
                        };
                    }}
                    displayExtra={false}
                    rowKey={record => record.customerId}
                    columns={columns}
                    dataSource={this.state.data}
                    pageIndex={this.state.pageIndex}
                    pageSize={this.state.pageSize}
                    total={this.state.total}
                    handleLoadPage={this.handleSearch}

                />
                <Tabs defaultActiveKey={this.state.key} onChange={this.callback.bind(this)}>
                    <TabPane tab="浏览历史" key="browseHistory">
                        <MyTable
                            buttonClick={() => {
                            }}
                            title={this.state.nickName}
                            displayExtra={false}
                            rowKey={record => record.browseHistoryId}
                            columns={browseHistoryColumns}
                            dataSource={this.state.browseHistory.data}
                            pageIndex={this.state.browseHistory.pageIndex}
                            pageSize={this.state.browseHistory.pageSize}
                            total={this.state.browseHistory.total}
                            handleLoadPage={this.handleSearchBrowseHistory}
                        />
                    </TabPane>
                    <TabPane tab="购物车" key="cart">
                        <MyTable
                            buttonClick={() => {
                            }}
                            title={this.state.nickName}
                            displayExtra={false}
                            rowKey={record => record.cartId}
                            columns={cartColumns}
                            dataSource={this.state.cart.data}
                            pageIndex={this.state.cart.pageIndex}
                            pageSize={this.state.cart.pageSize}
                            total={this.state.cart.total}
                            handleLoadPage={this.handleSearchCart}
                        />
                    </TabPane>
                    <TabPane tab="优惠券" key="coupon">
                        <MyTable
                            buttonClick={() => {
                            }}
                            title={this.state.nickName}
                            displayExtra={false}
                            rowKey={record => record.customerCouponId}
                            columns={couponColumns}
                            dataSource={this.state.coupon.data}
                            pageIndex={this.state.coupon.pageIndex}
                            pageSize={this.state.coupon.pageSize}
                            total={this.state.coupon.total}
                            handleLoadPage={this.handleSearchCoupon}
                        />
                    </TabPane>
                    <TabPane tab="订单" key="order">
                        <MyTable
                            buttonClick={() => {
                            }}
                            title={this.state.nickName}
                            displayExtra={false}
                            rowKey={record => record.orderId}
                            columns={orderColumns}
                            dataSource={this.state.order.data}
                            pageIndex={this.state.order.pageIndex}
                            pageSize={this.state.order.pageSize}
                            total={this.state.order.total}
                            handleLoadPage={this.handleSearchOrder}
                        />
                    </TabPane>
                    <TabPane tab="充值记录" key="rechargeRecord">
                        <MyTable
                            buttonClick={() => {
                            }}
                            title={this.state.nickName}
                            displayExtra={false}
                            rowKey={record => record.customerRechargeId}
                            columns={rechargeRecordColumns}
                            dataSource={this.state.rechargeRecord.data}
                            pageIndex={this.state.rechargeRecord.pageIndex}
                            pageSize={this.state.rechargeRecord.pageSize}
                            total={this.state.rechargeRecord.total}
                            handleLoadPage={this.handleSearchRechargeRecord}
                        />
                    </TabPane>
                    <TabPane tab="收货地址" key="receiveAddress">
                        <MyTable
                            buttonClick={() => {
                            }}
                            title={this.state.nickName}
                            displayExtra={false}
                            rowKey={record => record.customerReceiveId}
                            columns={receiveAddressColumns}
                            dataSource={this.state.receiveAddress.data}
                            pageIndex={this.state.receiveAddress.pageIndex}
                            pageSize={this.state.receiveAddress.pageSize}
                            total={this.state.receiveAddress.total}
                            handleLoadPage={this.handleSearchReceiveAddress}
                        />
                    </TabPane>
                </Tabs>
                <Modal
                    title="余额变更"
                    visible={this.state.balanceModalVisible}
                    onOk={() => {
                        this.handleOk('balance')
                    }}
                    onCancel={this.handleCancel}
                >
                    <InputNumber style={{width: '70%'}} value={this.state.currentProcessBalance}
                                 onChange={(e) => {
                                     this.setState({currentProcessBalance: e})
                                 }}/>
                </Modal>
                <Modal
                    title="派发优惠券"
                    visible={this.state.couponModalVisible}
                    onOk={() => {
                        this.handleOk('coupon')
                    }}
                    onCancel={this.handleCancel}
                >
                    <Select value={this.state.currentProcessCouponId} placeholder={'请选择需要派发的优惠券'} style={{width: '70%'}} onChange={(val) => {
                        this.setState({
                            currentProcessCouponId: val
                        })
                    }}>
                        {selectorItemDOM}
                    </Select>
                </Modal>
            </div>
        )
    }
}

