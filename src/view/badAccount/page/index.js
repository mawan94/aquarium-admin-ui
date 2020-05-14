import React from 'react'
import {Tabs, Table, Divider, Tag, Button, Pagination, DatePicker, Select, Input, Card} from 'antd';

import MyForm from '../../../component/MyForm'
import FORM_ITEM_TYPE from '../../../common/formItemType'
import api from '../../../common/api'

const {TabPane} = Tabs;

const cpoBadAccountColumn = [
    {
        title: 'CPO Operator Name',
        dataIndex: 'cpoOperatorName'
    },
    {
        title: 'EMP Operator Name',
        dataIndex: 'empOperatorName'
    },
    {
        title: '订单金额',
        dataIndex: 'totalMoney',
        // sorter: (a, b) => a.chargeOrderInfo.totalMoney - b.chargeOrderInfo.totalMoney,
        // render: text => {
        //     return <span style={{color: '#ff0033'}}>{text}</span>
        // }
    },
    {
        title: '耗电',
        dataIndex: 'totalPower'
    },
    {
        title: '充电站ID',
        dataIndex: 'stationId',
    },
    {
        title: '充电枪ID',
        dataIndex: 'connectorId',
    },
    {
        title: '订单ID',
        dataIndex: 'orderId',
    },
    {
        title: '充电开始时间',
        dataIndex: 'startTime',
    },
    {
        title: '充电结束时间',
        dataIndex: 'endTime',
    }
];

const empBadAccountColumn = [
    {
        title: 'OperatorID',
        dataIndex: 'operatorId'
    },
    {
        title: '订单金额',
        dataIndex: 'totalMoney',
        // sorter: (a, b) => a.chargeOrderInfo.totalMoney - b.chargeOrderInfo.totalMoney,
        // render: text => {
        //     return <span style={{color: '#ff0033'}}>{text}</span>
        // }
    },
    {
        title: '耗电',
        dataIndex: 'totalPower'
    },
    {
        title: '充电站ID',
        dataIndex: 'stationId',
    },
    {
        title: '充电枪ID',
        dataIndex: 'connectorId',
    },
    {
        title: '订单ID',
        dataIndex: 'orderId',
    },
    {
        title: '用户ID',
        dataIndex: 'userId',
    },
    {
        title: '充电开始时间',
        dataIndex: 'startTime',
    },
    {
        title: '充电结束时间',
        dataIndex: 'endTime',
    }
];

