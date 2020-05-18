import React from "react";
import PropTypes from "prop-types";
import {Switch} from 'antd'

export default class FormItemSwitch extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        initValue: PropTypes.number,
        fieldName: PropTypes.string.isRequired,
        handleFormItemChange: PropTypes.func
    };

    onChange = (checked) => {
        let {fieldName, handleFormItemChange} = this.props;
        handleFormItemChange(checked ? 1 : 2, fieldName)
    }

    render() {
        let {initValue} = this.props;
        if (initValue == 1) {
            return (
                <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked onChange={this.onChange}/>
            )
        } else if (initValue == 2) {
            return (
                <Switch checkedChildren="是" unCheckedChildren="否" onChange={this.onChange}/>
            )
        } else {
            return ""
        }
    }

}
