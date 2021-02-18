import React from 'react';
import { Row, Col, Input, Avatar, Image, Divider } from 'antd';
import AppStore from "../../stores/App/AppStore";
import { TExhibit } from '../Explore/Types'
// import Dashboard from './Dashboard'

import './styles.scss'

const StrapiDomain = 'http://localhost:1337'

export default () => {

    return(
        <div>
            <Row className="dashboard-module-profile">
                <div className="dashboard-module-profile-section">
                    <div className="dashboard-module-profile-section-left">
                        <Avatar size={64} className="dashboard-module-profile-img" 
                            src={<Image 
                            preview={false}
                            src={`${StrapiDomain}${AppStore.user?.profile_img.url}`}/>}/>
                        <div className="dashboard-module-profile-info">
                            <span className="username">{AppStore.user?.username}</span>
                            <br/>
                            <span>{AppStore.user?.user_bio}</span>
                        </div>
                    </div>
                </div>
            </Row>
            <Row className="dashboard-module-profile-section-stats">
                <Col className="dashboard-module-profile-stats-col">
                    <div className="dashboard-module-profile-stats-title">
                        <h4>Exhibits</h4>
                    </div>
                    <div className="dashboard-module-profile-stats-num">
                        <h5>3</h5>
                    </div>
                </Col>
                <Col className="dashboard-module-profile-stats-col">
                    <div className="dashboard-module-profile-stats-title">
                        <h4>Followers</h4>
                    </div>
                    <div className="dashboard-module-profile-stats-num">
                        <h5>10.5m</h5>
                    </div>
                </Col>
                <Col className="dashboard-module-profile-stats-col">
                    <div className="dashboard-module-profile-stats-title">
                        <h4>Following</h4>
                    </div>
                    <div className="dashboard-module-profile-stats-num">
                        <h5>0</h5>
                    </div>
                </Col>
            </Row>
    </div>
    )
}