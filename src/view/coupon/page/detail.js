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
                    fieldName: 'couponName',
                    labelName: '优惠券名称',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'deduction',
                    labelName: '抵扣金额(元)',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'description',
                    labelName: '文字描述',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: true,
                }, , {
                    fieldName: 'couponType',
                    labelName: '类型（无门槛，满减）',
                    formItemType: FORM_ITEM_TYPE.SELECT,
                    initValue: null,
                    optionList: [{label: '无门槛', value: 1}, {label: '满减', value: 2}],
                    required: true
                }, {
                    fieldName: 'priceLimit',
                    labelName: '门槛金额(元)',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'useLimit',
                    labelName: '使用限制（1无限制，2钱包支付）',
                    formItemType: FORM_ITEM_TYPE.SELECT,
                    initValue: null,
                    optionList: [{label: '无限制', value: 1}, {label: '余额支付', value: 2}],
                    required: true
                }, {
                    fieldName: 'validityPeriod',
                    labelName: '有效期(天)',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }
            ]
        }
    };

    componentDidMount() {
        let {formItemList} = this.state;
        if (this.props.match.params.id) {
            api.getCoupon({couponId: this.props.match.params.id}).then(res => {
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
        params.couponId = this.props.match.params.id;
        if (params.couponId) {
            api.updateCoupon(params).then(res => {
                this.props.history.goBack()
            })
        } else {
            api.addCoupon(params).then(res => {
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
