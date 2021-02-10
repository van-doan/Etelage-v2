import React, {Component} from 'react';
import {Route, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import {observer} from "mobx-react";
import {Layout} from "antd";

import './styles.scss';

/* App Imports */
import Protected from "./Protected";
import Auth from "../Auth/Auth";
import AppActions from '../../../stores/App/AppActions';
import AppStore from "../../../stores/App/AppStore";

class App extends Component<RouteComponentProps, any> {

    componentDidMount(): void {
        AppActions.checkForAuthToken();
    }

    get routes(){
        if (!AppStore.authTokenChecked) return null;
        else if (AppStore.authToken) return <Route component={Protected}/>
        else if (!AppStore.authToken) return <Route component={Auth}/>
        else return null;
    }

    render() {
        return (
            <Layout className='app' id='app' style={{minHeight:'100vh'}}>
                <Switch>
                    {this.routes}
                </Switch>
            </Layout>
        );
    }
}

export default withRouter(observer(App));
