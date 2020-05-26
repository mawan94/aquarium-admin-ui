import React from 'react'
import {Route} from 'react-router-dom';

import Index from '../page/index';
import Detail from '../page/detail';

export default [
    <Route key="Recharge" path="/recharge/index" component={Index}/>,
    <Route key="RechargeAdd" path="/recharge/add" component={Detail}/>,
    <Route key="RechargeEdit" path="/recharge/edit/:id" component={Detail}/>
]
