import React from 'react'
import {Route} from 'react-router-dom';

import Index from '../page/index';
import Detail from '../page/detail';

export default [
    <Route key="Menu" path="/menu/index" component={Index}/>,
    <Route key="MenuAdd" path="/menu/add" component={Detail}/>,
    <Route key="MenuEdit" path="/menu/edit/:id" component={Detail}/>
]
