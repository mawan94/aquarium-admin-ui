import React, {Component} from 'react'
import {message, Table, Button, Collapse, Modal, Input, Row, Col, InputNumber, Tag, Steps} from 'antd';

import MyForm from '../../../component/MyForm'
import FORM_ITEM_TYPE from '../../../common/formItemType'
import api from '../../../common/api'

export default class Index extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        // cpo & emp 下拉框
        cecPartner: {
            cpoList: [],
            empList: []
        },
        // 表单条件
        condition: {},

        // 加载效果
        loading: false,

        // 数据列表
        data: [],
    }

    componentDidMount() {
        // 加载下拉框数据
        this.handleInitSelector();
    }

    // 加载下拉框数据
    handleInitSelector = () => {
        api.cecPartnerSelector().then(res => {
            this.setState({cecPartner: res.data})
        }).finally(() => {
            this.setState({loading: false})
        });
    };

    handleSearch = () => {
        this.setState({loading: true})
        api.dataClearList(this.state.condition).then(res => {
            this.setState({data: res.data.list})
        }).finally(() => {
            this.setState({loading: false})
        })
    }

    handleSkip = (record) => {
        this.setState({loading: true})
        api.skipData(record).then(res => {

        })
            .finally(() => {
                this.setState({loading: false})
            })
    }


    render() {
        const columns = [
            {
                title: '订单号',
                dataIndex: 'orderId',
                key: 'orderId',
                fixed: 'left',
                width: '200px'
            },

            {
                title: '充电开始响应',
                children: [
                    // {
                    //     title: 'startChargeSeqStat',
                    //     dataIndex: 'queryStartChargeResp.startChargeSeqStat',
                    // },
                    {
                        title: '状态',
                        dataIndex: 'queryStartChargeResp.succStat',
                    },
                    {
                        title: '失败原因',
                        dataIndex: 'queryStartChargeResp.failReason',
                    }
                ],
            },
            {
                title: '充电开始通知',
                children: [
                    // {
                    //     title: 'startChargeSeqStat',
                    //     dataIndex: 'notificationStartChargeResultRqst.startChargeSeqStat',
                    //
                    // },
                    {
                        title: '开始时间',
                        dataIndex: 'notificationStartChargeResultRqst.startTime',
                    },
                    {
                        title: '识别码',
                        dataIndex: 'notificationStartChargeResultRqst.identCode',
                    },
                ],
            },
            {
                title: '充电结束响应',
                children: [
                    // {
                    //     title: 'startChargeSeqStat',
                    //     dataIndex: 'queryStopChargeResp.startChargeSeqStat',
                    // },
                    {
                        title: '状态',
                        dataIndex: 'queryStopChargeResp.succStat',
                    },
                    {
                        title: '失败原因',
                        dataIndex: 'queryStopChargeResp.failReason',
                    },
                ],
            },
            {
                title: '充电结束通知',
                children: [
                    // {
                    //     title: 'startChargeSeqStat',
                    //     dataIndex: 'notificationStopChargeResultRqst.startChargeSeqStat',
                    // },
                    {
                        title: '状态',
                        dataIndex: 'notificationStopChargeResultRqst.succStat',
                    },
                    {
                        title: '失败原因',
                        dataIndex: 'notificationStopChargeResultRqst.failReason',
                    },
                ],
            },
            {
                title: 'Action',
                render: (_, record) => {
                    return (
                        <div>
                            <Button onClick={() => this.handleSkip(record)}>{record.skip ? 'cancel' : 'skip'}</Button>
                        </div>
                    )
                }
            },
        ];
        return (
            <div>
                <MyForm _this={this} onRowDisplayNum={3} bindName={'condition'} fields={
                    [
                        {
                            fieldType: FORM_ITEM_TYPE.SELECT,
                            labelName: 'CPO',
                            fieldName: 'cpoId',
                            optionList: this.state.cecPartner.cpoList
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.SELECT,
                            labelName: 'EMP',
                            fieldName: 'empId',
                            optionList: this.state.cecPartner.empList
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.RANGE_PICKER,
                            labelName: '日期',
                            fieldName: 'dateRange'
                        }
                    ]}
                        buttonList={[
                            {
                                type: "primary", text: '搜索', callback: () => {
                                    this.handleSearch()
                                }
                            }
                        ]}/>
                <Table
                    loading={this.state.loading}
                    scroll={{x: '100%'}}
                    bordered={true}
                    dataSource={this.state.data}
                    rowKey={record => record.orderId}
                    columns={columns}/>
            </div>
        )
    }
}
