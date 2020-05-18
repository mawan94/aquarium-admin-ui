import React from 'react'
import {notification, Upload, message, Button, Card} from 'antd';

import Detail_Form from '../../../component/Detail_Form'
import FORM_ITEM_TYPE from '../../../common/formItemType'
import api from '../../../common/api'
import util from '../../../common/util'

import storage from '../../../common/storage'
import constant from '../../../common/constant'

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formItemList: [
                {
                    fieldName: 'weight',
                    labelName: '展示优先级',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }
                , {
                    fieldName: 'images',
                    labelName: '商品缩略图',
                    initValue: [],
                    formItemType: FORM_ITEM_TYPE.IMAGE,
                    uploadMaxCount: 1,
                    required: true
                }, {
                    fieldName: 'redirectRouter',
                    labelName: '跳转页面',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: false,
                },

            ]
        }
    };

    componentDidMount() {
        let {formItemList} = this.state;
        if (this.props.match.params.id) {
            api.getBanner({bannerId: this.props.match.params.id}).then(res => {
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
        params.bannerId = this.props.match.params.id;
        if (params.bannerId) {
            api.updateBanner(params).then(res => {
                this.props.history.goBack()
            })
        } else {
            api.addBanner(params).then(res => {
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
