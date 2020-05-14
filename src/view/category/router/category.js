import React from 'react'
import {Route} from 'react-router-dom';

import Index from '../page/index';
import Detail from '../page/detail';

export default [
    <Route key="Category" path="/category/index" component={Index}/>,
    <Route key="CategoryAdd" path="/category/add" component={Detail}/>,
    <Route key="CategoryEdit" path="/category/edit/:id" component={Detail}/>
]
