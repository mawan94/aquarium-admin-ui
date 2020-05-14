import React from 'react'
import {Layout} from 'antd';

const {Footer} = Layout;

export default class MyFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Footer style={{textAlign: 'center'}}>© 2019 Hubject上海坤电版权所有 <a onClick={() => {
            }}> 沪ICP备18042766号-1</a></Footer>
        )
    }
}
