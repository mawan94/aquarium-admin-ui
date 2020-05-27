import React from 'react'
import {Button, Modal, Table} from 'antd';

import MyTable from '../../../component/MyTable'
import api from '../../../common/api'
import text from "react-tmap/src/canvas/draw/text";

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
        api.getDeliveryList({pageIndex, pageSize}).then(res => {
            let {records, total} = res.data;
            this.setState({total, data: records})
        })
    };

    render() {
        let _this = this;
        let columns = [{
            title: '起送价',
            dataIndex: 'startingPrice',
            key: 'startingPrice',
            render: (text) =>  text + '元'
        }, {
            title: '包装费',
            dataIndex: 'packagingFee',
            key: 'packagingFee',
            render: (text) =>  text + '元'
        }, {
            title: '服务费率',
            dataIndex: 'serviceFeeRatio',
            key: 'serviceFeeRatio',
            render: (text) =>  text + '%'
        }, {
            title: '基础运费',
            dataIndex: 'baseDeliveryFee',
            key: 'baseDeliveryFee',
            render: (text) =>  text + '元'
        }, {
            title: '封顶运费',
            dataIndex: 'maxDeliveryFee',
            key: 'maxDeliveryFee',
            render: (text) =>  text + '元'
        }, {
            title: '收费规则',
            dataIndex: 'rule',
            key: 'rule',
            render: (text, record) => <span>每{record.stepUnit}KM，加收费用{record.stepFee}元。</span>
        },
            {
                title: '操作', dataIndex: '', key: 'x', render: (record) => {
                    return (
                        <div>
                            <div>
                                <Button type="dashed" onClick={() => {
                                    this.props.history.push('/delivery/edit/' + record.deliveryId)
                                }}>编辑</Button>
                            </div>

                            <div style={{marginTop: '10px'}}>
                                <Button type="danger" onClick={() => {
                                    confirm({
                                        title: '提示',
                                        content: '确定要删除此数据项吗？',
                                        okText: 'Yes',
                                        okType: 'danger',
                                        cancelText: 'No',
                                        onOk() {
                                            api.deleteDelivery({deliveryId: record.rechargeRuleId}).then(res => {
                                                _this.handleSearch(_this.state.pageIndex, _this.state.deliveryId)
                                            })
                                        },
                                        onCancel() {
                                            console.log('Cancel');
                                        },
                                    });
                                }}>删除</Button>
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
                        this.props.history.push('/delivery/add')
                    }}
                    rowKey={record => record.deliveryId}
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
