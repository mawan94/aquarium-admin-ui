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
                    fieldName: 'supplierName',
                    labelName: '供应商名称',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'supplierTel',
                    labelName: '供应商电话',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'memorandum',
                    labelName: '备注',
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
            api.getSupplier({supplierId: this.props.match.params.id}).then(res => {
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
        params.supplierId = this.props.match.params.id;
        if (params.supplierId) {
            api.updateSupplier(params).then(res => {
                this.props.history.goBack()
            })
        } else {
            api.addSupplier(params).then(res => {
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
