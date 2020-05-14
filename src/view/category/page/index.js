import React from 'react'
import {Button, Modal} from 'antd';
import MyTable from '../../../component/MyTable'
import constant from '../../../common/constant'
import MyForm from '../../../component/MyForm'
import FORM_ITEM_TYPE from '../../../common/formItemType'
import MyImg from "../../../component/MyImg";

const confirm = Modal.confirm;

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cecPartner: {
                cpoList: [],
                empList: []
            },
            condition: {},
            // 列表数据
            data: [],
            // 基础数据
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
        this.setState({pageIndex: pageIndex, pageSize: pageSize});
        // http.request({
        //     url: '/backend/avatar/v1/list',
        //     data: {
        //         pageIndex: pageIndex,
        //         pageSize: pageSize,
        //     },
        //     method: 'get',
        //     success: (response) => {
        //         response.data.list.map((item, index) => {
        //             item.key = index
        //         })
        //         this.setState({
        //             total: response.data.total,
        //             list: response.data.list
        //         });
        //     },
        //     complete: () => {
        //     }
        // })
        this.setState({pageIndex: pageIndex, pageSize: pageSize})
    };

    render() {
        let that = this;
        let columns = [{
            title: '作者编号',
            dataIndex: 'avatarId',
            key: 'avatarId',
        }, {
            title: '作者名称',
            dataIndex: 'avatarName',
            key: 'avatarName',
        }, {
            title: '作者类型',
            dataIndex: 'avatarType',
            key: 'avatarType',
            render: (text) => {
                if (text == 1) {
                    return '作者'
                } else {
                    return '虚拟会员'
                }
            }
        }, {
            title: '头像',
            dataIndex: 'filePath',
            key: 'filePath',
            render: (text) => {
                return <MyImg src={constant.imageHost + text} shape={'CIRCLE'}/>
            }
        },
            {
                title: '操作', dataIndex: '', key: 'x', render: (record) => {
                    return (
                        <div>
                            <div>
                                <Button type="dashed" onClick={() => {
                                    this.props.history.push('/avatar/edit/' + record.avatarId)
                                }}>编辑</Button>
                            </div>
                            <div style={{marginTop: '10px'}}>
                                <Button type="danger" onClick={() => {
                                    confirm({
                                        title: 'Are you sure delete this task?',
                                        content: 'Some descriptions',
                                        okText: 'Yes',
                                        okType: 'danger',
                                        cancelText: 'No',
                                        onOk() {
                                            // http.request({
                                            //     url: '/backend/avatar/v1/del',
                                            //     data: {
                                            //         avatarId: record.avatarId
                                            //     },
                                            //     method: 'post',
                                            //     success: (response) => {
                                            //         message.success('success')
                                            //         that.handleLoadPage(that.state.pageIndex, that.state.pageSize);
                                            //     },
                                            //     complete: () => {
                                            //     }
                                            // })

                                        },
                                        onCancel() {
                                            console.log('Cancel');
                                        },
                                    });
                                }}>删除</Button>
                            </div>
                        </div>
                    )
                }
            }
        ]

        return <div>
            <MyForm _this={this} onRowDisplayNum={3} bindName={'condition'} fields={
                [
                    {
                        fieldType: FORM_ITEM_TYPE.RANGE_PICKER,
                        labelName: '平账日期',
                        fieldName: 'dateRange'
                    },
                    {
                        fieldType: FORM_ITEM_TYPE.SELECT,
                        labelName: 'CPO',
                        fieldName: 'cpoId',
                        optionList: this.state.cecPartner.cpoList
                    },
                    {
                        fieldType: FORM_ITEM_TYPE.SELECT,
                        labelName: 'EMP',
                        fieldName: 'empId',
                        optionList: this.state.cecPartner.empList
                    },
                    {
                        fieldType: FORM_ITEM_TYPE.INPUT,
                        labelName: '批次号 ',
                        fieldName: 'batchId'
                    }
                ]}
                    buttonList={[
                        {
                            type: "primary", text: '搜索', callback: () => {
                                this.handleSearch(1, 10)
                            }
                        }
                    ]}/>

            {/* 列表数据 */}
            <MyTable
                buttonClick={() => {
                    this.props.history.push('/category/add')
                }}
                columns={columns}
                dataSource={this.state.list}
                pageIndex={this.state.pageIndex}
                pageSize={this.state.pageSize}
                total={this.state.total}
                handleLoadPage={this.handleLoadPage}
            />

        </div>
    }
}
