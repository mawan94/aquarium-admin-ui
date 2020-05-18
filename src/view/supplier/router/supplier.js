import React from 'react'
import {Route} from 'react-router-dom';

import Index from '../page/index';
import Detail from '../page/detail';

export default [
    <Route key="Supplier" path="/supplier/index" component={Index}/>,
    <Route key="SupplierAdd" path="/supplier/add" component={Detail}/>,
    <Route key="SupplierEdit" path="/supplier/edit/:id" component={Detail}/>
]
