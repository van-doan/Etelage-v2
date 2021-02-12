import cx from 'classnames';
import React, {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {Layout, Avatar, Drawer, Menu} from 'antd';
import {SmileOutlined, CaretDownOutlined} from '@ant-design/icons';
import {observer} from "mobx-react";

import './styles.scss';

import { AppRoutesPathReference, AppHeaderItemsMap } from '../RoutesRegister';
import BrowserRouter, { BrowserRoutes } from '../../../../stores/App/BrowserRouter';
// import Logo from "../../../../assets/logo.png";
import AppActions from "../../../../stores/App/AppActions";
import AppStore from "../../../../stores/App/AppStore";


const {Header} = Layout;

interface Props extends RouteComponentProps {

}

interface State {
    collapsed:boolean,
    showMobileMenu:boolean,
    visible: boolean,
    placement: string,
    closable: boolean,
}

class AppHeader extends Component<Props, any> {

    state:State = {
      collapsed:false,
        showMobileMenu:false,
        visible: false,
        placement: 'right',
        closable: true,
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        }) 
    }

    get selectedKey() {
        for (let key in AppRoutesPathReference){
            if(this.props.location.pathname.includes(AppRoutesPathReference[key].path)) {
                return key;
            }
        }

        return '';
    }
    get menuItems(){
        return AppHeaderItemsMap.map(appRouteHeader => {
            const {key, icon, path} = appRouteHeader;
            return(
                <div key={key} onClick={()=>BrowserRouter.push(path)} className={cx('single-menu-item', {selected: key === this.selectedKey})}>
                    {icon}
                    <span>{key}</span>
                </div>
            )
        })
    }
    get menu(){
        return (
                <Menu className='ant-custom-menu-override'>
                    <Menu.Item className='single-action' onClick={() => BrowserRouter.push(BrowserRoutes.home)}>
                        <div className='right'>
                            <div className='title' onClick={this.onClose}>HOME</div>
                        </div>
                    </Menu.Item>
                    <Menu.Item className='single-action' onClick={() => BrowserRouter.push(BrowserRoutes.dashboard)}>
                        <div className='right'>
                            <div className='title' onClick={this.onClose}>DASHBOARD</div>
                        </div>
                    </Menu.Item>
                    <Menu.Item className='single-action' onClick={() => BrowserRouter.push(BrowserRoutes.exhibits)}>
                        <div className='right'>
                            <div className='title' onClick={this.onClose}>EXHIBITS</div>
                        </div>
                    </Menu.Item>
                    <Menu.Item className='single-action' onClick={() => BrowserRouter.push(BrowserRoutes.explore)}>
                        <div className='right'>
                            <div className='title' onClick={this.onClose}>EXPLORE</div>
                        </div>
                    </Menu.Item>
                    <Menu.Item className='single-action' onClick={AppActions.logout}>
                        <div className='right'>
                            <div className='title' onClick={this.onClose}>LOGOUT</div>
                        </div>
                    </Menu.Item>
                </Menu>
        )
    }

    render() {
        const { placement, visible } = this.state;
        return (
            <Header className='app-header'>
                <div className='content'>
                    <div className='app-header-left'>
                        <div className='logo' onClick={() => BrowserRouter.push(BrowserRoutes.home)}>
                            <div className='logo-text'>
                            </div>
                        </div>
                    </div>
                    <div className='full-width-menu'>
                        <Drawer
                            className="menu-nav"
                            closable={true}
                            onClose={this.onClose}
                            visible={visible}
                            key={placement}>
                        {this.menu}
                        </Drawer>
                    </div>

                    <div className='app-header-right'>
                            <div className='user-container' onClick={this.showDrawer}>
                            <Avatar style={{backgroundColor: '#16c784'}} icon={<SmileOutlined />}/>
                            <div className='user'>
                                <div className='name'>{AppStore.user?.username}</div>
                                <div className='email'>{AppStore.user?.email}</div>
                            </div>
                            <CaretDownOutlined style={{color:'grey'}}/>
                        </div>
                    </div>
                </div>
            </Header>
        )
    }
}

export default withRouter(observer(AppHeader));
