import React from 'react'
import {Table, Tag} from 'antd';

import MyForm from '../../../component/MyForm'
import FORM_ITEM_TYPE from '../../../common/formItemType'
import api from '../../../common/api'

const columns = [
    {
        title: '订单编号',
        dataIndex: 'orderId'
    },
    {
        title: '差额',
        dataIndex: 'differenceMoney',
        render: (text) => {
            return <span style={{color: '#ff3366'}}>{text}</span>
        }
    },
    {
        title: 'CPO',
        dataIndex: 'cpoName',
        render: (text) => {
            return <Tag color={'#6633cc'}>{text}</Tag>
        }
    },
    {
        title: 'CPO账单金额',
        dataIndex: 'cpoTotalMoney',
        render: (text) => {
            return <span style={{color: '#6633cc'}}>{text}</span>
        }
    },
    {
        title: 'CPO责任金额',
        dataIndex: 'cpoResponsibilityMoney',
        render: (text) => {
            return <span style={{color: '#6633cc'}}>{text}</span>
        }
    },
    {
        title: 'EMP',
        dataIndex: 'empName',
        render: (text) => {
            return <Tag color={'#ff6600'}>{text}</Tag>
        }
    },

    {
        title: 'EMP账单金额',
        dataIndex: 'empTotalMoney',
        render: (text) => {
            return <span style={{color: '#ff6600'}}>{text}</span>
        }
    },
    {
        title: 'EMP责任金额',
        dataIndex: 'empResponsibilityMoney',
        render: (text) => {
            return <span style={{color: '#ff6600'}}>{text}</span>
        }
    },

    {
        title: 'HUBJECT责任金额',
        dataIndex: 'hubjectResponsibilityMoney',
        render: (text) => {
            return <span style={{color: '#339966',fontWeight: 800}}>{text}</span>
        }
    },
    {
        title: '备注',
        dataIndex: 'remark',
    },
    {
        title: '操作人',
        dataIndex: 'editBy',
    },
    {
        title: '操作时间',
        dataIndex: 'editTime',
    }
];

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        // 表单条件
        condition: {},
        // cpo & emp 下拉框
        cecPartner: {
            cpoList: [],
            empList: []
        },
        // 列表数据
        data: [],
        // 基础数据
        pageIndex: 1,
        pageSize: 10,
        total: 0,

        // 当前选择的数据
        selectedRowKeys: [],
    };

    componentDidMount() {
        api.cecPartnerSelector().then(res => {
            this.setState({cecPartner: res.data})
        })
    };

    handleSearch = (page, pageSize) => {
        let params = this.state.condition;
        params.pageIndex = page;
        params.pageSize = pageSize;
        params.averageAccountType = 1;//已平账
        this.setState({
            loading: true,
            pageIndex: params.pageIndex,
            pageSize: params.pageSize
        });
        api.handleLoadSubmitRecordList(params).then(res => {
            this.setState({
                total: res.data.total,
                data: res.data.list
            })
        }).finally(() => {
            this.setState({loading: false})
        });
    };

    onSelectChange = selectedRowKeys => {
        this.setState({
            selectedRowKeys
        });
    };

    // 回滚已经平账的数据
    handleRollbackPreEditRecord = () => {
        this.setState({loading: true});
        let ids = this.state.selectedRowKeys;
        api.handleRollbackSubmitRecord({ids}).then(res => {
            this.setState({
                selectedRowKeys: []
            });
            this.handleSearch(this.state.pageIndex, this.state.pageSize)
        }).finally(() => {
            this.setState({loading: false})
        });
    };

    render() {
        const pagination = {
            current: this.state.pageIndex,
            defaultPageSize: 10,
            total: this.state.total,
            onChange: (page, pageSize) => {
                this.handleSearch(page, pageSize)
            }
        };

        // emp && cpo 选择组件
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange
        };

        return (
            <div>
                <MyForm _this={this} onRowDisplayNum={3} bindName={'condition'} fields={
                    [
                        {
                            fieldType: FORM_ITEM_TYPE.RANGE_PICKER,
                            labelName: '平账日期',
                            fieldName: 'submitDate'
                        },
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
                            fieldType: FORM_ITEM_TYPE.INPUT,
                            labelName: '账单ID ',
                            fieldName: 'orderId'
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.INPUT,
                            labelName: '操作人 ',
                            fieldName: 'editBy'
                        },
                    ]}
                        buttonList={[
                            {
                                type: "primary", text: '搜索', callback: () => {
                                    this.handleSearch(1, 10)
                                }
                            },
                            {type: "danger", text: '回滚', callback: this.handleRollbackPreEditRecord},
                        ]}/>
                <Table rowSelection={rowSelection} rowKey={record => record.id} columns={columns}
                       pagination={pagination} dataSource={this.state.data} loading-={this.state.loading}/>
            </div>
        )
    }
}
