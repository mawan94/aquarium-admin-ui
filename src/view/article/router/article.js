import React from 'react'
import {Route} from 'react-router-dom';

import Index from '../page/index';
import Detail from '../page/detail';

export default [
    <Route key="Article" path="/article/index" component={Index}/>,
    <Route key="ArticleAdd" path="/article/add" component={Detail}/>,
    <Route key="ArticleEdit" path="/article/edit/:id" component={Detail}/>
]
