import React from 'react';
import { Row, Col, Avatar, Image } from 'antd';
import AppStore from "../../stores/App/AppStore";
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
        <Row className="dashboard-module-profile-stats">
            <Col className="dashboard-module-profile-stats-col">
                <div className="dashboard-module-profile-stats-col-label">
                    Exhibits
                </div>
                <div className="dashboard-module-profile-stats-col-num">
                    800
                </div>
            </Col>
            <Col className="dashboard-module-profile-stats-col">
                <div className="dashboard-module-profile-stats-col-label">
                    Following
                </div>
                <div className="dashboard-module-profile-stats-col-num">
                    3
                </div>
            </Col>
            <Col className="dashboard-module-profile-stats-col">
                <div className="dashboard-module-profile-stats-col-label">
                    Followers
                </div>
                <div className="dashboard-module-profile-stats-col-num">
                    10m
                </div>
            </Col>
        </Row>
    </div>
    )
}