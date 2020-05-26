import React from 'react'
import {Route} from 'react-router-dom';

import Index from '../page/index';
import Detail from '../page/detail';

export default [
    <Route key="RoleMenu" path="/role-menu/index" component={Index}/>,
    // <Route key="RoleMenuAdd" path="/role-menu/add" component={Detail}/>,
    <Route key="RoleMenuEdit" path="/role-menu/edit/:id" component={Detail}/>
]
