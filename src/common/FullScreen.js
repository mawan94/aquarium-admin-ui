import React from 'react'
import {Icon} from 'antd'

export default class FullScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullScreen: false,
            iconStyle: 'fullscreen',
            iconText: '全屏'
        }
    }

    componentDidMount() {
        this.watchFullScreen();
    }

    fullScreen = () => {
        if (!this.state.isFullScreen) {
            this.setState({iconStyle: 'fullscreen-exit', iconText: '退出全屏'});
            this.requestFullScreen();
        } else {
            this.setState({iconStyle: 'fullscreen', iconText: '全屏'});
            this.exitFullscreen();
        }
    };

    //进入全屏
    requestFullScreen = () => {
        // console.log('requestFullScreen')
        var de = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
    };

    //退出全屏
    exitFullscreen = () => {
        // console.log('exitFullscreen')
        var de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    };

    //监听fullscreenchange事件
    watchFullScreen = () => {
        const _self = this;
        document.addEventListener(
            "fullscreenchange",
            function () {
                _self.setState({
                    isFullScreen: document.fullscreen
                });
            },
            false
        );

        document.addEventListener(
            "mozfullscreenchange",
            function () {
                _self.setState({
                    isFullScreen: document.mozFullScreen
                });
            },
            false
        );

        document.addEventListener(
            "webkitfullscreenchange",
            function () {
                _self.setState({
                    isFullScreen: document.webkitIsFullScreen
                });
            },
            false
        );
    };

    render() {
        return (
            <span style={{
                color: '#a3a9bd',
                marginLeft: '25px',
                marginRight: '25px',
                cursor: 'pointer'
            }} onClick={this.fullScreen}>
                <Icon type={this.state.iconStyle} style={{color: '#999', fontSize: '24px'}}/>
                <span style={{margin: '0 10px', fontSize: '24px'}}>{this.state.iconText}</span>
            </span>
        )
    }
}
