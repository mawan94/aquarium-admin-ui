import React from 'react';
import './App.css';
import BasicLayout from './layout/BasicLayout'

class App extends React.Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <BasicLayout history={this.props.history}/>
            </div>
        );
    }
}

export default App;
