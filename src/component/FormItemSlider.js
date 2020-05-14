import React, {Component} from 'react'
import {Slider} from 'antd'
import PropTypes from "prop-types";

export default class FormItemSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        fieldName: PropTypes.string.isRequired,
        setDefaultValue: PropTypes.func.isRequired,
        initValue: PropTypes.any,
        options: PropTypes.object.isRequired,
        handleFormItemChange:PropTypes.func.isRequired,
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
        let {fieldName,initValue, options,handleFormItemChange } = this.props;
        return (
            <Slider onChange={(disabled)=>handleFormItemChange(disabled,fieldName)} marks={options} defaultValue={initValue}/>
        )
    }

}
