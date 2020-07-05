import React from 'react'
import {Route} from 'react-router-dom';

import Index from '../page/index';
import Detail from '../page/detail';

export default [
    <Route key="InstructionManual" path="/instruction-manual/index" component={Index}/>,
    <Route key="InstructionManualAdd" path="/instruction-manual/add" component={Detail}/>,
    <Route key="InstructionManualEdit" path="/instruction-manual/edit/:id" component={Detail}/>
]
