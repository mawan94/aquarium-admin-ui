import React from 'react'
import {Button, Modal, Table, Tag} from 'antd';

import MyTable from '../../../component/MyTable'
import api from '../../../common/api'
import MyImg from "../../../component/MyImg";
import constant from "../../../common/constant";

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
        api.getMenuRootList({pageIndex, pageSize}).then(res => {
            let {records, total} = res.data;
            this.setState({total,pageIndex, pageSize, data: records})
        })
    };

    render() {
        let _this = this;
        let columns = [{
            title: '菜单编号',
            dataIndex: 'menuId',
            key: 'menuId',
        }
            // , {
            //     title: '菜单父级编号',
            //     dataIndex: 'parentMenuId',
            //     key: 'parentMenuId',
            // }, {
            //     title: '菜单链接',
            //     dataIndex: 'link',
            //     key: 'link',
            // },
            ,
            {
                title: '菜单名称',
                dataIndex: 'menuTagName',
                key: 'menuTagName',
            },
            {
                title: '权重',
                dataIndex: 'weight',
                key: 'weight',
            },
            {
                title: '操作', dataIndex: '', key: 'x', render: (record) => {
                    return (
                        <div>
                            <div>
                                <Button type="dashed" onClick={() => {
                                    this.props.history.push('/menu/edit/' + record.menuId)
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
                                            api.deleteMenu({menuId: record.menuId}).then(res => {
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
                        this.props.history.push('/menu/add')
                    }}
                    rowKey={record => record.menuId}
                    columns={columns}
                    dataSource={this.state.data}
                    pageIndex={this.state.pageIndex}
                    pageSize={this.state.pageSize}
                    total={this.state.total}
                    handleLoadPage={this.handleSearch}
                    expandedRowRender={(record) => <InnerList that={this}
                                                              menuId={record.menuId}/>}
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
        this.handleLoadInnerList(this.props.menuId)
    }

    handleLoadInnerList = (menuId) => {
        api.getMenuChildList({menuId}).then(res => {
            if (res.data) {
                res.data.map((item, index) => {
                    item.key = index
                });
            }
            this.setState({
                list: res.data
            });
        })
    }

    render() {
        let _this = this;
        const columns = [
            {
                title: '菜单编号',
                dataIndex: 'menuId',
                key: 'menuId',
            },
            {
                title: '菜单父级编号',
                dataIndex: 'parentMenuId',
                key: 'parentMenuId',
            }, {
                title: '菜单链接',
                dataIndex: 'link',
                key: 'link',
            },
            {
                title: '菜单名称',
                dataIndex: 'menuTagName',
                key: 'menuTagName',
            }, {
                title: '权重',
                dataIndex: 'weight',
                key: 'weight',
            },
            {
                title: '操作', dataIndex: '', key: 'x', render: (record) => {
                    return (
                        <div>
                            <div>
                                <Button type="dashed" onClick={() => {
                                    this.props.that.props.history.push('/menu/edit/' + record.menuId)
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
                                            api.deleteMenu({menuId: record.menuId}).then(res => {
                                                _this.props.that.handleSearch(_this.state.pageIndex, _this.state.pageSize)
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
        ];
        return <Table
            rowKey={record => record.menuId}
            columns={columns}
            dataSource={this.state.list}
            pagination={false}
        />
    }
}

