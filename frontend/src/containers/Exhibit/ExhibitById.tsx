import React, {useEffect, useState, useCallback} from 'react'
import {Row, Col, Input, Layout} from 'antd'

import { TUser } from '../../stores/App/Types'
import UserActions from '../../actions/UserActions'

const { Content } = Layout

export default () => {
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState<TUser | undefined>();

    const getUserData = useCallback(async () => {
        setLoading(true);
        let userInfo = await UserActions.getUserById();
        console.log(userInfo)
        setUserData(userInfo);
        setLoading(false)
    }, [])

    // function renderUserData() {
    //     if(loading) {
    //         return <div className="user-loading" style={{textAlign: 'center', margin: '12px 0'}}>User Loading...</div>
    //     } else if (userData) {
    //         return userData.map((user) => (
    //             <Content className="user-dashboard">
                    
    //             </Content>
    //         ))
    //     }
    // }

    useEffect(() => {
        getUserData()
    }, [getUserData])

    return (
        <Row className="dashboard-module-profile-exhibits">
                <Col className="dashboard-module-profile-exhibits-gallery"> 
                    <Input type="image" className="dashboard-module-profile-exhibits-gallery-img"/>
                    <div className="dashboard-module-profile-exhibits-desc">
                        <h3 className="user-title">User Title</h3>
                        <p className="user-desc">User Description</p>
                    </div>
                </Col>
            </Row>
    )
}