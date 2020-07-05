import React from 'react'
import {Tag} from 'antd';
import moment from "moment";

import MyTable from '../../../component/MyTable'
import api from '../../../common/api'
import MyImg from "../../../component/MyImg";
import FORM_ITEM_TYPE from "../../../common/formItemType";
import MyForm from "../../../component/MyForm";


export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            // 表单条件
            condition: {},

            adminList: []
        }
    }

    // 钩子函数 頁面渲染完成时
    componentDidMount() {
        this.handleInitAdminSelector()
        this.handleSearch(this.state.pageIndex, this.state.pageSize);
    }

    handleInitAdminSelector = () => {
        api.adminSelector({}).then(res => {
            this.setState({
                adminList: res.data
            })
        })
    }


    handleSearch = (pageIndex, pageSize) => {
        api.getTLogList({...this.state.condition, pageIndex, pageSize}).then(res => {
            let {records, total} = res.data;
            this.setState({total, pageIndex, pageSize, data: records})
        })
    };

    render() {
        let _this = this;
        let columns = [{
            title: '商品图片',
            dataIndex: 'productImg',
            key: 'productImg',
            render: text => <MyImg src={text}/>
        }, {
            title: '商品名称',
            dataIndex: 'productName',
            key: 'productName',
        }, {
            title: '规格',
            dataIndex: 'skuName',
            key: 'skuName'
        }, {
            title: '变更类型',
            dataIndex: 'action',
            key: 'action',
            render: (text) => {
                if (text === 1) {
                    return <Tag color={'green'}>增加</Tag>
                } else if (text === 2) {
                    return <Tag color={'volcano'}>扣减</Tag>
                }
            }
        }, {
            title: '变更数量',
            dataIndex: 'num',
            key: 'num'
        }, {
            title: '申请人',
            dataIndex: 'adminName',
            key: 'adminName',
        }, {
            title: '执行时间',
            dataIndex: 'executionTime',
            key: 'executionTime',
            render: (text) => {
                return moment(text).format('YYYY-MM-DD HH:mm:ss')
            }
        }]
        return (
            <div>
                <MyForm _this={this} onRowDisplayNum={3} bindName={'condition'} fields={
                    [
                        {
                            fieldType: FORM_ITEM_TYPE.INPUT,
                            labelName: '商品名称',
                            fieldName: 'productName'
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.INPUT,
                            labelName: '规格名称',
                            fieldName: 'productName'
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.SELECT,
                            labelName: '申请人',
                            fieldName: 'adminId',
                            optionList: this.state.adminList
                        },

                        {
                            fieldType: FORM_ITEM_TYPE.SELECT,
                            labelName: '变更类型',
                            fieldName: 'action',
                            optionList: [
                                {label: '增加', value: 1},
                                {label: '扣减', value: 2},
                            ]
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
                    displayExtra={false}
                    rowKey={record => record.tlogId}
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
