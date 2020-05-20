import React from 'react'

import Detail_Form from '../../../component/Detail_Form'
import FORM_ITEM_TYPE from '../../../common/formItemType'
import api from '../../../common/api'

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formItemList: [
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
                    labelName: '封面图',
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
                    fieldName: 'wholesaleThreshold',
                    labelName: '起批数量（含）',
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
        }
    };

    componentDidMount() {
        let {formItemList} = this.state;
        let {skuId} = this.props.match.params;
        if (skuId) {
            api.getSku({skuId}).then(res => {
                if (res.data) {
                    formItemList.map((item, index) => {
                        let key = item.fieldName;
                        formItemList[index].initValue = res.data[key]
                        console.log(`key: ${key}  initVal: ${res.data[key]}`)
                    })
                    this.setState({formItemList})
                }
            })
        } else {
            this.setState({formItemList})
        }
    }


    //表单提交
    handleSubmitForm = (params) => {
        let {productId, skuId} = this.props.match.params;
        params.skuId = skuId;
        params.productId = productId;

        if (params.skuId) {
            api.updateSku(params).then(res => {
                this.props.history.goBack()
            })
        } else {
            api.addSku(params).then(res => {
                this.props.history.goBack()
            })
        }
    }

    render() {
        return (
            <div>
                <Detail_Form formItemList={this.state.formItemList}
                             handleSubmitForm={this.handleSubmitForm}/>
            </div>
        )
    }
}