export default class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        cecPartner: {
            cpoList: [],
            empList: []
        },
        status: 1,
        condition_cpo: {},
        condition_emp: {},
        cpoBaseWrapper: {
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            list: [],
        },
        empBaseWrapper: {
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            list: [],
        },
        selectedRowKeys: [],
        cpoSelectedRowKeys: [],
        empSelectedRowKeys: []
    };

    componentDidMount() {
        // 加载下拉框数据
        this.handleInitSelector();
    };

    // 加载下拉框数据
    handleInitSelector = () => {
        api.cecPartnerSelector().then(res => {
            this.setState({cecPartner: res.data})
        });
    };

    // 页面搜索
    handleSearch = (page, pageSize, tab) => {
        this.setState({loading: true});
        // 组装参数
        let requestParams = {};
        let {condition_cpo, condition_emp, cpoBaseWrapper, empBaseWrapper, status} = this.state;
        requestParams.status = status;
        requestParams.pageIndex = page;
        requestParams.pageSize = pageSize;

        if (tab === 'cpo') {
            cpoBaseWrapper.pageIndex = page;
            cpoBaseWrapper.pageSize = pageSize;
            Object.assign(requestParams, condition_cpo);
        } else if (tab === 'emp') {
            empBaseWrapper.pageIndex = page;
            empBaseWrapper.pageSize = pageSize;
            Object.assign(requestParams, condition_emp);
        }

        api.handleLoadBadAccount(requestParams).then(res => {
            let {list, total} = res.data;
            if (tab === 'cpo') {
                cpoBaseWrapper.list = list;
                cpoBaseWrapper.total = total;
            } else if (tab === 'emp') {
                empBaseWrapper.list = list;
                empBaseWrapper.total = total;
            }
            this.setState({
                cpoBaseWrapper,
                empBaseWrapper,
            })
        }).finally(() => {
            this.setState({loading: false})
        });
    };

    // 修复坏账
    handleFixBadOrder = (type) => {
        this.setState({loading: true});
        let {cpoSelectedRowKeys, empSelectedRowKeys, status, cpoBaseWrapper, empBaseWrapper} = this.state;
        let param = {};
        param.type = status;
        if (type === 'cpo') {
            param.orderIds = cpoSelectedRowKeys;
        } else if (type === 'emp') {
            param.orderIds = empSelectedRowKeys;
        }

        api.handleFixBadDebt(param).then(res => {
            this.setState({
                cpoSelectedRowKeys: [],
                empSelectedRowKeys: []
            });
            this.handleSearch(type === 'cpo' ? cpoBaseWrapper.pageIndex : empBaseWrapper.pageIndex, type === 'cpo' ? cpoBaseWrapper.pageSize : empBaseWrapper.pageSize, type)
        }).finally(() => {
            this.setState({loading: false})
        });
    };


    onSelectChange = (selectedRowKeys, type) => {
        if (type === 'cpo') {
            this.setState({
                cpoSelectedRowKeys: selectedRowKeys
            });
        } else if (type === 'emp') {
            this.setState({
                empSelectedRowKeys: selectedRowKeys
            });
        }
    };

    callback = (key) => {
        this.setState({
            status: key
        });
    };

    render() {
        const cpoBadAccountPagination = {
            current: this.state.cpoBaseWrapper.pageIndex,
            defaultPageSize: 10,
            total: this.state.cpoBaseWrapper.total,
            onChange: (page, pageSize) => {
                this.handleSearch(page, pageSize, 'cpo')
            }
        };
        const empBadAccountPagination = {
            current: this.state.empBaseWrapper.pageIndex,
            defaultPageSize: 10,
            total: this.state.empBaseWrapper.total,
            onChange: (page, pageSize) => {
                this.handleSearch(page, pageSize, 'emp')
            }
        };

        const cpoRowSelection = {
            selectedRowKeys: this.state.cpoSelectedRowKeys,
            onChange: (selectedRowKeys) => {
                this.onSelectChange(selectedRowKeys, 'cpo')
            },
        };

        const empRowSelection = {
            selectedRowKeys: this.state.empSelectedRowKeys,
            onChange: (selectedRowKeys) => {
                this.onSelectChange(selectedRowKeys, 'emp')
            },
        };

        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={(key) => this.callback(key)}>
                    <TabPane tab="CPO坏账" key="1">
                        <MyForm _this={this} onRowDisplayNum={3} bindName={'condition_cpo'} fields={
                            [
                                {
                                    fieldType: FORM_ITEM_TYPE.RANGE_PICKER1,
                                    labelName: '账单日期',
                                    fieldName: 'dateRange'
                                },
                                {
                                    fieldType: FORM_ITEM_TYPE.SELECT,
                                    labelName: 'CPO',
                                    fieldName: 'cpoOperatorId',
                                    optionList: this.state.cecPartner.cpoList
                                },
                                {
                                    fieldType: FORM_ITEM_TYPE.SELECT,
                                    labelName: 'EMP',
                                    fieldName: 'empOperatorId',
                                    optionList: this.state.cecPartner.empList
                                }
                            ]}
                                buttonList={[
                                    {
                                        type: "primary",
                                        text: '搜索',
                                        callback: () => this.handleSearch(this.state.cpoBaseWrapper.pageIndex, this.state.cpoBaseWrapper.pageSize, 'cpo')
                                    },
                                    {
                                        type: "danger",
                                        text: '修复选中账单',
                                        callback: () => this.handleFixBadOrder('cpo')
                                    }
                                ]}/>
                        <Table loading={this.state.loading}
                               rowSelection={cpoRowSelection}
                               columns={cpoBadAccountColumn}
                               dataSource={this.state.cpoBaseWrapper.list}
                               pagination={cpoBadAccountPagination} rowKey={record => record.orderId}/>
                    </TabPane>
                    <TabPane tab="EMP坏账" key="2">
                        <MyForm _this={this} onRowDisplayNum={3} bindName={'condition_emp'} fields={
                            [
                                {
                                    fieldType: FORM_ITEM_TYPE.RANGE_PICKER1,
                                    labelName: '账单日期',
                                    fieldName: 'dateRange'
                                },
                                {
                                    fieldType: FORM_ITEM_TYPE.SELECT,
                                    labelName: 'CPO',
                                    fieldName: 'cpoOperatorId',
                                    optionList: this.state.cecPartner.cpoList
                                },
                                {
                                    fieldType: FORM_ITEM_TYPE.SELECT,
                                    labelName: 'EMP',
                                    fieldName: 'empOperatorId',
                                    optionList: this.state.cecPartner.empList
                                },
                            ]}
                                buttonList={[
                                    {
                                        type: "primary",
                                        text: '搜索',
                                        callback: () => this.handleSearch(this.state.empBaseWrapper.pageIndex, this.state.empBaseWrapper.pageSize, 'emp')
                                    },
                                    {
                                        type: "danger",
                                        text: '修复选中账单',
                                        callback: () => this.handleFixBadOrder('emp')
                                    }
                                ]}/>
                        <Table loading={this.state.loading}
                               rowSelection={empRowSelection} columns={empBadAccountColumn}
                               dataSource={this.state.empBaseWrapper.list}
                               pagination={empBadAccountPagination} rowKey={record => record.orderId}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }

}
