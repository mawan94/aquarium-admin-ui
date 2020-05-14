import React, {Component} from 'react'
import {Cascader} from 'antd'
import PropTypes from "prop-types";

import city from '../common/city'
export default class FormItemCascader extends Component {
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

    setDefaultValue = (initValue) => {
        return initValue ?
            initValue.split('/') : []
    };

    render() {
        console.log(city)
        let {fieldName, initValue, handleFormItemChange,options} = this.props;
        return (
            <Cascader defaultValue={this.setDefaultValue(initValue)} options={options} onChange={(value) => {
                handleFormItemChange(value.join('/'), fieldName)
            }}/>
        )
    }

}
