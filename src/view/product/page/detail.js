import React from 'react'
import FORM_ITEM_TYPE from '../../../common/formItemType'
import api from '../../../common/api'
import util from '../../../common/util'
import {Button, Card, Divider, Form, message, Popconfirm} from "antd";
import {withRouter} from "react-router-dom";
import FormItemInput from "../../../component/FormItemInput_Edit";
import FormItemSelect from "../../../component/FormItemSelect_Edit";
import FormItemPicturesWall from "../../../component/FormItemPicturesWall";
import FormItemSwitch from "../../../component/FormItemSwitch";
import Detail_Form from "../../../component/Detail_Form";

const FormItem = Form.Item;
// formItem css 样式
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
    }
};
// 保存按钮 css 样式
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    }
};

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // skuInfoList: [],
            skuFormItemList: [{
                key: util.guid(), value: [
                    {
                        fieldName: 'skuName',
                        labelName: '规格名称',
                        formItemType: FORM_ITEM_TYPE.TEXT,
                        initValue: '',
                        required: true,
                    }, {
                        fieldName: 'stock',
                        labelName: '库存',
                        formItemType: FORM_ITEM_TYPE.NUMBER,
                        initValue: '',
                        required: true,
                    }, {
                        fieldName: 'display',
                        labelName: '是否展示',
                        formItemType: FORM_ITEM_TYPE.SWITCH,
                        initValue: 1,
                        required: true,
                    }, {
                        fieldName: 'images',
                        labelName: '商品封面图',
                        initValue: [],
                        formItemType: FORM_ITEM_TYPE.IMAGE,
                        uploadMaxCount: 1,
                        required: false
                    }, {
                        fieldName: 'retailPrice',
                        labelName: '零售价',
                        formItemType: FORM_ITEM_TYPE.NUMBER,
                        initValue: '',
                        required: true,
                    }, {
                        fieldName: 'wholesalePrice',
                        labelName: '批发价',
                        formItemType: FORM_ITEM_TYPE.NUMBER,
                        initValue: '',
                        required: true,
                    }, {
                        fieldName: 'purchasePrice',
                        labelName: '进货价',
                        formItemType: FORM_ITEM_TYPE.NUMBER,
                        initValue: '',
                        required: true,
                    },
                ]
            }],
            formItemList: [
                {
                    fieldName: 'categoryId',
                    labelName: '商品分类',
                    formItemType: FORM_ITEM_TYPE.SELECT,
                    initValue: null,
                    optionList: [],
                    required: true
                },
                {
                    fieldName: 'supplierId',
                    labelName: '供应商',
                    formItemType: FORM_ITEM_TYPE.SELECT,
                    initValue: null,
                    optionList: [],
                    required: true
                },
                {
                    fieldName: 'productName',
                    labelName: '商品名称',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'description',
                    labelName: '商品描述',
                    formItemType: FORM_ITEM_TYPE.LONG_TEXT,
                    initValue: '',
                    required: false,
                }, {
                    fieldName: 'images',
                    labelName: '商品封面图',
                    initValue: [],
                    formItemType: FORM_ITEM_TYPE.IMAGE,
                    uploadMaxCount: 1,
                    required: true
                }, {
                    fieldName: 'weight',
                    labelName: '展示优先级',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'display',
                    labelName: '是否展示',
                    formItemType: FORM_ITEM_TYPE.SWITCH,
                    initValue: 1,
                    required: true,
                }, {
                    fieldName: 'mediaInformation',
                    labelName: '媒体展示',
                    formItemType: FORM_ITEM_TYPE.EDIT,
                    initValue: null,
                    required: false
                }
            ]
        }
    };

    componentDidMount() {
        let {formItemList} = this.state;
        if (this.props.match.params.id) {
            api.getProduct({productId: this.props.match.params.id}).then(res => {
                if (res.data) {
                    formItemList.map((item, index) => {
                        let key = item.fieldName;
                        formItemList[index].initValue = res.data[key]
                        console.log(`key: ${key}  initVal: ${res.data[key]}`)
                    })
                    this.handleCategorySelectors(formItemList)
                    this.handleSupplierSelectors(formItemList)
                }
            })
        } else {
            this.handleCategorySelectors(formItemList)
            this.handleSupplierSelectors(formItemList)
        }
    }

    handleCategorySelectors = (formItemList) => {
        api.getCategorySelectors().then(res => {
            this.setState({
                formItemList: util.initSelectDefaultValues('categoryId', res.data, formItemList)
            })
        })
    }

    handleSupplierSelectors = (formItemList) => {
        api.getSupplierSelectors().then(res => {
            this.setState({
                formItemList: util.initSelectDefaultValues('supplierId', res.data, formItemList)
            })
        })
    }

    handleAppendSkuInfo = () => {
        let {skuFormItemList} = this.state
        skuFormItemList.push({
            key: util.guid(), value: [
                {
                    fieldName: 'skuName',
                    labelName: '规格名称',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'stock',
                    labelName: '库存',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'display',
                    labelName: '是否展示',
                    formItemType: FORM_ITEM_TYPE.SWITCH,
                    initValue: 1,
                    required: true,
                }, {
                    fieldName: 'images',
                    labelName: '商品封面图',
                    initValue: [],
                    formItemType: FORM_ITEM_TYPE.IMAGE,
                    uploadMaxCount: 1,
                    required: false
                }, {
                    fieldName: 'retailPrice',
                    labelName: '零售价',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'wholesalePrice',
                    labelName: '批发价',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'purchasePrice',
                    labelName: '进货价',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                },
            ]
        })
        this.setState({skuFormItemList})
        message.info('操作成功');
    }

    handleRemoveSkuInfo = (key) => {
        let {skuFormItemList} = this.state
        if (skuFormItemList.length === 1) {
            message.info('至少有一个规格');
            return;
        }
        let newSkuFormItemList = skuFormItemList.filter(item => {
            return item.key !== key
        })

        this.setState({
            skuFormItemList: newSkuFormItemList,
        })
        message.info('操作成功');
    }

    validateSkuListForm = () => {
        let flag = true
        let {skuFormItemList} = this.state;
        skuFormItemList.map(item => {
            item.value.map(innerItem => {
                let required = innerItem.required;
                let value = innerItem.initValue;
                if (required) {
                    if (value === null || value === '' || value === undefined || value.length < 1) {
                        message.error('【' + innerItem.labelName + '】不能为空！');
                        flag = false;
                    }
                }
            })
        })
        return flag
    }


    switchItem(item, key) {
        const type = item.formItemType;
        switch (type) {
            case FORM_ITEM_TYPE.NUMBER :
            case FORM_ITEM_TYPE.TEXT :
            case FORM_ITEM_TYPE.LONG_TEXT :
                return <FormItemInput fieldName={item.fieldName}
                                      formItemType={type}
                                      handleFormItemChange={(value, fieldName) => {
                                          this.handleFormItemChange(value, fieldName, key)
                                      }}
                                      initValue={item.initValue}
                                      setDefaultValue={this.setDefaultValue}
                />;
                break;

            case FORM_ITEM_TYPE.SELECT:
                return (
                    <FormItemSelect fieldName={item.fieldName}
                                    setDefaultValue={this.setDefaultValue}
                                    handleFormItemChange={(value, fieldName) => {
                                        this.handleFormItemChange(value, fieldName, key)
                                    }}
                                    initValue={item.initValue}
                                    optionList={item.optionList}
                    />
                );
                break;
            case FORM_ITEM_TYPE.IMAGE:
                return <FormItemPicturesWall fieldName={item.fieldName}
                                             setDefaultValue={this.setDefaultValue}
                                             initValue={item.initValue}
                                             handleFormItemChange={(value, fieldName) => {
                                                 this.handleFormItemChange(value, fieldName, key)
                                             }}
                                             uploadMaxCount={item.uploadMaxCount}
                />;
                break;
            case FORM_ITEM_TYPE.SWITCH:
                return <FormItemSwitch fieldName={item.fieldName}
                                       setDefaultValue={this.setDefaultValue}
                                       initValue={item.initValue}
                                       handleFormItemChange={(value, fieldName) => {
                                           this.handleFormItemChange(value, fieldName, key)
                                       }}
                />;
                break;
            default:
                break;
        }
    }

    // 设置默认值
    setDefaultValue = (entry) => {
        this.setState({...entry})
    };

    // 监听表单元素变化
    handleFormItemChange = (value, fieldName, key) => {
        let {skuFormItemList} = this.state;
        skuFormItemList.map(item => {
            if (item.key === key) {
                item.value.map(innerItem => {
                    if (innerItem.fieldName === fieldName) {
                        innerItem.initValue = value
                    }
                })
            }
        })
    };

    //表单提交
    handleSubmitForm = (params) => {
        if (!this.validateSkuListForm()) return;
        params.productId = this.props.match.params.id;
        let {skuFormItemList} = this.state
        // 组装请求参数
        let productBO = {};
        let skuInfoList = []
        skuFormItemList.map(item => {
            let skuInfo = {}
            item.value.map(inner => {
                skuInfo[inner.fieldName] = inner.initValue
            })
            skuInfo.productId = params.productId
            skuInfoList.push(skuInfo)
        })
        productBO.productEditBO = params
        productBO.skuEditBO = skuInfoList

        console.log(productBO)

        return
        if (params.productId) {
            api.updateProduct(params).then(res => {
                this.props.history.goBack()
            })
        } else {
            api.addProduct(params).then(res => {
                this.props.history.goBack()
            })
        }
    }

    render() {
        return (
            <div>
                {/* sku */}
                <Card
                    title="规格信息"
                    extra={<>
                        <Button type="primary" onClick={this.handleAppendSkuInfo}>添加</Button>
                    </>}
                    style={{height: '100%', margin: '30px'}}
                >
                    <div style={{height: '100%', margin: '30px'}}>
                        <Form>
                            {
                                this.state.skuFormItemList.map((item, index) => {
                                    let DOM = [];
                                    item.value.map((innerItem, innerIndex) => {
                                        DOM.push(<FormItem
                                            key={`${item.key}${innerIndex}`}
                                            {...formItemLayout}
                                            label={innerItem.labelName}
                                            required={innerItem.required}
                                            hasFeedback
                                        >
                                            {this.switchItem(innerItem, item.key)}
                                        </FormItem>)
                                        if (innerIndex === item.value.length - 1) {
                                            DOM.push(<Divider plain>
                                                <Popconfirm title="确定要移除该规格吗？" okText="Yes" cancelText="No" onConfirm={
                                                    () => {
                                                        this.handleRemoveSkuInfo(item.key)
                                                    }
                                                }>
                                                    <span style={{color: 'red'}}>*********************************** CLICK TO REMOVE ***********************************</span>
                                                </Popconfirm>
                                            </Divider>)
                                        }
                                    })
                                    return DOM
                                })
                            }
                        </Form>
                    </div>
                </Card>


                {/* product  */}
                <Detail_Form cardName={'商品信息'}
                             formItemList={this.state.formItemList}
                             handleSubmitForm={this.handleSubmitForm}/>
            </div>
        )
    }
}

export default withRouter(Form.create()(Detail))