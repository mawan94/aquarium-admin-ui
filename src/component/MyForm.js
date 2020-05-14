import React from "react";
import PropTypes from "prop-types";
import {Form, Row, Col, Card, Button, message} from 'antd';

import FORM_TYPE from '../common/formItemType'
import FormItemInput from './FormItemInput'
import FormItemInputNumber from './FormItemInputNumber'
import FormItemSelect from './FormItemSelect'
import FormItemDatePicker from './FormItemDatePicker'
import FormItemDatePicker1 from './FormItemDatePicker1'

const FormItem = Form.Item;

class MyForm extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        /**
         * 表头名称
         */
        headName: PropTypes.string,
        /**
         * 表头名称
         */
        headBackgroundColor: PropTypes.string,
        /**
         * 一行展示多少个
         * */
        onRowDisplayNum: PropTypes.number.isRequired,
        /**
         * {
         *     fieldType ,  类型
         *     labelName ,   标签
         *     fieldName ,  属性名称
         *     defaultValue , 默认值
         *     require , 是否必填
         *     optionList , 针对select组件的扩展
         *     callback , 针对select组件的扩展
         * }
         * */
        fields: PropTypes.array.isRequired,
        /**
         * 上层组件state里数据的key,
         * 主要是将把监听到的事件变化产生的新值映射到上层的state里。
         */
        bindName: PropTypes.string.isRequired,
        /**
         * 传递过来的this 对象
         */
        _this: PropTypes.object.isRequired,// this 对象
        /**
         * 按钮数组
         * {
         *     type, 按钮样式
         *     callback, 按钮点击回调函数
         *     verifyCondition, 校验 require : true 的参数
         *     text 按钮文本
         * }
         */
        buttonList: PropTypes.array
    };

    static defaultProps = {
        onRowDisplayNum: 1, // 默认每行展示一个
        headName: '搜索条件',
        headBackgroundColor: '#fff'
    };

    state = {
        rules: []
    };

    /**
     * Input onChange事件回调
     */
    handleChangeInput = (fieldName, e) => {
        this.handleBuildOuterLayerComponentState(fieldName, e.target.value)
    };
    /**
     * InputNumber onChange事件回调
     */
    handleChangeInputNumber = (fieldName, value) => {
        this.handleBuildOuterLayerComponentState(fieldName, value)
    };
    /**
     * Select onChange事件回调
     */
    handleChangeSelect = (fieldName, value, callback) => {
        this.handleBuildOuterLayerComponentState(fieldName, value);
        if (callback) callback(fieldName, value)
    };
    /**
     * DatePicker.RangePicker onChange事件回调
     */
    handleChangeRangePicker = (fieldName, date, dateString) => {
        this.handleBuildOuterLayerComponentState(fieldName, dateString);
    };
    /**
     * 组装外部组件state值
     * @param fieldName
     * @param value
     */
    handleBuildOuterLayerComponentState = (fieldName, value) => {
        let {_this, bindName} = this.props;
        let condition = _this.state[bindName];
        condition[fieldName] = value;
        let tempWrapper = {};
        tempWrapper[bindName] = condition;
        _this.setState({...tempWrapper})
    };

    getFields = (fields) => {
        const children = [];
        const {onRowDisplayNum} = this.props;
        const colSpan = 24 / onRowDisplayNum; // 所占横向比例
        let tempRuleFields = [];
        for (let i = 0; i < fields.length; i++) {
            let {fieldType, fieldName, labelName, defaultValue, optionList, required, callback} = fields[i];
            // 把require 的字段添加到 rule里面
            if (required) {
                tempRuleFields.push({fieldName, labelName})
            }
            children.push(
                <Col span={colSpan} key={fieldName}>
                    <FormItem label={required ?
                        <span> <span style={{color: 'red'}}>* </span>{labelName}</span>
                        :
                        <span>{labelName}</span>
                    }>
                        {
                            fieldType === FORM_TYPE.INPUT ?
                                <FormItemInput _this={this} fieldName={fieldName}
                                               labelName={labelName} defaultValue={defaultValue}/>
                                :
                                fieldType === FORM_TYPE.SELECT || fieldType === FORM_TYPE.MULTIPLE_SELECT ?
                                    <FormItemSelect labelName={labelName} fieldName={fieldName}
                                                    mode={fieldType === FORM_TYPE.MULTIPLE_SELECT ? 'tags' : ''}
                                                    callback={callback}
                                                    _this={this} defaultValue={defaultValue}
                                                    optionList={optionList}/>
                                    :
                                    fieldType === FORM_TYPE.RANGE_PICKER ?
                                        <FormItemDatePicker fieldName={fieldName} _this={this}/>
                                        :
                                        fieldType === FORM_TYPE.INPUT_NUMBER ?
                                            <FormItemInputNumber fieldName={fieldName} _this={this}
                                                                 labelName={labelName}/>
                                            : fieldType === FORM_TYPE.RANGE_PICKER1 ?
                                            <FormItemDatePicker1 fieldName={fieldName} _this={this}/> : void (0)
                        }
                    </FormItem>
                </Col>
            );
        }
        let {rules} = this.state;
        rules = Object.assign(rules, tempRuleFields);

        return children;
    };

    render() {
        let {onRowDisplayNum, fields, headName, headBackgroundColor, buttonList, _this, bindName} = this.props;
        let fieldsLength = fields.length;
        let subFields = [];
        let itemDOM = [];
        let buttonDOM = [];
        if (buttonList && buttonList.length) {
            buttonList.map((item, index) => buttonDOM.push(<Button key={item + index}
                                                                   style={{margin: '0 10px'}}
                                                                   type={item.type}
                                                                   onClick={() => {
                                                                       //  校验必要参数是否合法填写
                                                                       if (item.verifyCondition) {
                                                                           let params = _this.state[bindName];
                                                                           let {rules} = this.state;
                                                                           let flag = true;
                                                                           rules.map(item => {
                                                                               if (params[item.fieldName] !== 0 && !params[item.fieldName]) {
                                                                                   message.warn(item.labelName + ' 不能为空！');
                                                                                   flag = false;
                                                                                   return
                                                                               }
                                                                           });
                                                                           if (flag) {
                                                                               item.callback()
                                                                           }
                                                                       } else {
                                                                           item.callback()
                                                                       }
                                                                   }}>
                {item.text}
            </Button>))
        }
        return (
            <div>
                <Card
                    title={headName}
                    style={{width: '100%'}}
                    headStyle={{backgroundColor: headBackgroundColor}}
                >
                    <Form layout="inline"
                          className="ant-advanced-search-form"
                    >
                        {
                            fields.map((item, index) => {
                                subFields.push(item);
                                if (subFields.length === onRowDisplayNum || index === fieldsLength - 1) {
                                    itemDOM.push(<Row gutter={24} key={index}>{this.getFields(subFields)}</Row>);
                                    subFields = []
                                }
                                if (index === fieldsLength - 1) {
                                    return itemDOM
                                }
                            })
                        }
                    </Form>
                    {
                        buttonDOM && buttonDOM.length ?
                            buttonDOM
                            :
                            ''
                    }

                </Card>
            </div>
        )
    }
}

export default Form.create({name: 'myForm'})(MyForm);
