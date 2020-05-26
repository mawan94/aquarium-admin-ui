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
                    fieldName: 'menuTagName',
                    labelName: '菜单名称',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: true,
                }, {
                    fieldName: 'parentMenuId',
                    labelName: '父级菜单',
                    formItemType: FORM_ITEM_TYPE.SELECT,
                    initValue: null,
                    optionList: [],
                    required: false
                }, {
                    fieldName: 'link',
                    labelName: '路由链接',
                    formItemType: FORM_ITEM_TYPE.TEXT,
                    initValue: '',
                    required: false,
                }, {
                    fieldName: 'weight',
                    labelName: '权重',
                    formItemType: FORM_ITEM_TYPE.NUMBER,
                    initValue: '',
                    required: true,
                }
            ]
        }
    };

    componentDidMount() {
        let {formItemList} = this.state;
        if (this.props.match.params.id) {
            api.getMenu({menuId: this.props.match.params.id}).then(res => {
                if (res.data) {
                    formItemList.map((item, index) => {
                        let key = item.fieldName;
                        formItemList[index].initValue = res.data[key]
                        console.log(`key: ${key}  initVal: ${res.data[key]}`)
                    })
                    this.handleLoadParentMenuSelectors(formItemList)
                }
            })
        } else {
            this.handleLoadParentMenuSelectors(formItemList)
        }
    }

    handleLoadParentMenuSelectors = (formItemList) => {
        api.getMenuSelectors().then(res => {
            this.setState({
                formItemList: util.initSelectDefaultValues('parentMenuId', res.data, formItemList)
            })
        })
    }

    //表单提交
    handleSubmitForm = (params) => {
        params.menuId = this.props.match.params.id;
        if (params.menuId) {
            api.updateMenu(params).then(res => {
                this.props.history.goBack()
            })
        } else {
            api.addMenu(params).then(res => {
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
