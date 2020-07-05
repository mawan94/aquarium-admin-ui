import React from 'react'
import {Button, Modal, Table} from 'antd';

import MyTable from '../../../component/MyTable'
import api from '../../../common/api'

const confirm = Modal.confirm;

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            pageIndex: 1,
            pageSize: 10,
            total: 0,
        }
    }

    // 钩子函数 頁面渲染完成时
    componentDidMount() {
        this.handleSearch(this.state.pageIndex, this.state.pageSize);
    }


    handleSearch = (pageIndex, pageSize) => {
        api.feedbackList({pageIndex, pageSize}).then(res => {
            let {records, total} = res.data;
            this.setState({total, pageIndex, pageSize, data: records})
        })
    };

    render() {
        let _this = this;
        let columns = [{
            title: '用户编号',
            dataIndex: 'customerId',
            key: 'customerId',
        }, {
            title: '联系方式',
            dataIndex: 'contactWay',
            key: 'contactWay',
        }, {
            title: '问题类型',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '问题描述',
            dataIndex: 'content',
            key: 'content',
        }]
        return (
            <div>
                {/* 列表数据 */}
                <MyTable
                    buttonClick={() => {
                    }}
                    rowKey={record => record.feedbackId}
                    columns={columns}
                    dataSource={this.state.data}
                    pageIndex={this.state.pageIndex}
                    pageSize={this.state.pageSize}
                    total={this.state.total}
                    handleLoadPage={this.handleSearch}
                />
            </div>
        )
    }
}
