import React from 'react'
import {Button, Modal, Table, Tag} from 'antd';

import api from '../../../common/api'
import constant from '../../../common/constant'
import MyImg from '../../../component/MyImg'
import MyTable from '../../../component/MyTable'
import FORM_ITEM_TYPE from "../../../common/formItemType";
import MyForm from "../../../component/MyForm";

const confirm = Modal.confirm;

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // 表单条件
            condition: {},

            data: [],
            pageIndex: 1,
            pageSize: 10,
            total: 0,

            childCategories: [],
            supplierList: []
        }
    }

    // 钩子函数 頁面渲染完成时
    componentDidMount() {
        this.handleSearch(this.state.pageIndex, this.state.pageSize);
        this.handlerInitChildCategory()
        this.handlerInitSupplierList()
    }


    handleSearch = (pageIndex, pageSize) => {
        api.getProductList({...this.state.condition, pageIndex, pageSize}).then(res => {
            let {records, total} = res.data;
            this.setState({total, pageIndex, pageSize, data: records})
        })
    };

    // initChildCategory
    handlerInitChildCategory = () => {
        api.getChildCategorySelectors().then(res => {
            this.setState({
                childCategories: res.data
            })
        })
    }

    handlerInitSupplierList = () => {
        api.getSupplierSelectors().then(res => {
            this.setState({
                supplierList: res.data
            })
        })
    }

    render() {
        let _this = this;
        let columns = [{
            title: '编号',
            dataIndex: 'productId',
            key: 'productId',
        }, {
            title: '商品名称',
            dataIndex: 'productName',
            key: 'productName',
            render: text => <span style={{color: '#666600', fontWeight: 600}}>{text}</span>
        }, {
            title: '供应商',
            dataIndex: 'supplierId',
            key: 'supplierId',
        }, {
            title: '所属分类',
            dataIndex: 'categoryId',
            key: 'categoryId',
        }, {
            title: '封面图',
            dataIndex: 'filePath',
            key: 'filePath',
            render: text => <MyImg src={text}/>
        }, {
            title: '是否展示',
            dataIndex: 'display',
            key: 'display',
            render: (text) => {
                if (text === 1) {
                    return <Tag color={'green'}>展示</Tag>
                } else if (text === 2) {
                    return <Tag color={'volcano'}>隐藏</Tag>
                } else {
                    return <Tag color={'geekblue'}>UNKNOW</Tag>
                }
            }
        }, {
            title: '首页推荐',
            dataIndex: 'recommend',
            key: 'recommend',
            render: (text) => {
                if (text === 1) {
                    return <Tag color={'green'}>推荐</Tag>
                } else if (text === 2) {
                    return <Tag color={'volcano'}>不推荐</Tag>
                } else {
                    return <Tag color={'geekblue'}>UNKNOW</Tag>
                }
            }
        },
            {
                title: '操作', dataIndex: '', key: 'x', render: (record) => {
                    return (
                        <div>
                            <div>
                                <Button type="dashed" onClick={() => {
                                    this.props.history.push('/product/edit/' + record.productId)
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
                <MyForm _this={this} onRowDisplayNum={3} bindName={'condition'} fields={
                    [
                        {
                            fieldType: FORM_ITEM_TYPE.INPUT,
                            labelName: '商品编号',
                            fieldName: 'productId'
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.SELECT,
                            labelName: '所属分类',
                            fieldName: 'categoryId',
                            optionList: this.state.childCategories
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.SELECT,
                            labelName: '供应商',
                            fieldName: 'supplierId',
                            optionList: this.state.supplierList
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.INPUT,
                            labelName: '商品名称',
                            fieldName: 'productName'
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.SELECT,
                            labelName: '是否展示',
                            fieldName: 'display',
                            optionList: [
                                {label: '展示', value: 1},
                                {label: '不展示', value: 2},
                            ]
                        },
                        {
                            fieldType: FORM_ITEM_TYPE.SELECT,
                            labelName: '首页推荐',
                            fieldName: 'recommend',
                            optionList: [
                                {label: '推荐', value: 1},
                                {label: '不推荐', value: 2},
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
                                                              productId={record.productId}/>}  //级联列表效果切换 注释取消
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
        this.handleLoadInnerList(this.props.productId)
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
        let _this = this;
        const columns = [
            // {
            //     title: '规格编号',
            //     dataIndex: 'skuId',
            //     key: 'skuId',
            // },
            {
                title: '规格名称',
                dataIndex: 'skuName',
                key: 'skuName',
                render: text => <span style={{color: '#666600'}}>{text}</span>
            }, {
                title: '规格图片',
                dataIndex: 'filePath',
                key: 'filePath',
                render: (text) => {
                    if (text) return <MyImg src={constant.imgHost + text}/>
                    else return ''
                }
            }, {
                title: '库存',
                dataIndex: 'stock',
                key: 'stock',
                render: text => {
                    return <span style={{fontWeight: 600, color: '#666600'}}>{text}</span>
                }
            }, {
                title: '零售价',
                dataIndex: 'retailPrice',
                key: 'retailPrice',
            }, {
                title: '批发价',
                dataIndex: 'wholesalePrice',
                key: 'wholesalePrice',
                render: text => {
                    return <span style={{color: '#990000'}}>{text}</span>
                }
            }, {
                title: '起批数量(含)',
                dataIndex: 'wholesaleThreshold',
                key: 'wholesaleThreshold',
                render: text => {
                    return <span style={{color: '#990000'}}>{text}</span>
                }
            },
            {
                title: '是否展示',
                dataIndex: 'display',
                key: 'display',
                render: (text) => {
                    if (text === 1) {
                        return <Tag color={'green'}>展示</Tag>
                    } else if (text === 2) {
                        return <Tag color={'volcano'}>隐藏</Tag>
                    } else {
                        return <Tag color={'geekblue'}>UNKNOW</Tag>
                    }
                }
            }, {
                title: '操作', dataIndex: '', key: 'x', render: (record) => {
                    return (
                        <div>
                            <div>
                                <Button type="dashed" onClick={() => {
                                    this.props.that.props.history.push(`/sku/edit/${record.productId}/${record.skuId}`)
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
                                            api.deleteSku({skuId: record.skuId}).then(res => {
                                                _this.handleLoadInnerList(_this.props.productId)
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
            rowKey={record => record.skuId}
            columns={columns}
            dataSource={this.state.list}
            pagination={false}
            footer={() =>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button type="link" onClick={() => {
                        this.props.that.props.history.push(`/sku/add/${this.props.productId}`)
                    }}>新增规格</Button>
                </div>
            }
        />
    }
}
