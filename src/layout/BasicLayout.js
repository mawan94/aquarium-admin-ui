import React from 'react'
import {Breadcrumb, Icon, Layout, Menu, notification} from 'antd';
import {Switch, NavLink} from 'react-router-dom'
import menuList from '../common/menu'
import entry from '../common/entry';
import storage from '../common/storage';
import MyTopbar from '../component/MyTopbar'
import MyFooter from '../component/MyFooter'

const {Header, Content, Sider} = Layout;
const {SubMenu} = Menu;

export default class BasicLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        collapsed: false,
    };

    componentWillMount() {
        let token = storage.get('token', localStorage);
        if (!token) {
            this.props.history.push('/login');
            return
        }
        // CONNECTING：值为0，表示正在连接。
        // OPEN：值为1，表示连接成功，可以通信了。
        // CLOSING：值为2，表示连接正在关闭。
        // CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
        let {ws} = window;
        ws.onopen = () => {
            console.info('webSocket通道建立成功！！！');
        };
        ws.onmessage = (message) => {
            this.parseMsgFromServer(message)
        };
    }

    // 解析处理服务端推来的消息 TODO 抽取代码
    parseMsgFromServer = (message) => {
        if (message.data) {
            let packet = JSON.parse(message.data);
            // if (packet.cmd == 2) {
            console.error(packet)
            notification.open({
                message: packet.success ? '发送成功' : '发送失败',
                description: packet.msg,
                duration: 0,
            });
            // }
        }
    };


    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    render() {
        let routerList = [];
        for (let i = 0; i < entry.list.length; i++) {
            routerList.push(entry.list[i].router);
        }
        return (
            <Layout style={styles.layout}>
                <Sider style={styles.layoutSider} theme={"dark"} collapsible
                       collapsed={this.state.collapsed}
                       onCollapse={this.onCollapse}>
                    <div style={styles.titleWrap}>
                        <img style={styles.titleImg} src={'/LOGO2.png'}/>
                    </div>
                    <div style={styles.titleText}>
                        充电财务系统
                    </div>

                    <Menu theme="dark" mode="inline" defaultOpenKeys={['3', '8', '11']}>
                        {
                            menuList.map((item, index) => {
                                if (item.child && item.child.length) {
                                    return (
                                        <SubMenu title={
                                            <span style={styles.subMenuText}>{item.label}</span>
                                        }
                                            // key={index}>
                                                 key={item.key}>
                                            {
                                                item.child.map((innerItem, innerIndex) =>
                                                    <Menu.Item style={styles.menuItem}
                                                               key={`${index}${innerIndex}`}>
                                                        {innerItem.icon ? <Icon type={innerItem.icon}/> : ''}
                                                        <NavLink to={innerItem.navLink}>{innerItem.label}</NavLink>
                                                    </Menu.Item>
                                                )
                                            }
                                        </SubMenu>
                                    )
                                } else {
                                    return (
                                        <Menu.Item style={styles.menuItem}
                                                   key={index}>
                                            {item.icon ? <Icon type={item.icon}/> : ''}
                                            <NavLink to={item.navLink}><span
                                                style={styles.subMenuText}>{item.label}</span></NavLink>
                                        </Menu.Item>
                                    )
                                }
                            })
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={styles.header}>
                        <MyTopbar ws={window.ws} userInfo={storage.get('userInfo')} history={this.props.history}/>
                    </Header>
                    <Content style={styles.content}>
                        <Breadcrumb style={styles.breadcrumb}>
                        </Breadcrumb>

                        <div style={styles.contentContainer}>
                            <Switch>
                                {routerList.map(router => (router))}
                            </Switch>
                        </div>
                    </Content>
                    <MyFooter/>
                </Layout>
            </Layout>
        );
    }
}

const styles = {
    layout: {minHeight: '100vh'},
    layoutSider: {borderRight: "3px solid #F7F7F7"},
    titleWrap: {color: '#fff', fontSize: 27, fontWeight: 800, padding: '18px'},
    titleImg: {width: '100%'},
    titleText: {padding: '0 16px', marginBottom: '20px', color: '#fff', fontSize: 22, fontWeight: 600},
    subMenuText: {color: '#fff', fontSize: 18, fontWeight: 500, float: 'left'},
    menuItem: {margin: '17px 0', fontSize: 18, fontWeight: 500},
    header: {background: '#fff', padding: 0},
    content: {margin: '0 16px'},
    breadcrumb: {margin: '16px 0'},
    contentContainer: {padding: 24, background: '#fff', minHeight: 360}
}
