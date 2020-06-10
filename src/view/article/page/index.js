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
        api.getArticleList({pageIndex, pageSize}).then(res => {
            let {records, total} = res.data;
            this.setState({total, data: records})
        })
    };

    render() {
        let _this = this;
        let columns = [{
            title: '文章编号',
            dataIndex: 'articleId',
            key: 'articleId',
        }, {
            title: '文章标签',
            dataIndex: 'tagId',
            key: 'tagId',
        }, {
            title: '文章标题',
            dataIndex: 'articleTitle',
            key: 'articleTitle',
        }, {
            title: '封面图片',
            dataIndex: 'filePath',
            key: 'filePath',
            render: text => <MyImg src={text}/>
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
                                    this.props.history.push('/article/edit/' + record.articleId)
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
                                            api.deleteArticle({articleId: record.articleId}).then(res => {
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
                        this.props.history.push('/article/add')
                    }}
                    rowKey={record => record.categoryId}
                    columns={columns}
                    dataSource={this.state.data}
                    pageIndex={this.state.pageIndex}
                    pageSize={this.state.pageSize}
                    total={this.state.total}
                    handleLoadPage={this.handleSearch}
                    // expandedRowRender={(record) => <InnerList that={this}
                    //                                           categoryId={record.categoryId}/>}
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
        this.handleLoadInnerList(this.props.categoryId)
    }

    handleLoadInnerList = (categoryId) => {
        api.getChildCategoryList({id: categoryId}).then(res => {
            this.setState({
                list: res.data
            });
        })
    }

    render() {
        let _this = this;
        const columns = [{
            title: '分类编号',
            dataIndex: 'categoryId',
            key: 'categoryId',
        }, {
            title: '分类名称',
            dataIndex: 'categoryName',
            key: 'categoryName',
        }, {
            title: '分类描述',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: '分类图片',
            dataIndex: 'filePath',
            key: 'filePath',
            render: text => <MyImg src={text}/>
        }, {
            title: '展示优先级',
            dataIndex: 'weight',
            key: 'weight',
        }, {
            title: '是否展示',
            dataIndex: 'display',
            key: 'display',
            render: (text) => {
                if (text === 1) {
                    return '展示'
                } else if (text === 2) {
                    return '隐藏'
                } else {
                    return 'UNKNOW'
                }
            }
        }, {
            title: '父级分类编号',
            dataIndex: 'parentId',
            key: 'parentId'
        },
            {
                title: '操作', dataIndex: '', key: 'x', render: (record) => {
                    return (
                        <div>
                            <div>
                                <Button type="dashed" onClick={() => {
                                    this.props.that.props.history.push('/category/edit/' + record.categoryId)
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
                                            api.deleteCategory({productCategoryId: record.categoryId}).then(res => {
                                                _this.props.that.handleSearch(_this.props.that.state.pageIndex, _this.props.that.state.pageSize)
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
            rowKey={record => record.categoryId}
            columns={columns}
            dataSource={this.state.list}
            pagination={false}

        />
    }
}
