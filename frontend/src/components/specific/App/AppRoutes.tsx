import React from 'react';
import { Route } from "react-router-dom";
import { LayoutOutlined } from '@ant-design/icons';

import { BrowserRoutes } from "../../../stores/App/BrowserRouter";
import Dashboard from "../../../containers/Dashboard/Dashboard";
import Home from "../../../containers/Home/Home";
import Exhibits from "../../../containers/Exhibit/Exhibit";
import Explore from "../../../containers/Explore/Explore";

export const AppRoutesObject = {
    'Home': {
        render: <Route key={0} exact path={BrowserRoutes.home + '/'} component={Home}/>,
        path: BrowserRoutes.home,
        icon: <LayoutOutlined/>
    },
    'Dashboard': {
        render: <Route key={1} exact path={BrowserRoutes.dashboard} component={Dashboard}/>,
        path: BrowserRoutes.dashboard,
        icon: <LayoutOutlined/>
    },
    'Exhibits': {
        render: <Route key={2} exact path={BrowserRoutes.exhibits} component={Exhibits}/>,
        path: BrowserRoutes.exhibits,
        icon: <LayoutOutlined/>
    },
    'Explore': {
        render: <Route key={3} exact path={BrowserRoutes.explore} component={Explore}/>,
        path: BrowserRoutes.explore,
        icon: <LayoutOutlined/>
    },
};