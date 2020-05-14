import React, {Component} from 'react'
import {Select} from 'antd'
import PropTypes from "prop-types";

const Option = Select.Option;

export default class FormItemMultipleSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        fieldName: PropTypes.string.isRequired,
        setDefaultValue: PropTypes.func.isRequired,
        handleFormItemChange: PropTypes.func.isRequired,
        initValue: PropTypes.any,
        options: PropTypes.array.isRequired,
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
        let {fieldName,initValue, options, handleFormItemChange} = this.props;
        return (
            <Select mode="multiple"
                    defaultValue={initValue}
                    onChange={(value) => handleFormItemChange(value, fieldName)}>
                {
                    options.map((item, index) => (
                        <Option key={index} value={item.key}>{item.value}</Option>
                    ))
                }
            </Select>
        )
    }

}
