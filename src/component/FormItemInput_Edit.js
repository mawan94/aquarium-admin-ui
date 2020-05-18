import React, {Component} from 'react'
import {Input, InputNumber} from 'antd'
import PropTypes from "prop-types";

import FORM_ITEM_TYPE from '../common/formItemType'

export default class FormItemInput_Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        fieldName: PropTypes.string.isRequired,
        formItemType: PropTypes.string.isRequired,
        setDefaultValue: PropTypes.func.isRequired,
        handleFormItemChange: PropTypes.func.isRequired,
        initValue: PropTypes.any,
    };

    componentDidMount() {
        let {fieldName, initValue, setDefaultValue} = this.props;
        if (initValue) {
            let tempObj = {};
            tempObj[fieldName] = initValue;
            setDefaultValue(tempObj)
        }
    }

    render() {

        let {fieldName, formItemType, handleFormItemChange, initValue} = this.props;
        return (
            formItemType === FORM_ITEM_TYPE.TEXT ?

                <Input onChange={(e) => {
                    handleFormItemChange(e.target.value, fieldName)
                }} defaultValue={initValue}/> :
                formItemType === FORM_ITEM_TYPE.LONG_TEXT ?
                    <Input.TextArea rows={4} onChange={(e) => {
                        handleFormItemChange(e.target.value, fieldName)
                    }} defaultValue={initValue}/> :
                    <InputNumber style={{width: '100%'}} defaultValue={initValue} onChange={(e) => {
                        handleFormItemChange(e, fieldName)
                    }}/>
        )
    }
}
