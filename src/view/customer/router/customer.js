import React from 'react'
import {Route} from 'react-router-dom';

import Index from '../page/index';
import Detail from '../page/detail';

export default [
    <Route key="Customer" path="/customer/index" component={Index}/>,
    <Route key="CustomerAdd" path="/customer/add" component={Detail}/>,
    <Route key="CustomerEdit" path="/customer/edit/:id" component={Detail}/>
]
