import React from 'react';
import { Row, Col, Avatar, Image } from 'antd';
import AppStore from "../../stores/App/AppStore";
import './styles.scss'

// import TExhibit from '../../stores/App/Types'

export default () => {
    return(
    <div>
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