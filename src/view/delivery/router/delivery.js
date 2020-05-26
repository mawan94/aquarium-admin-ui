import React from 'react'
import {Route} from 'react-router-dom';

import Index from '../page/index';
import Detail from '../page/detail';

export default [
    <Route key="Delivery" path="/delivery/index" component={Index}/>,
    <Route key="DeliveryAdd" path="/delivery/add" component={Detail}/>,
    <Route key="DeliveryEdit" path="/delivery/edit/:id" component={Detail}/>
]
