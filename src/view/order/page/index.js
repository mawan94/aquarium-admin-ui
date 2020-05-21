import React from 'react'
import {Button, Modal, Table, Tag} from 'antd';

import MyTable from '../../../component/MyTable'
import api from '../../../common/api'
import MyImg from "../../../component/MyImg";
import constant from "../../../common/constant";

const confirm = Modal.confirm;

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
        api.getOrderList({pageIndex, pageSize}).then(res => {
            let {records, total} = res.data;
            this.setState({total, data: records})
        })
    };

    render() {
        let columns = [{
            title: '订单编号',
            dataIndex: 'orderId',
            key: 'orderId',
        }, {
            title: '客户编号',
            dataIndex: 'userId',
            key: 'userId',
        }, {
            title: '订单状态',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
        }, {
            title: '支付方式',
            dataIndex: 'payType',
            key: 'payType',
        }, {
            title: '订单金额',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        }, {
            title: '实际付款金额',
            dataIndex: 'actualPay',
            key: 'actualPay',
        }, {
            title: '客户备注',
            dataIndex: 'customerRemark',
            key: 'customerRemark',
        }, {
            title: '物流单号',
            dataIndex: 'logisticsNumber',
            key: 'logisticsNumber',
        },
            {
                title: '操作', dataIndex: '', key: 'x', render: (record) => {
                    return (
                        <div>
                            <div>
                                <Button type="dashed" onClick={() => {
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
                                                              productId={record.orderId}/>}  //级联列表效果切换 注释取消
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
        this.handleLoadInnerList(this.props.orderId)
    }

    handleLoadInnerList = (productId) => {
        api.getOrderDetailListByOrderId({productId}).then(res => {
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
        const columns = [
            // {
            //     title: '商品编号',
            //     dataIndex: 'productId',
            //     key: 'productId',
            // },
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
                key: 'productImg'
            }, {
                title: '买入价格类别',
                dataIndex: 'priceType',
                key: 'priceType'
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
        />
    }
}
