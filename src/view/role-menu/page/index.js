import React from 'react'
import {Button, Modal, Table} from 'antd';

import MyTable from '../../../component/MyTable'
import api from '../../../common/api'

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
        api.getRoleList({pageIndex, pageSize}).then(res => {
            let {records, total} = res.data;
            this.setState({total,pageIndex, pageSize, data: records})
        })
    };

    render() {
        let _this = this;
        let columns = [{
            title: '角色编号',
            dataIndex: 'roleId',
            key: 'roleId',
        }, {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
        }, {
            title: '角色类型',
            dataIndex: 'roleType',
            key: 'roleType',
        },
            {
                title: '操作', dataIndex: '', key: 'x', render: (record) => {
                    return (
                        <div>
                            <div>
                                <Button type="dashed" onClick={() => {
                                    this.props.history.push('/role-menu/edit/' + record.roleType)
                                }}>编辑</Button>
                            </div>

                            {/*<div style={{marginTop: '10px'}}>*/}
                            {/*    <Button type="danger" onClick={() => {*/}
                            {/*        confirm({*/}
                            {/*            title: '提示',*/}
                            {/*            content: '确定要删除此数据项吗？',*/}
                            {/*            okText: 'Yes',*/}
                            {/*            okType: 'danger',*/}
                            {/*            cancelText: 'No',*/}
                            {/*            onOk() {*/}
                            {/*                api.deleteRole({roleId: record.roleId}).then(res => {*/}
                            {/*                    _this.handleSearch(_this.state.pageIndex, _this.state.pageSize)*/}
                            {/*                })*/}
                            {/*            },*/}
                            {/*            onCancel() {*/}
                            {/*                console.log('Cancel');*/}
                            {/*            },*/}
                            {/*        });*/}
                            {/*    }}>删除</Button>*/}
                            {/*</div>*/}
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
                        // this.props.history.push('/role-menu/add')
                    }}
                    rowKey={record => record.roleId}
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
