import React from 'react'
import {Layout} from 'antd';

const {Footer} = Layout;

export default class MyFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Footer style={{textAlign: 'center'}}>© 2020 金龙鱼水族馆版权所有 <a onClick={() => {
            }}> 苏ICP备20035112号-1</a></Footer>
        )
    }
}
