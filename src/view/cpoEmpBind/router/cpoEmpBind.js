import React from 'react'
import {Route} from 'react-router-dom';

import CpoEmpBind from '../page/index';


export default [
    <Route key="CpoEmpBind" path="/cpo-emp-bind/index" component={CpoEmpBind}/>,
    // <Route key="AvatarDetail" path="/avatar/add" component={AvatarDetail}/>,
    // <Route key="AvatarEditDetail" path="/avatar/edit/:id" component={AvatarDetail}/>
//    :id 是占位符   应该根据实际业务id来命名
]
