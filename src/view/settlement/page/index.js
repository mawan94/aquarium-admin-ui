import React from 'react'
import {Modal, message, Spin} from 'antd';

import MyForm from '../../../component/MyForm'
import FORM_ITEM_TYPE from '../../../common/formItemType'
import api from '../../../common/api'
import storage from '../../../common/storage'

const {confirm} = Modal;
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
        loading: false
    };

    componentDidMount() {
        // 加载下拉框数据
        this.handleInitSelector();
    }

    // 加载下拉框数据
    handleInitSelector = () => {
        api.cecPartnerSelector().then(res => {
            this.setState({cecPartner: res.data})
        });
    };

    // 提交工单
    handleSubmit = () => {
        let {dateRange, cpoOperatorId, empOperatorId} = this.state.condition;
        // return
        let _this = this;
        let param = _this.state.condition;
        param.adminId = storage.get('userInfo').id;
        param.reviewId = '1'
        confirm({
            title: '确定要进行结算吗?',
            content: `开始时间: ${dateRange[0]}  结束时间: ${dateRange[1]}   CPO_ID: ${cpoOperatorId}   EMP_ID: ${empOperatorId}`,
            onOk() {
                _this.setState({loading: true})
                api.createSettleWorkOrder(param).then(res => {
                    message.success('提交完成')
                }).finally(()=> {
                    _this.setState({loading: false})

                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    };

    render() {
        return (
            <div>
                <Spin spinning={this.state.loading}>
                    <MyForm _this={this} onRowDisplayNum={3} bindName={'condition'} headName={'账单结算申请'} fields={
                        [
                            {
                                fieldType: FORM_ITEM_TYPE.RANGE_PICKER,
                                labelName: '账单日期',
                                fieldName: 'dateRange',
                                required: true,
                            },
                            {
                                fieldType: FORM_ITEM_TYPE.SELECT,
                                labelName: 'CPO',
                                fieldName: 'cpoOperatorId',
                                optionList: this.state.cecPartner.cpoList,
                                required: true,
                            },
                            {
                                fieldType: FORM_ITEM_TYPE.SELECT,
                                labelName: 'EMP',
                                fieldName: 'empOperatorId',
                                optionList: this.state.cecPartner.empList,
                                required: true,
                            },
                        ]}
                            headBackgroundColor={'#ffffff'}
                            buttonList={[
                                {
                                    type: "danger", text: '提交工单', verifyCondition: true, callback: () => {
                                        this.handleSubmit()
                                    }
                                }
                            ]}/>
                </Spin>
            </div>
        )
    }
}
