import React from 'react'
import {Card, Table, Button} from 'antd';
import PropTypes from "prop-types";

export default class MyTable extends React.Component {
    constructor(props) {
        super(props)

    }

    static defaultProps = {
        expandedRowRender: null,
        onRow: () => {}
    };

    static propTypes = {
        expandedRowRender: PropTypes.func,
        handleLoadPage: PropTypes.func.isRequired,
        pageIndex: PropTypes.number,
        pageSize: PropTypes.number,
        total: PropTypes.number,
        buttonClick: PropTypes.func,
        onRow: PropTypes.func,
    };


    handleOnChangeSize = (current, size) => {
        this.props.handleLoadPage(current, size);
    };

    handleOnChangeIndex = (page, pageSize) => {
        this.props.handleLoadPage(page, pageSize);
    };

    render() {
        let total = this.props.total;
        let pageIndex = this.props.pageIndex;
        let pageSize = this.props.pageSize;

        const pagination = {
            size: 'defalut',
            total: total,
            showTotal: function (total) {
                return '总共' + total + '条数据';
            },
            current: pageIndex,
            pageSize: pageSize,
            showSizeChanger: true,
            onShowSizeChange: (current, size) => this.handleOnChangeSize(current, size),
            onChange: (page, pageSize) => this.handleOnChangeIndex(page, pageSize)
        };

        return (
            <div style={{backgroundColor: '#fff'}}>
                <Card
                    title=""
                    extra={<Button type='primary' onClick={this.props.buttonClick}>新增</Button>}
                    style={{width: '100%'}}
                >
                    <Table dataSource={this.props.dataSource}
                           columns={this.props.columns}
                           expandedRowRender={this.props.expandedRowRender}
                           pagination={pagination}
                           onRow={this.props.onRow}
                    />
                </Card>
            </div>
        )
    }

}
