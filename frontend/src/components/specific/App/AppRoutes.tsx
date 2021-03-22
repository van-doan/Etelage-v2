import React from 'react';
import { Route } from "react-router-dom";
import { LayoutOutlined } from '@ant-design/icons';

import { BrowserRoutes } from "../../../stores/App/BrowserRouter";
import Dashboard from "../../../containers/Dashboard/Dashboard";
import Home from "../../../containers/Home/Home";
import Exhibits from "../../../containers/Exhibit/Exhibit";
import ExhibitById from "../../../containers/Exhibit/ExhibitById";
import Explore from "../../../containers/Explore/Explore";
import UserPages from "../../../containers/UserPages/UserPage";
import StaticDisplay from "../../../components/3D/StaticDisplay/Containers/StaticDisplay";

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
    'User by Id': {
        render: <Route key={4} exact path={BrowserRoutes.userByIdParam} component={UserPages}/>,
        path: BrowserRoutes.userByIdParam,
        icon: <LayoutOutlined/>
    },
    'Exhibit by Id': {
        render: <Route key={5} exact path={BrowserRoutes.exhibitsByIdParam} component={ExhibitById}/>,
        path: BrowserRoutes.exhibitsByIdParam,
        icon: <LayoutOutlined/>
    },
    'Static Display': {
        render: <Route key={6} exact path={BrowserRoutes.static_container} component={StaticDisplay}/>,
        path: BrowserRoutes.static_container,
        icon: <LayoutOutlined/>
    },
};