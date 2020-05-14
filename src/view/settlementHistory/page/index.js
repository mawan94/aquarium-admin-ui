import React from 'react'
import {Table, message,Tag} from 'antd';

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
    }

    handleSearch = (page, pageSize) => {
        let params = this.state.condition;
        // params.averageAccountType = 2;//已结算
        params.pageIndex = page;
        params.pageSize = pageSize;
        this.setState({
            loading: true,
            pageIndex: params.pageIndex,
            pageSize: params.pageSize
        });
        api.handleLoadSettlementHistory(params).then(res => {
            this.setState({
                loading: false,
                total: res.data.total,
                data: res.data.list
            })
        })
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

        const columns = [
            {
                title: '批次号',
                dataIndex: 'batchId'
            },
            {
                title: 'CPO',
                dataIndex: 'cpoId',
                render: (text) => {
                    return <Tag color={'#6633cc'}>{text}</Tag>
                }
            },
            {
                title: 'EMP',
                dataIndex: 'empId',
                render: (text) => {
                    return <Tag color={'#ff6600'}>{text}</Tag>
                }
            },
            {
                title: '创建人',
                dataIndex: 'createBy',
            },
            {
                title: '审核人',
                dataIndex: 'reviewBy',
            },
            {
                title: '结算金额',
                dataIndex: 'payMoney',
                render: (text) => {
                    return <span style={{color:'#ff3399'}}>{text}</span>
                }
            },
            {
                title: '结算日期',
                dataIndex: 'submitTime',
            },
            {
                title: '统计',
                dataIndex: 'filePath',
                render: (record, records) => {
                    return (<div>
                        <a onClick={() => {
                            // let blobUrl = window.URL.createObjectURL(data)
                            // const a = document.createElement('a')
                            // a.style.display = 'none'
                            // a.download = 'temp.xls'
                            // a.href = blobUrl
                            // a.click()
                            //
                            // window.open(constant.imgHost + record)
                        }}>小计</a>
                        <br/>
                        <br/>
                        <a onClick={() => {
                            let userInfo = storage.get('userInfo');
                            this.setState({loading: true})
                            api.historyDetailDownload(
                                {adminId: userInfo.id, id: records.id, mail: userInfo.mail}
                            ).then(res => {
                                message.info('正在推送请稍后')
                            }).finally(() => {
                                this.setState({loading: false})
                            })
                        }}>明细</a>
                    </div>)
                }
            }
        ];

        return (
            <div>
                <MyForm _this={this} onRowDisplayNum={3} bindName={'condition'} fields={
                    [
                        {
                            fieldType: FORM_ITEM_TYPE.RANGE_PICKER,
                            labelName: '平账日期',
                            fieldName: 'dateRange'
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
                            labelName: '批次号 ',
                            fieldName: 'batchId'
                        }
                    ]}
                        buttonList={[
                            {
                                type: "primary", text: '搜索', callback: () => {
                                    this.handleSearch(1, 10)
                                }
                            }
                        ]}/>
                <Table rowKey={record => record.id} columns={columns}
                       pagination={pagination} dataSource={this.state.data} loading-={this.state.loading}/>
            </div>
        )
    }


}
