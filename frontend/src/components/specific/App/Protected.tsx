import React, {Component} from 'react';
import {Redirect, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import {observer} from "mobx-react";
import {Layout} from "antd";

import './styles.scss';

/* App Imports */
import {AppRoutesRenders} from "./RoutesRegister";
import {LoadingOutlined} from "@ant-design/icons";
import AppStore from "../../../stores/App/AppStore";
import HAppHeader from './AppHeader/HAppHeader';
import { BrowserRoutes } from '../../../stores/App/BrowserRouter';
// import Logo from "../../../assets/logo.png";

const {Content} = Layout;

class Protected extends Component<RouteComponentProps, any> {

    componentDidMount(): void {
        AppStore.init();
    }

    render() {

        if (!AppStore.necessaryDataIsLoaded) {
            return (
                <div className='loading-app'>
                    <div className='bounce'>
                        {/* <img alt="Logo" src={Logo} style={{height:50, width:50}}/> */}
                    </div>
                    <div className='loading-text'>
                        <LoadingOutlined spin/>
                        Loading...
                    </div>
                </div>
            );
        }

        return (
            <>
                <HAppHeader/>
                <Layout style={{background: '#000'}}>
                    <Content className='app-content'>
                        <Switch>
                            <Redirect exact from={BrowserRoutes.login} to={BrowserRoutes.home}/>
                            {AppRoutesRenders}
                        </Switch>
                    </Content>
                </Layout>
            </>
        );
    }
}

export default withRouter(observer(Protected));
