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
                    fieldName: 'orderStatus',
                    labelName: '订单状态',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'actualPay',
                    labelName: '实际付款',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'adminRemark',
                    labelName: '商家备注',
                    formItemType: FORM_ITEM_TYPE.EDIT,
                    initValue: null,
                    required: false
                }
            ]
        }
    };

    componentDidMount() {
        let {formItemList} = this.state;
        api.getOrder({orderId: this.props.match.params.id}).then(res => {
            if (res.data) {
                formItemList.map((item, index) => {
                    let key = item.fieldName;
                    formItemList[index].initValue = res.data[key]
                    console.log(`key: ${key}  initVal: ${res.data[key]}`)
                })
                this.setState({formItemList})
            }
        })
    }

    //表单提交
    handleSubmitForm = (params) => {
        params.orderId = this.props.match.params.id;
        api.updateOrder(params).then(res => {
            this.props.history.goBack()
        })
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
