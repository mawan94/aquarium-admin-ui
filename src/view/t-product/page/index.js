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
            data: [],
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            loading: false,
            visible: false,
            disabled: false,
        }
    }

    // 钩子函数 頁面渲染完成时
    componentDidMount() {
        this.handleSearch(this.state.pageIndex, this.state.pageSize);
    }


    handleSearch = (pageIndex, pageSize) => {

    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({loading: true});
        setTimeout(() => {
            message.success('This is a success message');
            this.setState({loading: false, visible: false});
        }, 3000);
    };

    handleCancel = () => {
        this.setState({visible: false});
    };
    toggle = () => {
        this.setState({
            disabled: !this.state.disabled,
        });
    };


    render() {
        const {visible, loading} = this.state;

        return (
            <div>
                <MyForm _this={this} onRowDisplayNum={3} bindName={'condition'} fields={
                    [
                        {
                            fieldType: FORM_ITEM_TYPE.INPUT,
                            labelName: '商品编号',
                            fieldName: 'productId'
                        },
                        // {
                        //     fieldType: FORM_ITEM_TYPE.SELECT,
                        //     labelName: '所属分类',
                        //     fieldName: 'categoryId',
                        //     optionList: this.state.childCategories
                        // },
                        // {
                        //     fieldType: FORM_ITEM_TYPE.SELECT,
                        //     labelName: '供应商',
                        //     fieldName: 'supplierId',
                        //     optionList: this.state.supplierList
                        // },
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
                    <div style={styles.product_item}>
                        <img
                            style={styles.product_img}
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                        <div style={styles.card_content}>
                            <div style={styles.product_name}>PRODUCTNAMEPRODUCTNAMEPRODUCTNAMEPRODUCTNAME</div>
                            <div>STOCK: 108</div>
                        </div>
                        <div>
                            <Button type="primary" ghost onClick={() => this.showModal()}>ADD CART</Button>
                        </div>
                    </div>
                    {/* PRODUCT ITEM  END*/}
                </div>

                {/*   分页 BEGIN */}
                <div style={styles.pagination_wrap}>
                    <Pagination simple defaultCurrent={2} total={50} pageSize={20} onChange={(pageIndex, pageSize) => {
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
                            添加
                        </Button>,
                    ]}
                >
                    <div style={styles.modal_content_wrap}>
                        <div>
                            <img
                                style={styles.sku_img}
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        </div>
                        <div style={styles.box_content_wrap}>
                            <div style={styles.sku_box}>
                                <span style={styles.sku_text}>
                                    的故事的故事感受感受对的上
                                </span>
                            </div>

                            <div style={styles.sku_box_active}>
                                <span style={styles.sku_text}>
                                    123123124
                                </span>
                            </div>

                            <div style={styles.sku_box}>
                                <span style={styles.sku_text}>
                                    63辅导班电饭煲
                                </span>
                            </div>

                        </div>


                    </div>
                    <Divider/>
                    <div style={{width: '100%', display: 'flex', justifyContent: "center", alignItems: 'center'}}>
                        <span>调拨数量： </span>
                        <InputNumber min={1} max={10} disabled={this.state.disabled} defaultValue={3}/>
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
        padding: '10px 0',
        width: '180px',
        height: '70px',
        display: 'flex',
        flexDirection: 'column',
    },
    product_name: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
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


