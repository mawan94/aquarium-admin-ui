import React from 'react'
import {notification, Upload, message, Button, Card} from 'antd';

import ModifyForm from '../../../component/ModifyForm'
import FORM_ITEM_TYPE from '../../../common/formItemType'
import api from '../../../common/api'
import storage from '../../../common/storage'
import constant from '../../../common/constant'

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formItemList: [
                {
                    fieldName: 'avatarName',
                    labelName: '作者名称',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'images',
                    labelName: '商品缩略图',
                    initValue: [],
                    formItemType: FORM_ITEM_TYPE.IMAGE,
                    uploadMaxCount: 1,
                    required: true
                }
                , {
                    fieldName: 'avatarType',
                    labelName: '角色类型',
                    formItemType: FORM_ITEM_TYPE.SELECT,
                    initValue: 1,
                    optionList: [{key: 1, value: '作者'}, {key: 2, value: '虚拟会员'}],
                    required: true
                }
            ]
        }
    };
    componentDidMount() {
        let {formItemList} = this.state;
        if (this.props.match.params.id) {
            //加载数据回显
            // http.request({
            //     url: '/backend/avatar/v1/find',
            //     data: {
            //         avatarId: this.props.match.params.id
            //     },
            //     method: 'get',
            //     success: (response) => {
            //         if (response.data) {
            //             formItemList.map((item, index) => {
            //                 let key = item.fieldName;
            //                 console.log(response.data[key])
            //                 formItemList[index].initValue = response.data[key]
            //             })
            //             this.setState({formItemList})
            //         }
            //     },
            //     complete: () => {
            //     }
            // })

        } else {//add
            this.setState({formItemList})
        }
    }

    //表单提交
    handleSubmitForm = (params) => {
        // params.avatarId = this.props.match.params.id;
        // http.request({
        //     url: this.props.match.params.id ? '/backend/avatar/v1/modify' : '/backend/avatar/v1/add',
        //     data: {
        //         ...params
        //     },
        //     method: 'post',
        //     success: (response) => {
        //         this.props.history.goBack()
        //     },
        //     complete: () => {
        //     }
        // })

    }

    render() {
        return (
            <div>
                <ModifyForm formItemList={this.state.formItemList} handleSubmitForm={this.handleSubmitForm}/>
            </div>
        )
    }
}
