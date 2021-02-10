import React from 'react';
import { Route } from "react-router-dom";
import { LayoutOutlined } from '@ant-design/icons';

import { BrowserRoutes } from "../../../stores/App/BrowserRouter";
import Dashboard from "../../../containers/Dashboard/Dashboard";

export const AppRoutesObject = {
    'Dashboard': {
        render: <Route key={0} exact path={BrowserRoutes.home + '/'} component={Dashboard}/>,
        path: BrowserRoutes.home,
        icon: <LayoutOutlined/>
    },
};