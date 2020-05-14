import React from "react";
import PropTypes from "prop-types";
import {Select} from 'antd'

const {Option} = Select;
export default class FormItemSelect extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {defaultValue} = this.props;
        this.setState({value: defaultValue});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!nextProps.optionList.length) {
            this.setState({value: undefined});
        }
    }

    static propTypes = {
        defaultValue: PropTypes.string,
        fieldName: PropTypes.string.isRequired,
        labelName: PropTypes.string.isRequired,
        optionList: PropTypes.array,
        callback: PropTypes.func,
        mode: PropTypes.string,
        _this: PropTypes.object.isRequired,
    };

    static defaultProps = {
        mode: ''
    };

    state = {
        value: undefined
    };

    handleChange = (fieldName, value) => {
        let {callback, _this} = this.props;
        this.setState({value});
        _this.handleChangeSelect(fieldName, value, callback)
    };

    render() {
        let {labelName, fieldName, mode, optionList} = this.props;
        let {value} = this.state;
        let DOM = <Select value={value}
                          mode={mode}
                          allowClear={true}
                          placeholder={`请选择${labelName}`}
                          onChange={value => this.handleChange(fieldName, value)}
                          style={{width: 180}}
        >
            {
                optionList.map((item, index) =>
                    <Option key={index} value={item.value}>{item.label}</Option>
                )
            }
        </Select>;
        return (DOM)
    }

}
