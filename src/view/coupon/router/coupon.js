import React from 'react'
import {Route} from 'react-router-dom';

import Index from '../page/index';
import Detail from '../page/detail';

export default [
    <Route key="Coupon" path="/coupon/index" component={Index}/>,
    <Route key="CouponAdd" path="/coupon/add" component={Detail}/>,
    <Route key="CouponEdit" path="/coupon/edit/:id" component={Detail}/>
]
