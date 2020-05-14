import React from 'react'
import PropTypes from 'prop-types';

import MyBreadcrumb from './MyBreadcrumb'

class MyHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        cardTitle: PropTypes.string.isRequired,
        breadcrumbList: PropTypes.array.isRequired
    };

    render() {
        return (
            <div style={{backgroundColor: '#fff', width: '100%', height: '100px'}}>
                <div style={{width: '100%', borderBottom: '1px solid #E6E6E6', marginBottom: '3px'}}/>
                <div style={{padding: '10px'}}>
                    <MyBreadcrumb breadcrumbList={this.props.breadcrumbList}/>
                    <div>
                        <span style={{display: 'block',margin: '8px 15px', fontSize: '20px', color: '#666'}}>
                            {this.props.cardTitle}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyHeader
