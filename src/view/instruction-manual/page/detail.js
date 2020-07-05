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
                    fieldName: 'instructionKey',
                    labelName: 'KEY',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'content',
                    labelName: '内容',
                    formItemType: FORM_ITEM_TYPE.EDIT,
                    initValue: null,
                    required: true
                }
            ]
        }
    };

    componentDidMount() {
        let {formItemList} = this.state;
        if (this.props.match.params.id) {
            api.getInstructionManual({instructionManualId: this.props.match.params.id}).then(res => {
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
        params.instructionManualId = this.props.match.params.id;
        if (params.instructionManualId) {
            api.updateInstructionManual(params).then(res => {
                this.props.history.goBack()
            })
        } else {
            api.addInstructionManual(params).then(res => {
                this.props.history.goBack()
            })
        }
    }

    render() {
        return (
            <div>
                <Detail_Form formItemList={this.state.formItemList}
                             handleSubmitForm={this.handleSubmitForm}/>
                <div style={{color: 'red'}}>请不要更改KEY ！请不要更改KEY ！请不要更改KEY ！</div>
            </div>
        )
    }
}
