import React from 'react'
import PropTypes from 'prop-types';
import {Modal} from 'antd';

import constant from '../common/constant'

export default class MyImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false
        }
    }

    static propTypes = {
        src: PropTypes.string,
        alt: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
        shape: PropTypes.string
    };

    static defaultProps = {
        width: '50px',
        height: '50px',
        shape: 'SQUARE',
        alt: '',
    };

    handleCancel = () => {
        this.setState({previewVisible: false})
    };

    handleClick = () => {
        this.setState({previewVisible: true})
    };

    render() {
        let {height, width, src, alt, shape} = this.props;
        let {previewVisible} = this.state;
        return (
            <span>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt='' style={{width: '100%', height: '100%'}}
                         src={src ? (src.startsWith('http') ? src : constant.imgHost + src) : src}/>
                </Modal>
                <img onClick={this.handleClick} style={{
                    cursor: 'pointer',
                    width, height,
                    borderRadius: shape === 'CIRCLE' ? '100%' : '6%'
                }}
                     src={src ? (src.startsWith('http') ? src : constant.imgHost + src) : src}
                     alt={alt}
                     title={'查看原图'}
                />
            </span>
        )
    }
}
