import React from 'react'
import {Route} from 'react-router-dom';

import Index from '../page/index';
import Detail from '../page/detail';

export default [
    <Route key="Product" path="/product/index" component={Index}/>,
    <Route key="ProductAdd" path="/product/add" component={Detail}/>,
    <Route key="ProductEdit" path="/product/edit/:id" component={Detail}/>
]
