import React from 'react'
import {Breadcrumb} from 'antd';
import PropTypes from "prop-types";

export default class MyBreadcrumb extends React.Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        breadcrumbList: PropTypes.array.isRequired
    };
    render() {

        return (
            <Breadcrumb>
                {
                    this.props.breadcrumbList.map((item, index) => {
                            return (
                                item.href ?
                                    <Breadcrumb.Item key={index}><a href={item.href}>{item.name}</a></Breadcrumb.Item>
                                    : <Breadcrumb.Item key={index}>{item.name}</Breadcrumb.Item>
                            )
                        }
                    )
                }
            </Breadcrumb>
        )
    }
}
