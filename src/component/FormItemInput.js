import React from "react";
import PropTypes from "prop-types";
import {Input} from 'antd'

export default class FormItemInput extends React.Component {
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
            <Input
                // value={defaultValue}
                disabled={disabled}
                   onChange={(e) => {
                       // console.log(value)
                       _this.handleChangeInput(fieldName, e)
                   }}
                   placeholder={`请输入${labelName}`}/>
        )
    }
}
