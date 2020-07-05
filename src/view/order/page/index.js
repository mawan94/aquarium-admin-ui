import React from 'react'
import {Button, Modal, Table, Tag, Descriptions, message} from 'antd';

import MyTable from '../../../component/MyTable'
import api from '../../../common/api'
import MyImg from "../../../component/MyImg";
import constant from "../../../common/constant";
import moment from "moment";
import text from "react-tmap/src/canvas/draw/text";
import FORM_ITEM_TYPE from "../../../common/formItemType";
import MyForm from "../../../component/MyForm";

const confirm = Modal.confirm;
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
            // 表单条件
            condition: {},

            data: [],
            pageIndex: 1,
            pageSize: 10,
            total: 0,
        }
    }

    // 钩子函数 頁面渲染完成时
    componentDidMount() {
        this.handleSearch(this.state.pageIndex, this.state.pageSize);
    }


    handleSearch = (pageIndex, pageSize) => {
        api.getOrderList({...this.state.condition, pageIndex, pageSize}).then(res => {
            let {records, total} = res.data;
            this.setState({total, pageIndex, pageSize, data: records})
        })
    };

    render() {
        let columns = [{
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
        },
            {
                title: '包装费',
                dataIndex: 'packagingFee',
                key: 'packagingFee'
            }, {
                title: '服务费',
                dataIndex: 'serviceFee',
                key: 'serviceFee'
            }, {
                title: '配送费',
                dataIndex: 'deliveryFee',
                key: 'deliveryFee'
            }, {
                title: '商品总价',
                dataIndex: 'productTotalPrice',
                key: 'productTotalPrice'
            }, {
                title: '优惠券',
                dataIndex: 'customerCouponId',
                key: 'customerCouponId',
                render: (text, record) => {
                    if (record.customerCouponInfo) {
                        return `-${record.customerCouponInfo.deduction}`
                    } else {
                        return text
                    }
                }
            },
            {
                title: '实际付款',
                dataIndex: 'actualPay',
                key: 'actualPay'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                render: (text) => {
                    return moment(text).format('YYYY-MM-DD HH:mm:ss')
                }
            },
            {
                title: '操作', dataIndex: '', key: 'x', render: (record) => {
                    return (
                        <div>
                            <div>
                                <Button type="primary" onClick={() => {
                                    console.log(record.orderId)
                                    api.printOrder({orderId: record.orderId}).then(res => {
                                        message.success('打印成功！')
                                    })
                                }}>打印</Button>
                            </div>

                            <div>
                                <Button style={{marginTop: "20px"}} type="dashed" onClick={() => {
                                    this.props.history.push('/order/edit/' + record.orderId)
                                }}>编辑</Button>
                            </div>
                        </div>
                    )
                }
            }
        ]
        return (
            <div>
                <MyForm _this={this} onRowDisplayNum={3} bindName={'condition'} fields={
                    [
                        {
                            fieldType: FORM_ITEM_TYPE.INPUT,
                            labelName: '订单编号',
                            fieldName: 'orderId'
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.INPUT,
                            labelName: '客户编号',
                            fieldName: 'customerId'
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.SELECT,
                            labelName: '配送方式',
                            fieldName: 'takeType',
                            optionList: [
                                {label: '送货上门', value: 1},
                                {label: '到店自取', value: 2},
                            ]
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.INPUT,
                            labelName: '收件人',
                            fieldName: 'customerReceiveName'
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.INPUT,
                            labelName: '收件人电话',
                            fieldName: 'customerReceiveTel'
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.SELECT,
                            labelName: '订单状态',
                            fieldName: 'orderStatus',
                            optionList: [
                                {label: '待付款', value: 1},
                                {label: '已付款', value: 2},
                                {label: '待发货', value: 3},
                                {label: '配送中', value: 4},
                                {label: '交易完成', value: 5},
                                {label: '已退款', value: 6},
                                {label: '超时', value: 7},
                            ]
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.RANGE_PICKER1,
                            labelName: '下单时间',
                            fieldName: 'createTime'
                        },
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
                    rowKey={record => record.orderId}
                    columns={columns}
                    dataSource={this.state.data}
                    pageIndex={this.state.pageIndex}
                    pageSize={this.state.pageSize}
                    total={this.state.total}
                    handleLoadPage={this.handleSearch}
                    expandedRowRender={(record) => <InnerList that={this}
                                                              order={record}/>}  //级联列表效果切换 注释取消
                />
            </div>
        )
    }
}


class InnerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        this.handleLoadInnerList(this.props.order.orderId)
    }

    handleLoadInnerList = (orderId) => {
        api.getOrderDetailListByOrderId({orderId}).then(res => {
            if (res.data) {
                res.data.map((item, index) => {
                    item.key = index
                });
            }
            this.setState({
                list: res.data
            });
        })
    }

    render() {
        let order = this.props.order;
        console.error(order)
        const columns = [
            {
                title: '商品编号',
                dataIndex: 'productId',
                key: 'productId',
            },
            {
                title: '商品名称',
                dataIndex: 'productName',
                key: 'productName',

            }, {
                title: '规格型号',
                dataIndex: 'skuName',
                key: 'skuName',
            }, {
                title: '商品图片',
                dataIndex: 'productImg',
                key: 'productImg',
                render: text => <MyImg src={text}/>
            }, {
                title: '单价',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: '购买数量',
                dataIndex: 'buyNum',
                key: 'buyNum'
            },
            {
                title: '小计',
                dataIndex: 'subtotal',
                key: 'subtotal',
            }
        ];

        return <Table
            rowKey={record => record.orderDetailId}
            columns={columns}
            dataSource={this.state.list}
            pagination={false}
            title={() => {
                return order.customerReceiveId ? <Descriptions title="买家信息">
                        <Descriptions.Item label="微信昵称">{order.customerInfo.nickName}</Descriptions.Item>
                        <Descriptions.Item
                            label="收件人">{order.customerReceiveId ? order.customerReceiveName : ''}</Descriptions.Item>
                        <Descriptions.Item
                            label="电话">{order.customerReceiveId ? order.customerReceiveTel : ''}</Descriptions.Item>
                        <Descriptions.Item label="物流单号">{order.logisticsId}</Descriptions.Item>
                        <Descriptions.Item label="备注">{order.customerRemark}</Descriptions.Item>
                        <Descriptions.Item
                            label="地址">{order.customerReceiveId ? order.customerReceiveAddress : ''}</Descriptions.Item>
                    </Descriptions> :
                    <Descriptions title="买家信息">
                        <Descriptions.Item label="微信昵称">{order.customerInfo.nickName}</Descriptions.Item>
                        <Descriptions.Item label="绑定手机">{order.customerInfo.tel}</Descriptions.Item>
                        <Descriptions.Item label="备注">{order.customerRemark}</Descriptions.Item>
                    </Descriptions>
            }
            }
        />
    }
}
