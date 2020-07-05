import React from 'react'
import {Button, Modal, Table, Tag} from 'antd';
import moment from "moment";

import MyTable from '../../../component/MyTable'
import api from '../../../common/api'
import MyImg from "../../../component/MyImg";

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
        api.getTOrderList({pageIndex, pageSize}).then(res => {
            let {records, total} = res.data;
            this.setState({total, pageIndex, pageSize, data: records})
        })
    };


    render() {
        let _this = this;
        let columns = [{
            title: '编号',
            dataIndex: 'torderId',
            key: 'torderId',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (text) => {
                return moment(text).format('YYYY-MM-DD HH:mm:ss')
            }
        }, {
            title: '申请人',
            dataIndex: 'applicant',
            key: 'applicant',
        }, {
            title: '审核人',
            dataIndex: 'reviewer',
            key: 'reviewer'
        }, {
            title: '订单状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                if (text === 1) {
                    return <Tag color={'green'}>待处理</Tag>
                } else if (text === 2) {
                    return <Tag color={'volcano'}>已完成</Tag>
                } else if (text === 3) {
                    return <Tag color={'geekblue'}>驳回</Tag>
                }
            }
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark'
        },
            {
                title: '操作', dataIndex: '', key: 'x', render: (record) => {
                    return (
                        <div>

                            {record.status == 1 ? <div>
                                <div>
                                    <Button type="primary" onClick={() => {
                                        confirm({
                                            title: '提示',
                                            content: '成功调拨后将扣除对应商品库存，并且形成调拨日志',
                                            okText: 'Yes',
                                            okType: 'danger',
                                            cancelText: 'No',
                                            onOk() {
                                                api.applyTOrder({id: record.torderId, status: 2}).then(res => {
                                                    _this.handleSearch(_this.state.pageIndex, _this.state.pageSize)
                                                })
                                            },
                                            onCancel() {
                                                console.log('Cancel');
                                            },
                                        });
                                    }}>通过</Button>
                                </div>

                                <div style={{marginTop: '10px'}}>
                                    <Button type="danger" onClick={() => {
                                        confirm({
                                            title: '提示',
                                            content: '确定要驳回吗？',
                                            okText: 'Yes',
                                            okType: 'danger',
                                            cancelText: 'No',
                                            onOk() {
                                                api.applyTOrder({id: record.torderId, status: 3}).then(res => {
                                                    _this.handleSearch(_this.state.pageIndex, _this.state.pageSize)
                                                })
                                            },
                                            onCancel() {
                                                console.log('Cancel');
                                            },
                                        });
                                    }}>驳回</Button>
                                </div>
                            </div> : ''}

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
                    displayExtra={false}
                    rowKey={record => record.torderId}
                    columns={columns}
                    dataSource={this.state.data}
                    pageIndex={this.state.pageIndex}
                    pageSize={this.state.pageSize}
                    total={this.state.total}
                    handleLoadPage={this.handleSearch}
                    expandedRowRender={(record) => <InnerList that={this}
                                                              torderId={record.torderId}/>}
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
        this.handleLoadInnerList(this.props.torderId)
    }

    handleLoadInnerList = (torderId) => {
        api.getTOrderDetailList({id: torderId}).then(res => {
            this.setState({
                list: res.data
            });
        })
    }

    render() {
        const columns = [{
            title: '编号',
            dataIndex: 'torderDetailId',
            key: 'torderDetailId',
        }, {
            title: '商品名称',
            dataIndex: 'productName',
            key: 'productName',
        }, {
            title: '规格名称',
            dataIndex: 'skuName',
            key: 'skuName',
        }, {
            title: '图片',
            dataIndex: 'productImg',
            key: 'productImg',
            render: text => <MyImg src={text}/>
        }, {
            title: '数量',
            dataIndex: 'num',
            key: 'num',
            render: (text) => {
                return <span style={{color: 'red'}}>{text}</span>
            }
        }
        ];
        return <Table
            rowKey={record => record.torderDetailId}
            columns={columns}
            dataSource={this.state.list}
            pagination={false}

        />
    }
}
