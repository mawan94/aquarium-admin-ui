import React from "react";
import PropTypes from "prop-types";
import {DatePicker} from 'antd';

export default class FormItemDatePicker extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        fieldName: PropTypes.string.isRequired,
        _this: PropTypes.object.isRequired,
    };

    render() {
        let {fieldName, _this} = this.props;
        return (
            <DatePicker.RangePicker style={{width: '180px'}}
                                    onChange={(date, dateStr) => {
                                        _this.handleChangeRangePicker(fieldName, date, dateStr)
                                    }}
            />
        )
    }
}
