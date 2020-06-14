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
                    fieldName: 'articleTitle',
                    labelName: '文章标题',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'tagId',
                    labelName: '文章标签',
                    formItemType: FORM_ITEM_TYPE.SELECT,
                    initValue: null,
                    optionList: [],
                    required: false
                }, {
                    fieldName: 'productBindIds',
                    labelName: '关联商品',
                    formItemType: FORM_ITEM_TYPE.MULTIPLE_SELECT,
                    initValue: [],
                    optionList: [],
                    required: false
                }, {
                    fieldName: 'images',
                    labelName: '封面图片',
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
                    fieldName: 'content',
                    labelName: '文章内容',
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
            api.getArticle({articleId: this.props.match.params.id}).then(res => {
                if (res.data) {
                    formItemList.map((item, index) => {
                        let key = item.fieldName;
                        formItemList[index].initValue = res.data[key]
                        console.log(`key: ${key}  initVal: ${res.data[key]}`)
                    })
                    this.handleLoadTagSelectorList(formItemList)
                    // this.handleLoadProductSelectorList(formItemList)
                }
            })
        }else {
            this.handleLoadTagSelectorList(formItemList)
            // this.handleLoadProductSelectorList(formItemList)

        }
    }


    handleLoadTagSelectorList = (formItemList) => {
        api.tagSelectors().then(res => {
            this.setState({
                formItemList: util.initSelectDefaultValues('tagId', res.data, formItemList)
            })
            this.handleLoadProductSelectorList(this.state.formItemList)
        })
    }

    handleLoadProductSelectorList = (formItemList) => {
        api.productSelectors().then(res => {
            this.setState({
                formItemList: util.initSelectDefaultValues('productBindIds', res.data, formItemList)
            })
        })
    }

    //表单提交
    handleSubmitForm = (params) => {
        params.articleId = this.props.match.params.id;
        if (params.articleId) {
            api.updateArticle(params).then(res => {
                this.props.history.goBack()
            })
        } else {
            api.addArticle(params).then(res => {
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
