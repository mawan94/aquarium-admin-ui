import React from 'react'
import {Button, Modal, Table} from 'antd';

import api from '../../../common/api'
import constant from '../../../common/constant'
import MyImg from '../../../component/MyImg'
import MyTable from '../../../component/MyTable'
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
        api.getProductList({pageIndex, pageSize}).then(res => {
            let {records, total} = res.data;
            this.setState({total, data: records})
        })
    };

    render() {
        let _this = this;
        let columns = [{
            title: '商品编号',
            dataIndex: 'productId',
            key: 'productId',
        }, {
            title: '供应商编号',
            dataIndex: 'supplierId',
            key: 'supplierId',
        }, {
            title: '分类编号',
            dataIndex: 'categoryId',
            key: 'categoryId',
        }, {
            title: '商品名称',
            dataIndex: 'productName',
            key: 'productName',
        }, {
            title: '封面图',
            dataIndex: 'filePath',
            key: 'filePath',
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
            title: '排序优先级',
            dataIndex: 'weight',
            key: 'weight'
        }, {
            title: '简介',
            dataIndex: 'description',
            key: 'description'
        }, {
            title: '媒体描述',
            dataIndex: 'mediaInformation',
            key: 'mediaInformation'
        },
            {
                title: '操作', dataIndex: '', key: 'x', render: (record) => {
                    return (
                        <div>
                            <div>
                                <Button type="dashed" onClick={() => {
                                    this.props.history.push('/product/edit/' + record.categoryId)
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
                                            api.deleteProduct({productId: record.productId}).then(res => {
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
                        this.props.history.push('/product/add')
                    }}
                    rowKey={record => record.productId}
                    columns={columns}
                    dataSource={this.state.data}
                    pageIndex={this.state.pageIndex}
                    pageSize={this.state.pageSize}
                    total={this.state.total}
                    handleLoadPage={this.handleSearch}
                    expandedRowRender={(record) => <InnerList that={this}
                                                              articleId={record.productId}/>}  //级联列表效果切换 注释取消
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
        this.handleLoadInnerList(this.props.articleId)
    }

    handleLoadInnerList = (productId) => {
        api.getSkuListByProductId({productId}).then(res => {
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
        const columns = [
            {
                title: '规格编号',
                dataIndex: 'skuId',
                key: 'skuId',
            }, {
                title: '规格名称',
                dataIndex: 'skuName',
                key: 'skuName',
            }, {
                title: '库存',
                dataIndex: 'stock',
                key: 'stock',
            }, {
                title: '零售价',
                dataIndex: 'retailPrice',
                key: 'retailPrice',
            }, {
                title: '批发价',
                dataIndex: 'wholesalePrice',
                key: 'wholesalePrice',
            }, {
                title: '进货价',
                dataIndex: 'purchasePrice',
                key: 'purchasePrice',
            }, {
                title: '库存',
                dataIndex: 'display',
                key: 'display',
            }, {
                title: '规格图片',
                dataIndex: 'skuImg',
                key: 'skuImg',
                render: (text) => {
                    return <MyImg src={constant.imgHost + text}/>
                }
            }
        ];
        return <Table
            // rowKey={record => record.skuId}
            columns={columns}
            dataSource={this.state.list}
            pagination={false}
        />
    }
}
