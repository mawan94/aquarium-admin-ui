import React from 'react'
import {Button, message, Modal, Table, Tag} from 'antd';
import api from '../../../common/api'
import storage from '../../../common/storage'

const {confirm} = Modal;
export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        // 表单条件
        condition: {},
        pageIndex: 1,
        pageSize: 10,
        total: 0,

        // 当前选择的数据
        selectedRowKeys: [],

    };

    componentDidMount() {
        this.handleSearch(this.state.pageIndex, this.state.pageSize);
    }

    handle2Pay = (record) => {
        let param = {}
        param.workOrderId = record.id;
        param.adminId = storage.get('userInfo').id
        this.setState({loading: true})
        api.pay(param).then(res => {
            // console.log(res)
            message.success('操作成功')
        }).finally(() => {
            this.setState({loading: false})
            this.handleSearch(this.state.pageIndex, this.state.pageSize);
        })
    }


    // 提交审核
    handle2Review = (record, access) => {
        let param = {};
        param.reviewId = record.reviewId;
        param.workOrderId = record.id;
        param.adminId = storage.get('userInfo').id
        param.access = access;
        this.setState({loading: true})
        api.handle2Review(param).then(res => {
            this.handleSearch(this.state.pageIndex, this.state.pageSize)
            message.success("操作成功")
            this.handleSearch(this.state.pageIndex, this.state.pageSize);
        }).finally(() => {
            this.setState({loading: false})
        })
    };

    handleSearch = (page, pageSize) => {
        let params = this.state.condition;
        params.averageAccountType = 2;//已结算
        params.pageIndex = page;
        params.pageSize = pageSize;
        this.setState({
            loading: true,
            pageIndex: params.pageIndex,
            pageSize: params.pageSize
        });
        api.workOrderList(params).then(res => {
            this.setState({
                loading: false,
                total: res.data.total,
                data: res.data.list
            })
        }).finally(() => {
            this.setState({
                loading: false
            })
        })
    };


    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id'
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
                title: '批次号',
                dataIndex: 'batchId'
            },
            {
                title: '描述',
                dataIndex: 'description',

            },
            {
                title: '发起人',
                dataIndex: 'sponsor',
            },
            {
                title: '备注',
                dataIndex: 'orderDescription',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (record) => {
                    if (record == 1) {
                        return <span style={{color: 'red'}}>待审核</span>
                    } else if (record == 2) {
                        return <span style={{color: 'red'}}>通过审核</span>
                    } else if (record == 3) {
                        return <span style={{color: 'red'}}>被驳回</span>
                    } else if (record == 4) {
                        return <span style={{color: 'red'}}>已执行</span>
                    } else {
                        return <span style={{color: 'red'}}>未知</span>
                    }
                }
            },
            // {
            //     title: '统计',
            //     dataIndex: 'filePath',
            //     render: (record) => {
            //         return <a href={constant.imgHost + record} download={'subtotal.xls'}
            //         >小计</a>
            //     }
            // },
            {
                title: '审核人',
                dataIndex: 'reviewWorkOrder',
                render: (record) => {
                    if (record.length === 0) return '';
                    else {
                        let str = '';
                        record.map((item) => {
                            str += item.nickname + "，  "
                        });
                        return str;
                    }
                }
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (text, record) => {
                    return (
                        <div>
                            <Button loading={this.state.loading} type="primary" onClick={() => {
                                let param = {};
                                // param.data = JSON.parse(record.extendBody);
                                let userInfo = storage.get('userInfo');
                                param.adminId = userInfo.id;
                                param.mail = userInfo.mail;
                                param.id = record.id;
                                // param
                                this.setState({loading: true})
                                api.previewFile(param).then(res => {
                                    message.info('正在处理 ，请勿重复点击');
                                }).catch(err => {
                                    message.error('system error');
                                }).finally(() => {
                                    this.setState({loading: false})
                                })
                            }}>预览</Button>
                            {/*<Button disabled={storage.get('userInfo').role != 3} loading={this.state.loading}*/}
                            {/*        style={{margin: '0 20px'}} type="primary" onClick={() => {*/}
                            {/*    let _this = this;*/}
                            {/*    confirm({*/}
                            {/*        title: '确认提示',*/}
                            {/*        content: '确定要执行此项操作吗?',*/}
                            {/*        onOk() {*/}
                            {/*            _this.handle2Review(record, true)*/}
                            {/*        },*/}
                            {/*        onCancel() {*/}
                            {/*        },*/}
                            {/*    });*/}
                            {/*}}>通过审核</Button>*/}

                            {/*<Button disabled={storage.get('userInfo').role != 3} loading={this.state.loading}*/}
                            {/*        type="danger" onClick={() => {*/}
                            {/*    let _this = this;*/}
                            {/*    confirm({*/}
                            {/*        title: '确认提示',*/}
                            {/*        content: `确定要执行此项操作吗?${record.totalCount}${record.totalDifferenceMoney}${record.totalMoney}${record.totalCpoResponsibilityMoney}${record.totalEmpResponsibilityMoney}${record.totalHubjectResponsibilityMoney}`,*/}
                            {/*        onOk() {*/}
                            {/*            _this.handle2Review(record, false)*/}
                            {/*        },*/}
                            {/*        onCancel() {*/}
                            {/*        },*/}
                            {/*    });*/}

                            {/*}}>驳回</Button>*/}

                            <Button disabled={storage.get('userInfo').role != 4 || record.status == 4}
                                    style={{marginLeft: '20px'}}
                                    loading={this.state.loading} type="danger" onClick={() => {
                                let _this = this;
                                confirm({
                                    title: '确认提示',
                                    content: `${record.totalCount} \n ${record.totalMoney}  \r    ${record.totalDifferenceMoney} \r\n ${record.totalCpoResponsibilityMoney} \r\n  ${record.totalEmpResponsibilityMoney} \r\n  ${record.totalHubjectResponsibilityMoney}`,
                                    onOk() {
                                        _this.handle2Pay(record)
                                    },
                                    onCancel() {
                                    },
                                });

                            }}>结算</Button>
                        </div>
                    )
                }

            }
        ];

        const pagination = {
            current: this.state.pageIndex,
            defaultPageSize: 10,
            total: this.state.total,
            onChange: (page, pageSize) => {
                this.handleSearch(page, pageSize)
            }
        };

        return (
            <div>
                <Table rowKey={record => record.id} columns={columns}
                       pagination={pagination} dataSource={this.state.data} loading-={this.state.loading}/>
            </div>
        )
    }


}
