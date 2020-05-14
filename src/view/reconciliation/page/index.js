import React from 'react'
import {message, Table, Button, Collapse, Modal, Input, Row, Col, InputNumber, Tag} from 'antd';

import MyForm from '../../../component/MyForm'
import FORM_ITEM_TYPE from '../../../common/formItemType'
import api from '../../../common/api'

const {Panel} = Collapse;
const {TextArea} = Input;

// cpo 表单字段
const chargeOrderInfoColumns = [
    {
        title: 'CPO ID',
        dataIndex: 'chargeOrderInfo.operatorId'
    },
    {
        title: '订单金额',
        dataIndex: 'chargeOrderInfo.totalMoney',
        sorter: (a, b) => a.chargeOrderInfo.totalMoney - b.chargeOrderInfo.totalMoney,
        render: text => {
            return <span style={{color: '#ff0033'}}>{text}</span>
        }
    },
    {
        title: '耗电',
        dataIndex: 'chargeOrderInfo.totalPower'
    },
    {
        title: '充电站ID',
        dataIndex: 'chargeOrderInfo.stationId',
    },
    {
        title: '充电枪ID',
        dataIndex: 'chargeOrderInfo.connectorId',
    },
    {
        title: '订单ID',
        dataIndex: 'chargeOrderInfo.startChargeSeq',
    },
    {
        title: '充电开始时间',
        dataIndex: 'chargeOrderInfo.startTime',
    },
    {
        title: '充电结束时间',
        dataIndex: 'chargeOrderInfo.endTime',
    }
];
// emp 表单字段
const empCdrColumns = [
    {
        title: 'EMP ID',
        dataIndex: 'empCdr.operatorId'
    },
    {
        title: '订单金额',
        dataIndex: 'empCdr.totalMoney',
        sorter: (a, b) => a.empCdr.totalMoney - b.empCdr.totalMoney,
        render: text => {
            return <span style={{color: '#ff0033'}}>{text}</span>
        }
    },
    {
        title: '耗电',
        dataIndex: 'empCdr.totalPower'
    },
    {
        title: '充电站ID',
        dataIndex: 'empCdr.stationId',
    },
    {
        title: '充电枪ID',
        dataIndex: 'empCdr.connectorId',
    },
    {
        title: '订单ID',
        dataIndex: 'empCdr.orderId',
    },
    {
        title: '充电开始时间',
        dataIndex: 'empCdr.startTime',
    },
    {
        title: '充电结束时间',
        dataIndex: 'empCdr.endTime',
    },
    {
        title: '用户ID',
        dataIndex: 'empCdr.userId',
    },
];

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        // cpo & emp 下拉框
        cecPartner: {
            cpoList: [],
            empList: []
        },
        // 表单条件
        condition: {},

        // default
        pageIndex: 1,
        pageSize: 10,
        total: 0,

        // cpo & emp 对应的账单集合
        data: [],

        // cpo & emp 当前的勾选项
        selectedRowKeys: [],

        // 预编辑的数据模型
        preEdit: {
            list: [],
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            selectedRowKeys: [],
        },

        // 加载效果
        loading: false,
        // 按钮禁用效果
        addPreEditRecordButtonDisabled: true,
        // 时候展示预编辑的弹出层
        visible: false,
        // 当前弹出层编辑的数据
        currentEditDate: {},
        // auto 单选/多选控制器 (true为多选)
        selectorController: [true, true]
    };


    componentDidMount() {
        // 加载下拉框数据
        this.handleInitSelector();
        //  加载预编辑数据
        let {pageIndex, pageSize} = this.state.preEdit;
        this.handleLoadPreEditRecordList(pageIndex, pageSize)
    }

    // 加载下拉框数据
    handleInitSelector = () => {
        api.cecPartnerSelector().then(res => {
            this.setState({cecPartner: res.data})
        }).finally(() => {
            this.setState({loading: false})
        });
    };

    // cpo & emp 联动勾选事件监听
    onSelectChange = selectedRowKeys => {
        this.setState({
            addPreEditRecordButtonDisabled: !(selectedRowKeys.length && this.state.condition.billType === '1'),
            selectedRowKeys
        });
    };

    // 预编辑 勾选事件监听
    onPreEditSelectChange = (selectedRowKeys) => {
        let {preEdit} = this.state;
        preEdit.selectedRowKeys = selectedRowKeys;
        this.setState({preEdit});
    };

    // 加载预编辑数据
    handleLoadPreEditRecordList = (pageIndex, pageSize) => {
        this.setState({loading: true});
        let {preEdit} = this.state;
        preEdit.pageIndex = pageIndex;
        preEdit.pageSize = pageSize;
        this.setState({preEdit});
        api.handleLoadPreEditRecordList(this.state.preEdit).then(res => {
            preEdit.list = res.data.list;
            preEdit.total = res.data.total;
            this.setState({preEdit})
        }).finally(() => {
            this.setState({loading: false})
        });
    };

    // 搜索cpo & emp 对应的账单
    handleSearch = (page, pageSize) => {
        let params = this.state.condition;
        // 校验参数
        if (!this.validateRequestParams(params)) {
            return
        }
        params.pageIndex = page;
        params.pageSize = pageSize;
        this.setState({
            loading: true,
            pageIndex: params.pageIndex,
            pageSize: params.pageSize
        });
        api.handleLoadReconciliationList(params).then(res => {
            this.setState({
                data: res.data.list,
                total: res.data.total
            })
        }).finally(() => {
            this.setState({loading: false})
        });
    };

    // 将数据添加到预编辑
    handleAddRecord2PreEdit = () => {
        let {billType} = this.state.condition;
        let {selectedRowKeys} = this.state;
        //有差异账单
        if (billType === '1' && selectedRowKeys.length) {
            this.setState({loading: true});
            api.handleBatchAddPreEditRecord({orderIds: selectedRowKeys}).then(res => {
                if (res.data.length) {
                    // 重置选中项
                    this.setState({selectedRowKeys: selectedRowKeys.filter(item => res.data.indexOf(item) === -1)});
                    // 刷新预编辑页面
                    let {preEdit} = this.state;
                    preEdit.selectedRowKeys = [];
                    this.setState({preEdit});
                    this.handleLoadPreEditRecordList(preEdit.pageIndex, preEdit.pageSize);
                    // 刷新cpo & emp数据
                    this.handleSearch(this.state.pageIndex, this.state.pageSize)
                }
            }).finally(() => {
                this.setState({loading: false})
            });
        }
    };

    // 回滚选中的预编辑数据
    handleRollbackPreEditRecord = () => {
        let ids = this.state.preEdit.selectedRowKeys;
        let list = this.state.preEdit.list;
        this.setState({loading: true});
        api.handleRollbackPreEditRecord({ids}).then(res => {
            // 移除state里面的对应值
            list.map(item => {
                ids.map(innerItem => {
                    if (item.id === innerItem) {
                        item.hubjectResponsibilityMoney = null;
                        item.cpoResponsibilityMoney = null;
                        item.empResponsibilityMoney = null;
                    }
                })
            });
            let {preEdit} = this.state;
            preEdit.selectedRowKeys = [];
            preEdit.list = list;
        }).finally(() => {
            this.setState({loading: false})
        });
    };

    // 删除选中的预编辑数据
    handleDeletePreEditRecord = () => {
        let ids = this.state.preEdit.selectedRowKeys;
        this.setState({loading: true});
        api.handleDeletePreEditRecord({ids}).then(res => {
            let {preEdit} = this.state;
            preEdit.selectedRowKeys = [];
            this.handleLoadPreEditRecordList(preEdit.pageIndex, preEdit.pageSize)
        }).finally(() => {
            this.setState({loading: false})
        });
    };

    // 按照比例划分差额
    handleDivideDifferenceMoney = () => {
        let ids = this.state.preEdit.selectedRowKeys;
        let {cpoResponsibilityPercentage, empResponsibilityPercentage, hubjectResponsibilityPercentage} = this.state.condition;
        let totalPercentage = cpoResponsibilityPercentage + empResponsibilityPercentage + hubjectResponsibilityPercentage;
        if (totalPercentage === 100) {
            this.setState({loading: true});
            api.handleDivideDifferenceMoney({
                ids,
                cpoResponsibilityPercentage,
                empResponsibilityPercentage,
                hubjectResponsibilityPercentage
            }).then(res => {
                // 清空选中项 && 刷新预编辑页面数据
                let {preEdit} = this.state;
                preEdit.selectedRowKeys = [];
                this.handleLoadPreEditRecordList(preEdit.pageIndex, preEdit.pageSize)
            }).finally(() => {
                this.setState({loading: false})
            });
        } else {
            message.error('比例相加必须为100%')
        }
    };

    // 平账
    handleAverageAccount = () => {
        let ids = this.state.preEdit.selectedRowKeys;
        if (ids && ids.length) {
            this.setState({loading: true})
            api.handleSubmitPreEditRecord({ids}).then(res => {
                let {preEdit} = this.state;
                preEdit.selectedRowKeys = [];
                this.handleLoadPreEditRecordList(preEdit.pageIndex, preEdit.pageSize)
            }).finally(() => {
                this.setState({loading: false})
            })
        }
    };

    // 请求提交时的参数校验
    validateRequestParams(params) {
        let {differenceGte, differenceLte} = params;
        // 1. 差额填值逻辑
        if ((differenceGte && differenceLte) && differenceLte < differenceGte) {
            message.warn('差额填写不符合逻辑');
            return false;
        }
        return true;
    }

    // 预编辑详情页面修改责任金额
    handleSetResponsibilityMoney = (value, field) => {
        let {currentEditDate} = this.state;
        currentEditDate[field] = value;
        this.setState({currentEditDate})
    };

    // 显示弹出层
    showModal = (id) => {
        api.handleLoadPreEditRecordById({id}).then(res => {
            this.setState({
                currentEditDate: res.data,
                visible: true,
            });
        })
    };

    // 点击弹出层的确认按钮
    handleOk = e => {
        api.handleEditPreEditRecordRemark({...this.state.currentEditDate}).then(res => {
            let {preEdit} = this.state;
            preEdit.selectedRowKeys = [];
            this.setState({
                currentEditDate: {},
                currentEditMoney: {},
                visible: false,
            });
            this.handleLoadPreEditRecordList(preEdit.pageIndex, preEdit.pageSize);
        })
    };

    // 点击弹出层取消按钮
    handleCancel = e => {
        this.setState({
            visible: false,
            currentEditDate: {},
        });
    };

    render() {
        // emp && cpo 选择组件
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: record.chargeOrderInfo.state !== 0 || record.empCdr.state !== 0
            }),
        };
        // preEdit 选择组件
        const preEditRowSelection = {
            selectedRowKeys: this.state.preEdit.selectedRowKeys,
            onChange: this.onPreEditSelectChange,
        };
        // emp && cpo 分页定制组件
        let pagination = {
            current: this.state.pageIndex,
            defaultPageSize: 10,
            total: this.state.total,
            onChange: (page, pageSize) => {
                this.handleSearch(page, pageSize)
            }
        };
        // preEdit 分页组件
        let preEditPagination = {
            current: this.state.preEdit.pageIndex,
            defaultPageSize: 10,
            total: this.state.preEdit.total,
            onChange: (page, pageSize) => {
                this.handleLoadPreEditRecordList(page, pageSize)
            }
        };
        // 预编辑表单字段
        const preEditColumns = [
            {
                title: '订单编号',
                dataIndex: 'orderId'
            },
            {
                title: '差额',
                dataIndex: 'differenceMoney',
                render: (text) => {
                    return <span style={{color: '#ff3366'}}>{text}</span>
                }
            },
            {
                title: 'CPO',
                dataIndex: 'cpoName',
                render: (text) => {
                    return <Tag color={'#6633cc'}>{text}</Tag>
                }
            },
            {
                title: 'CPO账单金额',
                dataIndex: 'cpoTotalMoney',
                render: (text) => {
                    return <span style={{color: '#6633cc'}}>{text}</span>
                }
            },
            {
                title: 'CPO责任金额',
                dataIndex: 'cpoResponsibilityMoney',
                render: (text) => {
                    return <span style={{color: '#6633cc'}}>{text}</span>
                }
            },
            {
                title: 'EMP',
                dataIndex: 'empName',
                render: (text) => {
                    return <Tag color={'#ff6600'}>{text}</Tag>
                }
            },

            {
                title: 'EMP账单金额',
                dataIndex: 'empTotalMoney',
                render: (text) => {
                    return <span style={{color: '#ff6600'}}>{text}</span>
                }
            },
            {
                title: 'EMP责任金额',
                dataIndex: 'empResponsibilityMoney',
                render: (text) => {
                    return <span style={{color: '#ff6600'}}>{text}</span>
                }
            },
            {
                title: 'HUBJECT责任金额',
                dataIndex: 'hubjectResponsibilityMoney',
                render: (text) => {
                    return <span style={{color: '#339966', fontWeight: 800}}>{text}</span>
                }
            },
            {
                title: '备注',
                dataIndex: 'remark',
            },
            {
                title: '操作人',
                dataIndex: 'editBy',
            },
            {
                title: '操作时间',
                dataIndex: 'editTime',
            },
            {
                title: '操作',
                key: 'operation',
                render: (record) => {
                    return <a onClick={() => this.showModal(record.id)}>编辑</a>
                },
            }
        ];
        let {selectorController} = this.state;
        return (
            <div>
                <Collapse defaultActiveKey={['1', '2']}>
                    <Panel header="展开/收起" key="1">
                        <MyForm _this={this} onRowDisplayNum={3} bindName={'condition'} fields={
                            [
                                {
                                    fieldType: FORM_ITEM_TYPE.RANGE_PICKER1,
                                    labelName: '账单日期',
                                    fieldName: 'billDate'
                                },
                                {
                                    fieldType: FORM_ITEM_TYPE.SELECT,
                                    labelName: '账单类型',
                                    fieldName: 'billType',
                                    optionList: [{value: '1', label: '有差异账单'}, {value: '2', label: '无差异账单'}],
                                    required: true,
                                },
                                {
                                    fieldType: FORM_ITEM_TYPE.INPUT,
                                    labelName: '交易单号',
                                    fieldName: 'orderId'
                                },
                                {
                                    fieldType: FORM_ITEM_TYPE.INPUT_NUMBER,
                                    labelName: '账单差额≥ ',
                                    fieldName: 'differenceGte'
                                },
                                {
                                    fieldType: FORM_ITEM_TYPE.INPUT_NUMBER,
                                    labelName: '账单差额≤ ',
                                    fieldName: 'differenceLte'
                                },
                            ]}
                                headBackgroundColor={'#ffffff'}
                                buttonList={[
                                    {
                                        type: "primary", text: '搜索', verifyCondition: true, callback: () => {
                                            this.setState({selectedRowKeys: []}); // 清空选中数据
                                            this.handleSearch(1, this.state.pageSize)
                                        }
                                    }
                                ]}/>
                        <Table rowSelection={rowSelection} pagination={pagination} bordered
                               columns={chargeOrderInfoColumns} loading={this.state.loading}
                               rowClassName={(record, index) => {
                                   let className = 'light-row';
                                   if (index % 2 === 1) className = 'dark-row';
                                   return className;
                               }}
                               dataSource={this.state.data} rowKey={record => {
                            return record.chargeOrderInfo.startChargeSeq
                        }} title={() =>
                            <div>
                                <MyForm headName={'CPO充电明细CDR'} headBackgroundColor={'#DDD'} _this={this}
                                        onRowDisplayNum={3}
                                        bindName={'condition'} fields={
                                    [
                                        {
                                            fieldType: selectorController[0] ? FORM_ITEM_TYPE.MULTIPLE_SELECT : FORM_ITEM_TYPE.SELECT,
                                            labelName: 'CPO',
                                            fieldName: 'cpoOperatorId',
                                            optionList: this.state.cecPartner.cpoList,
                                            callback: (fieldName, value) => {
                                                // console.error(value)
                                                // console.error(`fieldName ${fieldName}  value ${value}`)
                                                // reset 另外一个下拉框组件
                                                if (value && value.length > 1) selectorController[1] = !selectorController[0];
                                                else selectorController = [true, true];
                                                let cecPartner = this.state.cecPartner;
                                                // cecPartner.empList = [];
                                                this.setState({
                                                    cecPartner,
                                                    selectorController
                                                });
                                            }
                                        },
                                        {
                                            fieldType: FORM_ITEM_TYPE.INPUT,
                                            labelName: '充电站编号',
                                            fieldName: 'stationId'
                                        },
                                        // {
                                        //     fieldType: FORM_ITEM_TYPE.INPUT,
                                        //     labelName: '充电桩编号',
                                        //     fieldName: 'equipmentId'
                                        // },
                                        {
                                            fieldType: FORM_ITEM_TYPE.INPUT,
                                            labelName: '充电明细编号',
                                            fieldName: 'chargeOrderId'
                                        }
                                    ]
                                }/>
                            </div>}/>

                        <Table rowSelection={rowSelection} pagination={pagination} bordered columns={empCdrColumns}
                               dataSource={this.state.data} loading={this.state.loading}
                               rowClassName={(record, index) => {
                                   let className = 'light-row';
                                   if (index % 2 === 1) className = 'dark-row';
                                   return className;
                               }}
                               rowKey={record => {
                                   return record.empCdr.orderId
                               }} title={() =>
                            <div>
                                <MyForm headName={'EMP用户账单'} headBackgroundColor={'#DDD'} _this={this}
                                        onRowDisplayNum={3}
                                        bindName={'condition'} fields={
                                    [
                                        {
                                            fieldType: selectorController[1] ? FORM_ITEM_TYPE.MULTIPLE_SELECT : FORM_ITEM_TYPE.SELECT,
                                            labelName: 'EMP',
                                            fieldName: 'empOperatorId',
                                            optionList: this.state.cecPartner.empList,
                                            callback: (fieldName, value) => {
                                                // reset 另外一个下拉框组件
                                                if (value && value.length > 1) selectorController[0] = !selectorController[1];
                                                else selectorController = [true, true];
                                                let cecPartner = this.state.cecPartner;
                                                // cecPartner.cpoList = [];
                                                this.setState({
                                                    cecPartner,
                                                    selectorController
                                                });
                                            }
                                        },
                                        {
                                            fieldType: FORM_ITEM_TYPE.INPUT,
                                            labelName: '用户编号',
                                            fieldName: 'userId',
                                        },
                                        {
                                            fieldType: FORM_ITEM_TYPE.INPUT,
                                            labelName: '账单编号',
                                            fieldName: 'empCdrId',
                                        }
                                    ]
                                }/>
                            </div>}/>
                        <Button disabled={this.state.addPreEditRecordButtonDisabled} size={'large'}
                                icon={'plus-circle'} style={{margin: "10px"}} type={'primary'} onClick={() => {
                            this.handleAddRecord2PreEdit()
                        }}>添加到预编辑</Button>

                    </Panel>

                    <Panel header="展开/收起" key="2">
                        {/*    这里是单独的一块，根据结果集搜索的数据进行调整 */}
                        <Table bordered columns={preEditColumns}
                               rowSelection={preEditRowSelection}
                               rowKey={record => record.id}
                               pagination={preEditPagination}
                               loading={this.state.loading}
                               dataSource={this.state.preEdit.list} title={() =>
                            <div>
                                <MyForm headName={'预编辑'} headBackgroundColor={'#DDD'} _this={this} onRowDisplayNum={3}
                                        bindName={'condition'} fields={
                                    [
                                        {
                                            fieldType: FORM_ITEM_TYPE.INPUT_NUMBER,
                                            labelName: 'CPO责任占比 ',
                                            fieldName: 'cpoResponsibilityPercentage',
                                            required: true
                                        },
                                        {
                                            fieldType: FORM_ITEM_TYPE.INPUT_NUMBER,
                                            labelName: 'EMP责任占比',
                                            fieldName: 'empResponsibilityPercentage',
                                            required: true
                                        },
                                        {
                                            fieldType: FORM_ITEM_TYPE.INPUT_NUMBER,
                                            labelName: 'Hubject责任占比',
                                            fieldName: 'hubjectResponsibilityPercentage',
                                            required: true
                                        }
                                    ]
                                }
                                        buttonList={[
                                            {
                                                type: "primary",
                                                text: '回滚选中项',
                                                callback: this.handleRollbackPreEditRecord
                                            },
                                            {type: "primary", text: '移除选中项', callback: this.handleDeletePreEditRecord},
                                            {
                                                type: "primary",
                                                text: '按比例划分责任金',
                                                callback: this.handleDivideDifferenceMoney,
                                                verifyCondition: true
                                            },
                                            {type: "danger", text: '提交平账', callback: this.handleAverageAccount}
                                        ]}/>
                            </div>}/>

                        {/*   弹出层样式 */}
                        <Modal
                            title="编辑"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <div style={{textAlign: 'center'}}>
                                <div style={{color: 'red'}}>{this.state.currentEditDate.differenceMoney}</div>
                                <br/>
                                <Row>
                                    <Col span={12}>CPO责任金: </Col>
                                    <Col span={12}>
                                        <InputNumber
                                            style={{width: '180px'}}
                                            min={0}
                                            value={this.state.currentEditDate.cpoResponsibilityMoney}
                                            defaultValue={this.state.currentEditDate.cpoResponsibilityMoney}
                                            onChange={(value) => {
                                                this.handleSetResponsibilityMoney(value, 'cpoResponsibilityMoney');
                                            }}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>EMP责任金:</Col>
                                    <Col span={12}><InputNumber
                                        style={{width: '180px'}}
                                        min={0}
                                        value={this.state.currentEditDate.empResponsibilityMoney}
                                        defaultValue={this.state.currentEditDate.empResponsibilityMoney}
                                        onChange={(value) => {

                                            this.handleSetResponsibilityMoney(value, 'empResponsibilityMoney');
                                        }}/></Col>
                                </Row>
                                <Row>
                                    <Col span={12}>Hubject责任金:</Col>
                                    <Col span={12}><InputNumber
                                        style={{width: '180px'}}
                                        min={0}
                                        value={this.state.currentEditDate.hubjectResponsibilityMoney}
                                        defaultValue={this.state.currentEditDate.hubjectResponsibilityMoney}
                                        onChange={(value) => {
                                            this.handleSetResponsibilityMoney(value, 'hubjectResponsibilityMoney');
                                        }}/></Col>
                                </Row>
                                <br/>

                                {/* 备注 */}
                                <TextArea onChange={(e) => {
                                    this.handleSetResponsibilityMoney(e.target.value, 'remark');
                                }} value={this.state.currentEditDate.remark}
                                          defaultValue={this.state.currentEditDate.remark} rows={4}/>
                            </div>
                        </Modal>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}
