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
                    fieldName: 'categoryName',
                    labelName: '分类名称',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: true,
                },{
                    fieldName: 'description',
                    labelName: '分类描述',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'images',
                    labelName: '分类图片',
                    initValue: [],
                    formItemType: FORM_ITEM_TYPE.IMAGE,
                    uploadMaxCount: 1,
                    required: true
                }, {
                    fieldName: 'weight',
                    labelName: '展示优先级',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'parentId',
                    labelName: '父级分类',
                    formItemType: FORM_ITEM_TYPE.SELECT,
                    initValue: null,
                    optionList: [],
                    required: false
                }, {
                    fieldName: 'display',
                    labelName: '是否展示',
                    formItemType: FORM_ITEM_TYPE.SWITCH,
                    initValue: 1,
                    required: true,
                }
            ]
        }
    };

    componentDidMount() {
        let {formItemList} = this.state;
        if (this.props.match.params.id) {
            api.getCategory({productCategoryId: this.props.match.params.id}).then(res => {
                if (res.data) {
                    formItemList.map((item, index) => {
                        let key = item.fieldName;
                        formItemList[index].initValue = res.data[key]
                        console.log(`key: ${key}  initVal: ${res.data[key]}`)
                    })
                    this.handleLoadParentCategories(formItemList)
                }
            })
        }else {
            this.handleLoadParentCategories(formItemList)
        }
    }

    // // 加载分类下拉列表
    handleLoadParentCategories = (formItemList) => {
        api.getParentCategoryList().then(res => {
            this.setState({
                formItemList: util.initSelectDefaultValues('parentId', res.data, formItemList)
            })
        })
    }

    //表单提交
    handleSubmitForm = (params) => {
        params.categoryId = this.props.match.params.id;
        if (params.categoryId) {
            api.updateCategory(params).then(res => {
                this.props.history.goBack()
            })
        } else {
            api.addCategory(params).then(res => {
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
