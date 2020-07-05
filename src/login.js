import React, {Component} from 'react';
import {Row, Icon, Form, Button, Input, Checkbox, message} from 'antd';

import api from './common/api'
import constant from './common/constant'
import MyFooter from './component/MyFooter'
import storage from './common/storage'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
        }
    }

    componentDidMount() {

    }

    handleRegister() {

    }

    handleSubmit() {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (!!errors) {
                return;
            }
            this.setState({
                isLoad: true
            });

            api.adminLogin({...values}).then(res => {
                if (res.success) {

                    storage.set('token', res.data.token);
                    storage.set('userInfo', res.data);
                    setTimeout(() => {
                        this.props.history.push('/')
                    }, 500);
                } else message.error(res.msg);
                console.log(res)
            }).finally(() => {
                this.setState({
                    isLoad: false
                });
            })
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <div className="login-body">
                    <Form className="login-body-form">
                        <Row>
                            <div className="login-body-form-title">
                                {/*<img style={{width:'300px'}} src={'JINLOGYUTEXT.png'}/>*/}
                                &nbsp;
                                <div>
                                    <span style={{
                                        fontWeight: '300',
                                        fontSize: '21px',
                                        color: '#666'
                                    }}>{constant.description}</span>
                                </div>
                            </div>
                        </Row>
                        <Form.Item>
                            {getFieldDecorator('account', {
                                rules: [{required: true, message: '请输入账号'}],
                            })(
                                <Input size="large"
                                       prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="账号"
                                       onPressEnter={this.handleSubmit.bind(this)}/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('pwd', {
                                rules: [{required: true, message: '请输入密码'}],
                            })(
                                <Input size="large"
                                       prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       type="password"
                                       placeholder="密码"
                                       onPressEnter={this.handleSubmit.bind(this)}/>
                            )}
                        </Form.Item>
                        <Row>
                            <Button type="primary"
                                    size="large"
                                    style={{
                                        width: '100%',
                                        marginBottom: '10px'
                                    }}
                                    loading={this.state.isLoad}
                                    onClick={this.handleSubmit.bind(this)}>
                                登录
                            </Button>
                        </Row>

                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })(
                                <Checkbox>七天内免登录</Checkbox>
                            )}
                            <a onClick={this.handleRegister} style={{float: 'right'}}>注册</a>
                        </Form.Item>

                    </Form>
                </div>
                <MyFooter/>
            </div>
        );
    }
}

Login.propTypes = {};


export default Form.create({})(Login);
