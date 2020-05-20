import React from 'react'
import {Route} from 'react-router-dom';

import Detail from '../page/detail';

export default [
    <Route key="SkuAdd" path="/sku/add/:productId" component={Detail}/>,
    <Route key="SkuEdit" path="/sku/edit/:productId/:skuId" component={Detail}/>
]
