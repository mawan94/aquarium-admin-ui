import React from 'react'
import {Button, Modal, Divider, InputNumber, Card, Pagination, message} from 'antd';
import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';


import MyTable from '../../../component/MyTable'
import api from '../../../common/api'
import MyImg from "../../../component/MyImg";
import constant from "../../../common/constant";
import FORM_ITEM_TYPE from "../../../common/formItemType";
import MyForm from "../../../component/MyForm";

const confirm = Modal.confirm;
const {Meta} = Card;

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // 表单条件
            condition: {},

            data: [],
            skuData: [],
            pageIndex: 1,
            pageSize: 20,
            total: 0,
            loading: false,
            visible: false,
            disabled: false,

            childCategories: [],

            currentSku: {},
            value: 1
        }
    }

    // 钩子函数 頁面渲染完成时
    componentDidMount() {
        this.handlerInitChildCategory()
        this.handleSearch(this.state.pageIndex, this.state.pageSize);
    }

    // initChildCategory
    handlerInitChildCategory = () => {
        api.getChildCategorySelectors().then(res => {
            this.setState({
                childCategories: res.data
            })
        })
    }

    handleLoadSkuList = (productId) => {
        api.getSkuListByProductId({productId}).then(res => {
            this.setState({skuData: res.data})
        })
    }


    handleSearch = (pageIndex, pageSize) => {
        api.getProductList({...this.state.condition, pageIndex, pageSize}).then(res => {
            let {records, total} = res.data;
            this.setState({total, pageIndex, pageSize, data: records})
            console.log(this.state)
        })
    };
    handleClickSku = (sku) => {
        console.log(sku)
        this.setState({currentSku: sku})
    }

    showModal = (product) => {
        console.log(product)
        this.setState({
            visible: true
        });
        this.handleLoadSkuList(product.productId)

    };

    handleOk = () => {
        let {currentSku} = this.state
        if (!currentSku.skuId) {
            message.error('请选择规格');
            return
        }
        api.updateStock({...currentSku, newStock: currentSku.stock}).then(res => {
            message.success('调整成功');
            this.handleCancel()
        })
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            currentSku: {},
            skuData: [],
            value: 1
        });

    };


    toggle = () => {
        this.setState({
            disabled: !this.state.disabled,
        });
    };


    render() {
        const {visible, loading, data, skuData, currentSku} = this.state;
        let productCardItem = []
        let skuItem = []
        data.map(item => {
            productCardItem.push(
                <div style={styles.product_item}>
                    <img
                        style={styles.product_img}
                        src={constant.imgHost + item.filePath}
                    />
                    <div style={styles.card_content}>
                        <p>{item.productName}</p>
                    </div>
                    <div>
                        <Button style={{zIndex: 2}} type="primary" onClick={() => this.showModal(item)}>调整库存</Button>
                    </div>
                </div>)
        })
        skuData.map(item => {
            skuItem.push(
                <div style={currentSku && currentSku.skuId == item.skuId ? styles.sku_box_active : styles.sku_box}
                     onClick={() => this.handleClickSku(item)}>
                                <span
                                    style={styles.sku_text}>
                                    {item.skuName}
                                </span>
                </div>)
        })

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


                {/* PRODUCT WRAP*/}
                <div style={styles.product_container}>
                    {/* PRODUCT ITEM  BEGIN*/}
                    {productCardItem}
                    {/* PRODUCT ITEM  END*/}
                </div>

                {/*   分页 BEGIN */}
                <div style={styles.pagination_wrap}>
                    <Pagination simple defaultCurrent={this.state.pageIndex} total={this.state.total}
                                pageSize={this.state.pageSize} onChange={(pageIndex, pageSize) => {
                        this.handleSearch(pageIndex, pageSize)
                        console.log(`pageIndex: ${pageIndex},pageSize: ${pageSize}`)
                    }}/>
                </div>
                {/*   分页 END */}


                <Modal
                    visible={visible}
                    title="规格列表"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            确认调整
                        </Button>,
                    ]}
                >
                    <div style={styles.modal_content_wrap}>
                        <div>
                            <img
                                style={styles.sku_img}
                                alt="example"
                                src={currentSku && currentSku.filePath ? constant.imgHost + currentSku.filePath : '/bgimg.png'}
                            />
                        </div>
                        <div style={styles.box_content_wrap}>
                            {skuItem}
                        </div>
                    </div>
                    <Divider/>
                    <div style={{width: '100%', display: 'flex', justifyContent: "center", alignItems: 'center'}}>
                        <span>最新库存： </span>
                        <InputNumber min={1} disabled={this.state.disabled}
                                     value={this.state.currentSku.stock}
                                     onChange={(value) => {
                                         let currentSku = this.state.currentSku;
                                         currentSku.stock = value
                                         this.setState({currentSku})
                                     }}/>
                    </div>
                </Modal>

            </div>
        )
    }
}

const styles = {
    product_container: {
        display: 'flex',
        marginTop: '35px',
        flexFlow: 'row  wrap',
        justifyContent: 'center'
    },
    product_item: {
        boxShadow: '2px 5px 5px #e1e0e0',
        borderRadius: '6px',
        padding: '0 5px 15px 5px',
        margin: '10px'
    },

    product_img: {
        width: '180px',
        height: '180px',
        objectFit: 'cover',
        borderRadius: '6px',
    },
    sku_img: {
        width: '110px',
        height: '110px',
        objectFit: 'cover',
        borderRadius: '6px',
    },

    card_content: {
        padding: '10px 2px',
        width: '180px',
        height: '70px',
        // display: 'flex',
        // flexDirection: 'column',
    },
    product_name: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        webkitLineClamp: '3',
        webkitBoxOrient: 'vertical',
    },
    pagination_wrap: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    box_content_wrap: {
        marginLeft: '28px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flex: 1,
    },
    modal_content_wrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    sku_box_active: {
        color: '#ff6633',
        border: '1px solid #ff6633',
        borderRadius: '3px',
        margin: '5px 0',
        cursor: 'pointer'
    },
    sku_box: {
        color: '#999',
        border: '1px solid #999',
        borderRadius: '3px',
        margin: '5px 0',
        cursor: 'pointer'
    },
    sku_text: {
        margin: '8px'
    }
}


