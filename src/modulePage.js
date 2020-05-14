import React, {Component} from 'react';
import {Carousel, Card} from 'antd';

import MyFooter from './component/MyFooter'
import storage from './common/storage'
import constant from './common/constant'
import api from './common/api'

// const {Meta} = Card;

export default class ModulePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: undefined
        }
    }

    componentDidMount() {
        this.setState({
            userInfo: storage.get('userInfo')
        })
    }

    handleLogout = () => {
        storage.remove('token');
        storage.remove('userInfo');
        this.setState({userInfo: undefined})
    }

    handle2Jump = (type) => {
        let token = storage.get('token');
        if (token) {
            // 校验token
            api.checkToken({token}).then(res => {
                if (type === 1) {
                    this.props.history.push('/')
                } else if (type === 2) {
                    window.location.href = constant.ratingUrl + storage.get('token');
                } else if (type === 3) {
                    window.location.href = constant.operationUrl + storage.get('token');
                }
            }).catch(err => {
                storage.remove('userInfo')
                storage.remove('token')
                this.props.history.push({pathname: "/login", query: {type}})
            })
        } else {
            this.props.history.push({pathname: "/login", query: {type}})
        }
    }

    render() {
        let {userInfo} = this.state
        return (
            <>
                <Carousel effect="fade" autoplay style={styles.bannerWrap}>
                    <div>
                        <img style={styles.bannerImg} src={'banner1.png'}/>
                    </div>
                    <div>
                        <img style={styles.bannerImg} src={'banner2.jpeg'}/>
                    </div>
                    <div>
                        <img style={styles.bannerImg} src={'banner3.png'}/>
                    </div>
                </Carousel>

                <div style={{position: 'absolute', top: 10, color: '#fff', right: 20}}>
                    <span style={{fontSize: '20px'}}>{userInfo ? userInfo.nickname : 'HUBJECT'} |</span>
                    <a onClick={() => {
                        this.handleLogout()
                    }}>
                        <span style={{color: 'red'}}> 登出</span>
                    </a>
                </div>

                <div style={styles.cardWrap}>
                    <div style={styles.cardItemWrap}>
                        <Card
                            bordered={false}
                            onClick={() => this.handle2Jump(2)}
                            hoverable
                            style={{width: 260}}
                            cover={<img alt="example" style={{height: '260px', borderRadius: '50%'}} src="1111.png"/>}
                        >
                            <img alt="example" style={{width: 220}} src="yz.jpeg"/>
                            <div style={styles.metaTitle}>
                                充电质量指数
                            </div>
                            <div style={styles.description}>
                                Hubject Quality Index （HQI)
                            </div>
                        </Card>
                    </div>
                    <div style={styles.cardItemWrap}>
                        <Card
                            bordered={false}
                            onClick={() => this.handle2Jump(1)}
                            hoverable
                            style={{width: 260}}
                            cover={<img alt="example" style={{height: '260px', borderRadius: '50%'}} src="2222.png"/>}
                        >
                            <img alt="example" style={{width: 220}} src="yz.jpeg"/>
                            <div style={styles.metaTitle}>
                                充电财务系统
                            </div>
                            <div style={styles.description}>
                                Hubject Charging Finance
                            </div>
                        </Card>
                    </div>

                    <div style={styles.cardItemWrap}>
                        <Card
                            bordered={false}
                            onClick={() => this.handle2Jump(3)}
                            hoverable
                            style={{width: 260}}
                            cover={<img alt="example" style={{height: '260px', borderRadius: '50%'}} src="3333.jpeg"/>}
                        >
                            <img alt="example" style={{width: 220}} src="yz.jpeg"/>
                            <div style={styles.metaTitle}>
                                充电运维系统
                            </div>
                            <div style={styles.description}>
                                Hubject Charging Operation
                            </div>
                        </Card>
                    </div>
                </div>
                <MyFooter/>
            </>
        )
    }
}

const styles = {
    bannerWrap: {
        // height: '660px',
        width: '100%',
        // background: '#364d79'
    },
    bannerImg: {
        width: '100%',
        height: '220px',
        // objectFit: 'cover'
    },
    cardWrap: {
        margin: '80px 0',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
    },
    cardItemWrap: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        color: '#666',
        fontSize: 32,
        fontWeight: 550,
        marginTop: '30px',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center'
    },
    metaTitle: {
        margin: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        color: '#666'
    },
    description: {
        margin: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '15px',
        color: '#999'
    }
}
