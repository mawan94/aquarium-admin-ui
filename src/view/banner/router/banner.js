import React from 'react'
import {Route} from 'react-router-dom';

import Index from '../page/index';
import Detail from '../page/detail';

export default [
    <Route key="Banner" path="/banner/index" component={Index}/>,
    <Route key="BannerAdd" path="/banner/add" component={Detail}/>,
    <Route key="BannerEdit" path="/banner/edit/:id" component={Detail}/>
]
