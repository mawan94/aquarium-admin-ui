import React from 'react'

import Detail_Form from '../../../component/Detail_Form'
import FORM_ITEM_TYPE from '../../../common/formItemType'
import api from '../../../common/api'
import util from "../../../common/util";

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formItemList: [
                {
                    fieldName: 'amount',
                    labelName: '充值面值',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'description',
                    labelName: '充值项描述',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'couponId',
                    labelName: '优惠券奖励',
                    formItemType: FORM_ITEM_TYPE.SELECT,
                    initValue: null,
                    optionList: [],
                    required: false
                }, {
                    fieldName: 'callDays',
                    labelName: '持续返还天数',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: false,
                }
            ]
        }
    };

    componentDidMount() {
        let {formItemList} = this.state;
        if (this.props.match.params.id) {
            api.getRechargeRule({rechargeRuleId: this.props.match.params.id}).then(res => {
                if (res.data) {
                    formItemList.map((item, index) => {
                        let key = item.fieldName;
                        formItemList[index].initValue = res.data[key]
                        console.log(`key: ${key}  initVal: ${res.data[key]}`)
                    })
                    this.handleLoadCouponSelectors(formItemList)
                }
            })
        } else {
            this.handleLoadCouponSelectors(formItemList)
        }
    }

    // // 加载分类下拉列表
    handleLoadCouponSelectors = (formItemList) => {
        api.getCouponSelectors().then(res => {
            this.setState({
                formItemList: util.initSelectDefaultValues('couponId', res.data, formItemList)
            })
        })
    }

    //表单提交
    handleSubmitForm = (params) => {
        params.rechargeRuleId = this.props.match.params.id;
        if (params.rechargeRuleId) {
            api.updateRechargeRule(params).then(res => {
                this.props.history.goBack()
            })
        } else {
            api.addRechargeRule(params).then(res => {
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
