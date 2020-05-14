import React from 'react'
import {Table, message, Tag, Timeline} from 'antd';
// import { ClockCircleOutline } from '@ant-design/icons';

import MyForm from '../../../component/MyForm'
import FORM_ITEM_TYPE from '../../../common/formItemType'
import api from '../../../common/api'
import constant from "../../../common/constant";
import storage from "../../../common/storage";


export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        // 表单条件
        condition: {},
        // 列表数据
        data: [],
    };

    handleSearch = () => {
        api.financialDealings(this.state.condition).then(res => {
            // console.log(res)
            this.setState({
                // loading: false,
                // total: res.data.total,
                data: res.data
            })
        })
    };


    render() {
        const columns = [
            {
                title: '中金单号',
                dataIndex: 'txSN',
                render: (text, record) => {
                    if (record.displayStyle) {
                        return <span style={{color: 'red'}}>{text}</span>
                    } else {
                        return <span style={{color: 'green'}}>{text}</span>
                    }
                }
            },
            {
                title: '订单编号',
                dataIndex: 'orderNo',
                render: (text, record) => {
                    if (record.displayStyle) {
                        return <span style={{color: 'red'}}>{text}</span>
                    } else {
                        return <span style={{color: 'green'}}>{text}</span>
                    }
                }
            },
            {
                title: '支付方式',
                dataIndex: 'payType',
                render: (text, record) => {
                    const dataMap = {1: 'alipay', 2: 'wechat', 3: 'balance', 4: 'reconciliation'}
                    if (text) {
                        if (record.displayStyle) {
                            return <span style={{color: 'red'}}>{dataMap[text]}</span>
                        } else {
                            return <span style={{color: 'green'}}>{dataMap[text]}</span>
                        }
                    } else {
                        return ''
                    }
                }
            },
            {
                title: '付款方',
                dataIndex: 'payerUserId',
                render: (text, record) => {
                    if (record.displayStyle) {
                        return <span style={{color: 'red'}}>{text}</span>
                    } else {
                        return <span style={{color: 'green'}}>{text}</span>
                    }
                }
            },
            {
                title: '金额',
                dataIndex: 'amount',
                render: (text, record) => {
                    if (record.displayStyle) {
                        return <span style={{color: 'red'}}>{text}</span>
                    } else {
                        return <span style={{color: 'green'}}>{text}</span>
                    }
                }
            },
            {
                title: '收款方',
                dataIndex: 'payeeUserId',
                render: (text, record) => {
                    if (record.displayStyle) {
                        return <span style={{color: 'red'}}>{text}</span>
                    } else {
                        return <span style={{color: 'green'}}>{text}</span>
                    }
                }
            },
            {
                title: '日期',
                dataIndex: 'date',
                render: (text, record) => {
                    if (record.displayStyle) {
                        return <span style={{color: 'red'}}>{text}</span>
                    } else {
                        return <span style={{color: 'green'}}>{text}</span>
                    }
                }
            },
        ];

        return (
            <>
                <MyForm _this={this} onRowDisplayNum={3} bindName={'condition'} fields={
                    [
                        {
                            fieldType: FORM_ITEM_TYPE.RANGE_PICKER,
                            labelName: '日期',
                            fieldName: 'dateRange'
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.INPUT,
                            labelName: '订单号',
                            fieldName: 'orderNo',
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.INPUT,
                            labelName: '账户编号',
                            fieldName: 'userId',
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.SELECT,
                            required: true,
                            labelName: '类型',
                            fieldName: 'type',
                            optionList: [{label: '入账', value: 1}, {label: '出账', value: 2}, {label: '全部', value: 3}]
                        }
                    ]}
                        buttonList={[
                            {
                                type: "primary", text: '搜索', callback: () => {
                                    this.handleSearch()
                                }, verifyCondition: true,
                            }
                        ]}/>
                <Table rowKey={record => record.id} columns={columns}
                       dataSource={this.state.data} loading-={this.state.loading}/>
            </>
        )
    }


}
