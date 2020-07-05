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
                    formItemType: FORM_ITEM_TYPE.SELECT,
                    initValue: null,
                    optionList: [
                        {label: '待付款', value: 1},
                        {label: '已付款', value: 2},
                        {label: '待发货', value: 3},
                        {label: '配送中', value: 4},
                        {label: '交易完成', value: 5},
                        {label: '已退款', value: 6},
                        {label: '超时', value: 7},
                    ],
                    required: true
                },
                {
                    fieldName: 'logisticsCode',
                    labelName: '物流公司',
                    formItemType: FORM_ITEM_TYPE.SELECT,
                    initValue: null,
                    optionList: [
                        {label: '顺丰速运', value: 'SF'},
                        {label: '百世快递', value: 'HTKY'},
                        {label: '中通快递', value: 'ZTO'},
                        {label: '申通快递', value: 'STO'},
                        {label: '圆通速递', value: 'YTO'},
                        {label: '韵达速递', value: 'YD'},
                        {label: '邮政快递包裹', value: 'YZPY'},
                        {label: '天天快递', value: 'HHTT'},
                        {label: '京东快递', value: 'JD'},
                        {label: '优速快递', value: 'UC'},
                        {label: '德邦快递', value: 'DBL'},
                        {label: 'TNT快递', value: 'TNT'},
                        {label: 'UPS', value: 'UPS'},
                        {label: 'DHL', value: 'DHL'},
                        {label: 'FEDEX联邦(国内件）', value: 'FEDEX'},
                        {label: 'FEDEX联邦(国际件）', value: 'FEDEX_GJ'},
                        {label: '-- 未知/其他 --', value: null},
                    ],
                    required: false,
                },
                {
                    fieldName: 'logisticsId',
                    labelName: '物流单号',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: false,
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
