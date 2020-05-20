import React from 'react'
import {Route} from 'react-router-dom';

import Index from '../page/index';
import Detail from '../page/detail';

export default [
    <Route key="Order" path="/order/index" component={Index}/>,
    <Route key="OrderEdit" path="/order/edit/:id" component={Detail}/>
]
