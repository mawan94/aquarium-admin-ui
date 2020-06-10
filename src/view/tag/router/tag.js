import React from 'react'
import {Route} from 'react-router-dom';

import Index from '../page/index';
import Detail from '../page/detail';

export default [
    <Route key="Tag" path="/tag/index" component={Index}/>,
    <Route key="TagAdd" path="/tag/add" component={Detail}/>,
    <Route key="TagEdit" path="/tag/edit/:id" component={Detail}/>
]
