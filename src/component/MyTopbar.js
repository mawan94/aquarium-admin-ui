import React from 'react'
import {Avatar, Dropdown, Icon, Menu, Badge} from "antd";
import storage from "../common/storage";
import FullScreen from "../common/FullScreen";
import CMD from "../common/cmd";

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
                    let {userInfo, ws} = this.props;
                    let packet = CMD.CLOSE_CONNECT_REQ;
                    packet.adminId = userInfo.adminId;
                    ws.send(JSON.stringify(packet));//通知服务器关闭连接
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
            <span>
                <div style={{
                    color: '#999',
                    marginLeft: '5px',
                    marginRight: '15px',
                    cursor: 'pointer'
                }}>
                    {/*<Icon type={'bell'} style={{color: '#999'}}/>*/}
                    {/*                    <Badge count={5}>*/}
                    {/*<span style={{margin: '12px '}} className="head-example">消息</span>*/}
                    {/*                    </Badge>*/}
                    <FullScreen/>
                    <Dropdown overlay={topMenu}>
										  <span style={{margin: '20px'}}>
                                                  <Avatar
                                                      src={
                                                          userInfo && userInfo.img ?
                                                              userInfo.img :
                                                              'default-user-img.jpg'
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
                </div>
            </span>
        )
    }

}
