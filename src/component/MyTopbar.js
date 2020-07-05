import React from 'react'
import {Avatar, Dropdown, Icon, Menu, Badge} from "antd";
import storage from "../common/storage";
import FullScreen from "../common/FullScreen";


export default class MyTopbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {userInfo} = this.props;
        const topMenu = (
            <Menu selectedKeys={[]} onClick={(e) => {
            }}>
                <Menu.Item key="personalCenter">
                    <Icon type="user"/>个人中心
                </Menu.Item>
                <Menu.Item key="setting">
                    <Icon type="setting"/>
                    设置
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="logout" onClick={() => {
                    let {userInfo} = this.props;
                    // 移除storage存储内容
                    storage.remove('token');
                    storage.remove('userInfo');
                    this.props.history.push('/login')// 调转到login page
                }}>
                    <Icon type="logout"/>
                    <span style={{color: '#BB445C'}}>退出登录</span>
                </Menu.Item>
            </Menu>
        );
        return (
            <div style={{
                color: '#999',
                // marginLeft: '5px',
                // marginRight: '15px',
                cursor: 'pointer'
            }}>

                <Dropdown overlay={topMenu}>
										  <span style={{margin: '20px'}}>
                                                  <Avatar
                                                      src={
                                                          userInfo && userInfo.img ?
                                                              userInfo.img :
                                                              '/JLYLOGO.png'
                                                      }
                                                      style={{cursor: 'pointer'}}/>
                                                  <span style={{
                                                      fontSize: '22px',
                                                      color: '#a3a9bd',
                                                      marginLeft: '10px',
                                                      cursor: 'pointer'
                                                  }}>{userInfo ? userInfo.nickname : 'guest'}</span>
										  </span>
                </Dropdown>
                <div style={{float:'right',marginTop:'10 px'}}>
                    <FullScreen/>
                </div>
            </div>
        )
    }

}
