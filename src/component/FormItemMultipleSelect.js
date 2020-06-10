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
        optionList: PropTypes.array.isRequired,
    };


    componentDidMount() {
        let {fieldName, initValue, setDefaultValue} = this.props;
        if (initValue) {
            let tempObj = {};
            tempObj[fieldName] = initValue;
            setDefaultValue(tempObj)
        }
    }

    // getDefaultValue = (optionList, initValue) => {
    //     let v = '';
    //     optionList.map(item => {
    //         if (item.value == initValue) {
    //             v = item.label
    //         }
    //     });
    //     return v
    // };

    render() {
        let {fieldName,initValue, optionList, handleFormItemChange} = this.props;
        return (
            <Select mode="multiple"
                    defaultValue={initValue}
                    onChange={(value) => handleFormItemChange(value, fieldName)}>
                {
                    optionList.map((item, index) => (
                        <Option key={index} value={item.value}>{item.label}</Option>
                    ))
                }
            </Select>
        )
    }

}
