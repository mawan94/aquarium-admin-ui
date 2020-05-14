import React from "react";
import PropTypes from "prop-types";
import {InputNumber} from 'antd'

export default class FormItemInputNumber extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        defaultValue: PropTypes.string,
        fieldName: PropTypes.string.isRequired,
        labelName: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        _this: PropTypes.object.isRequired,
    };

    static defaultProps = {
        disabled: false, // 默认每行展示一个
    };

    render() {
        let {labelName, fieldName, defaultValue, _this, disabled} = this.props;
        return (
            <InputNumber
                style={{width: '180px'}}
                min={0}
                disabled={disabled}
                   onChange={(value) => {
                       _this.handleChangeInputNumber(fieldName, value)
                   }}
                   placeholder={`请输入${labelName}`}/>
        )
    }
}
