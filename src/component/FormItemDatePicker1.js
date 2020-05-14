import React from "react";
import PropTypes from "prop-types";
import {DatePicker} from 'antd';

export default class FormItemDatePicker1 extends React.Component {

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
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                    onOk={(value) => {console.log(value)}}
                                    onChange={(date, dateStr) => {
                                        _this.handleChangeRangePicker(fieldName, date, dateStr)
                                    }}
            />
        )
    }
}
