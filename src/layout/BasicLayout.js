import React from 'react'
import {Breadcrumb, Icon, Layout, Menu} from 'antd';
import {Switch, NavLink} from 'react-router-dom'
// import menuList from '../common/menu'
import api from '../common/api'
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
        menuList: [],
        collapsed: false,
    };

    componentWillMount() {
        let token = storage.get('token', localStorage);
        if (!token) {
            this.props.history.push('/login');
        } else {
            this.handleLoadMenu()
        }
    }


    handleLoadMenu = () => {
        api.getAdminMenuList().then(res => {
            this.setState({menuList: res.data})
            // console.log(res)
        })
    }

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
                        {/*{*/}
                        {/*    menuList.map((item, index) => {*/}
                        {/*        if (item.child && item.child.length) {*/}
                        {/*            return (*/}
                        {/*                <SubMenu title={*/}
                        {/*                    <span style={styles.subMenuText}>{item.label}</span>*/}
                        {/*                }*/}
                        {/*                         // key={item.key}>*/}
                        {/*                         key={index}>*/}
                        {/*                    {*/}
                        {/*                        item.child.map((innerItem, innerIndex) =>*/}
                        {/*                            <Menu.Item style={styles.menuItem}*/}
                        {/*                                       key={`${index}${innerIndex}`}>*/}
                        {/*                                {innerItem.icon ? <Icon type={innerItem.icon}/> : ''}*/}
                        {/*                                <NavLink to={innerItem.navLink}>{innerItem.label}</NavLink>*/}
                        {/*                            </Menu.Item>*/}
                        {/*                        )*/}
                        {/*                    }*/}
                        {/*                </SubMenu>*/}
                        {/*            )*/}
                        {/*        } else {*/}
                        {/*            return (*/}
                        {/*                <Menu.Item style={styles.menuItem}*/}
                        {/*                           key={index}>*/}
                        {/*                    {item.icon ? <Icon type={item.icon}/> : ''}*/}
                        {/*                    <NavLink to={item.navLink}><span*/}
                        {/*                        style={styles.subMenuText}>{item.label}</span></NavLink>*/}
                        {/*                </Menu.Item>*/}
                        {/*            )*/}
                        {/*        }*/}
                        {/*    })*/}
                        {/*}*/}

                        {
                            this.state.menuList.map((item, index) => {
                                if (item.menuItem && item.menuItem.length) {
                                    return (
                                        <SubMenu title={
                                            <span style={styles.subMenuText}>{item.subName}</span>
                                        }
                                                 key={index}>
                                            {
                                                item.menuItem.map((innerItem, innerIndex) =>
                                                    <Menu.Item style={styles.menuItem}
                                                               key={`${index}${innerIndex}`}>
                                                        {innerItem.icon ? <Icon type={innerItem.icon}/> : ''}
                                                        <NavLink
                                                            to={innerItem.link}>{innerItem.menuTagName}</NavLink>
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
                                            {item.link? <NavLink to={item.link}><span
                                                style={styles.subMenuText}>{item.subName}</span></NavLink> : <span
                                                style={styles.subMenuText}>{item.subName}</span>}
                                        </Menu.Item>
                                    )
                                }
                            })
                        }
                    </Menu>
                </Sider>
                <Layout>
                    {/*<Header style={styles.header}>*/}
                        <MyTopbar userInfo={storage.get('userInfo')} history={this.props.history}/>
                    {/*</Header>*/}
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
    titleWrap: {color: '#fff', fontSize: 25, fontWeight: 800, padding: '18px'},
    titleImg: {width: '100%'},
    titleText: {padding: '0 16px', marginBottom: '20px', color: '#fff', fontSize: 22, fontWeight: 600},
    subMenuText: {color: '#fff', fontSize: 17, float: 'left'},
    menuItem: {margin: '17px 0', fontSize: 17},
    header: {background: '#fff', padding: 0},
    content: {margin: '0 16px'},
    breadcrumb: {margin: '16px 0'},
    contentContainer: {padding: 24, background: '#fff', minHeight: 360}
}
