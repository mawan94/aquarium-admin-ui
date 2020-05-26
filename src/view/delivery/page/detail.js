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
                    fieldName: 'startingPrice',
                    labelName: '起送价',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'packagingFee',
                    labelName: '包装费',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'serviceFeeRatio',
                    labelName: '服务费率',
                    formItemType: FORM_ITEM_TYPE.SLIDER,
                    initValue: '',
                    required: true,
                    options: {5: '5%', 20: '20%', 60: '60%'}
                }
            ]
        }
    };

    componentDidMount() {
        let {formItemList} = this.state;
        if (this.props.match.params.id) {
            api.getDelivery({deliveryId: this.props.match.params.id}).then(res => {
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
        params.deliveryId = this.props.match.params.id;
        if (params.deliveryId) {
            api.updateDelivery(params).then(res => {
                this.props.history.goBack()
            })
        } else {
            api.addDelivery(params).then(res => {
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
