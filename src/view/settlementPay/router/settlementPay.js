import React from 'react'
import {Route} from 'react-router-dom';

import SettlementPay from '../page/index';

export default [
    <Route key="SettlementPay" path="/settlement-pay/index" component={SettlementPay}/>,
    // <Route key="AvatarDetail" path="/avatar/add" component={AvatarDetail}/>,
    // <Route key="AvatarEditDetail" path="/avatar/edit/:id" component={AvatarDetail}/>
//    :id 是占位符   应该根据实际业务id来命名
]