import React from 'react'
import {Button, Modal, Table} from 'antd';

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
        api.getBannerList({pageIndex, pageSize}).then(res => {
            let {records, total} = res.data;
            this.setState({total,pageIndex, pageSize, data: records})
        })
    };

    render() {
        let _this = this;
        let columns = [{
            title: '轮播图编号',
            dataIndex: 'bannerId',
            key: 'bannerId',
        }, {
            title: '封面图片',
            dataIndex: 'filePath',
            key: 'filePath',
            render: text => <MyImg width={'240'} src={text}/>
        }, {
            title: '跳转路由',
            dataIndex: 'redirectRouter',
            key: 'redirectRouter',
        }, {
            title: '展示优先级',
            dataIndex: 'weight',
            key: 'weight',
        },
            {
                title: '操作', dataIndex: '', key: 'x', render: (record) => {
                    return (
                        <div>
                            <div>
                                <Button type="dashed" onClick={() => {
                                    this.props.history.push('/banner/edit/' + record.bannerId)
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
                                            api.deleteBanner({bannerId: record.bannerId}).then(res => {
                                                _this.handleSearch(_this.state.pageIndex, _this.state.pageSize)
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
                        this.props.history.push('/banner/add')
                    }}
                    rowKey={record => record.bannerId}
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
