import React from 'react'
import {Button, Modal, Table} from 'antd';

import MyTable from '../../../component/MyTable'
import api from '../../../common/api'

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
        let _this = this;
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
                        // this.props.history.push('/supplier/add')
                    }}
                    rowKey={record => record.supplierId}
                    columns={columns}
                    dataSource={this.state.data}
                    pageIndex={this.state.pageIndex}
                    pageSize={this.state.pageSize}
                    total={this.state.total}
                    handleLoadPage={this.handleSearch}
                />
            </div>
        )
    }
}
