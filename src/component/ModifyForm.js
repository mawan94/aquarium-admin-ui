import React from 'react'
import {Form, Button, message, Card} from 'antd';
import {withRouter} from 'react-router-dom';

import FORM_ITEM_TYPE from '../common/formItemType'
import FormItemPicturesWall from './FormItemPicturesWall'
import FormItemMultipleSelect from './FormItemMultipleSelect'
import FormItemInput from './FormItemInput'
import FormItemDatePicker from './FormItemDatePicker'
import FormItemSelect from './FormItemSelect'
import FormItemCascader from './FormItemCascader'
import FormItemSlider from "./FormItemSlider";
import FormItemEdit from './FormItemEdit'
import PropTypes from "prop-types";

const FormItem = Form.Item;
// formItem css 样式
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
    }
};
// 保存按钮 css 样式
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    }
};

class ModifyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formItemList: []
        }
    }

    static propTypes = {
        formItemList: PropTypes.array.isRequired,
        // setDefaultValue: PropTypes.func.isRequired,
        handleSubmitForm: PropTypes.func.isRequired,
    };

    componentDidMount() {

    }

    componentWillReceiveProps(props) {
        this.setState({
            formItemList: props.formItemList
        })
        props.formItemList.map((item)=>{
            let tempObj = {};
            tempObj[item.fieldName] = item.initValue;
            this.setState({...tempObj});
        })
    }

    // 设置默认值
    setDefaultValue = (entry) => {
        this.setState({...entry})
    };

    // 监听表单元素变化
    handleFormItemChange = (value, fieldName) => {
        let tempObj = {};
        tempObj[fieldName] = value;
        this.setState({...tempObj});
    };

    handleSubmit = () => {
        let validateFlag = true;
        this.props.formItemList.map((item) => {
            if (item.required) {
                let k = item.fieldName;
                if (this.state[k] === null || this.state[k] === '' || this.state[k] === undefined || this.state[k].length < 1) {
                    message.error('【' + item.labelName + '】不能为空！');
                    validateFlag = false;
                    console.log(`key: ${k}  value: ${this.state[k]}`)
                }
            }
        })

        // callback提交表单
        if (validateFlag) {
            this.props.handleSubmitForm(this.state)
        }
    };

    switchItem(item) {
        const type = item.formItemType;
        switch (type) {
            case FORM_ITEM_TYPE.NUMBER :
            case FORM_ITEM_TYPE.TEXT :
            case FORM_ITEM_TYPE.LONG_TEXT :
                return <FormItemInput fieldName={item.fieldName}
                                      formItemType={type}
                                      handleFormItemChange={this.handleFormItemChange}
                                      initValue={item.initValue}
                                      setDefaultValue={this.setDefaultValue}
                />;
                break;
            case FORM_ITEM_TYPE.DATE:
                return <FormItemDatePicker fieldName={item.fieldName}
                                           setDefaultValue={this.setDefaultValue}
                                           handleFormItemChange={this.handleFormItemChange}
                                           initValue={item.initValue}
                />;
                break;
            case FORM_ITEM_TYPE.SELECT:
                return (
                    <FormItemSelect fieldName={item.fieldName}
                                    setDefaultValue={this.setDefaultValue}
                                    handleFormItemChange={this.handleFormItemChange}
                                    initValue={item.initValue}
                                    optionList={item.optionList}
                    />
                );
                break;
            case FORM_ITEM_TYPE.CASCADER:
                return <FormItemCascader fieldName={item.fieldName}
                                         setDefaultValue={this.setDefaultValue}
                                         initValue={item.initValue}
                                         options={item.options}
                                         handleFormItemChange={this.handleFormItemChange}
                />
                break;
            case FORM_ITEM_TYPE.SLIDER:
                return <FormItemSlider fieldName={item.fieldName}
                                       setDefaultValue={this.setDefaultValue}
                                       initValue={item.initValue}
                                       options={item.options}
                                       handleFormItemChange={this.handleFormItemChange}
                />;
                break;
            case FORM_ITEM_TYPE.IMAGE:
                return <FormItemPicturesWall fieldName={item.fieldName}
                                             setDefaultValue={this.setDefaultValue}
                                             initValue={item.initValue}
                                             handleFormItemChange={this.handleFormItemChange}
                                             uploadMaxCount={item.uploadMaxCount}
                />;
                break;
            case FORM_ITEM_TYPE.EDIT:
                return <FormItemEdit fieldName={item.fieldName}
                                     setDefaultValue={this.setDefaultValue}
                                     initValue={item.initValue}
                                     handleFormItemChange={this.handleFormItemChange}
                />;
                break;
            case FORM_ITEM_TYPE.MULTIPLE_SELECT:
                return (
                    <FormItemMultipleSelect fieldName={item.fieldName}
                                            setDefaultValue={this.setDefaultValue}
                                            handleFormItemChange={this.handleFormItemChange}
                                            initValue={item.initValue}
                                            options={item.options}
                    />
                );
                break;
            default:
                break;
        }
    }

    render() {
        // let {formItemList} = this.props;
        let {formItemList} = this.state;
        return (
            <Card
                title="表单信息"
                extra={<Button onClick={() => this.props.history.goBack()}>返回</Button>}
                style={{height: '100%', margin: '30px'}}
            >
                <div style={{height: '100%', margin: '30px'}}>
                    <Form>
                        {
                            formItemList.map((item, index) => {
                                return (
                                    <FormItem
                                        key={index}
                                        {...formItemLayout}
                                        label={item.labelName}
                                        required={item.required}
                                        hasFeedback
                                    >
                                        {this.switchItem(item)}
                                    </FormItem>
                                )
                            })
                        }
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>
                                保存
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>

        )
    }
}

export default withRouter(Form.create()(ModifyForm))
