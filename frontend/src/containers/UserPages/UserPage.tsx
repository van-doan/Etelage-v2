import React, {useEffect, useState, useCallback} from 'react'
import {Row, Col, Layout, Avatar, Image, Divider, Input, Button, message} from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import AppStore from '../../stores/App/AppStore'

import { TUser } from '../../stores/App/Types'
import UserActions from '../../actions/UserActions'

import './styles.scss'

const moment = require('moment')
const { Content } = Layout
const StrapiDomain = 'http://localhost:1337'

interface Props extends RouteComponentProps<{userId:string}>{

}

export default (props:Props) => {
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState<TUser | undefined>();
    const [following, setFollowing] = useState(false)
    
    async function onFollow(){
        let userId = props.match.params.userId
        console.log('After button click, this is the user id', userId)
        await UserActions.followUser(parseInt(userId), AppStore.user?.id)
        let success = () => {message.success(`You are now following ${userData?.username}`, 3)}
        success();
        return setFollowing(true)
    }

    async function onUnfollow(){
        let userId = props.match.params.userId
        console.log('After button click, this is the user id', userId)
        await UserActions.unfollowUser(parseInt(userId))
        let success = () => {message.success(`You have unfollowed ${userData?.username}`, 3)}
        success(); 
        return setFollowing(false)
    }
    

    const getUserData = useCallback(async () => {
        setLoading(true);
        let userId = props.match.params.userId
        let userInfo = await UserActions.getUserById(parseInt(userId));
        console.log(userInfo)
        setUserData(userInfo);
        setLoading(false)
    }, [])

    useEffect(() => {
        getUserData()
    }, [getUserData])
    
    function renderUserExhibits() {
        if(loading) {
            return <div className="exhibits-loading" style={{textAlign: 'center', margin: '20px 0'}}>Exhibits Loading...</div>
        } else {
            return userData?.exhibits.map((exhibit) => (
                <div className="user-section-all-content">
                    <Input type="image" className="user-section-all-image" src={exhibit.artwork_ids}/>
                    <h2 className="user-section-all-label">
                        {exhibit.title} 
                    </h2>
                    <h4 className="user-section-all-label">
                        {moment(exhibit.published_at).format('MM/DD/YY')}
                    </h4>
                </div>
            ))
        }
    }
    
    return (
        <div>
        <Divider className="user-module-divider"/>
        <Row className="user-module-profile">
                <div className="user-module-profile-section">
                    <div className="user-module-profile-section-left">
                        <Avatar size={64} className="user-module-profile-img" 
                            src={<Image 
                            preview={false}
                            src={`${StrapiDomain}${userData?.profile_img.formats.thumbnail.url}`}/>}/>
                        <div className="user-module-profile-info">
                            <span className="username">{userData?.username}</span>
                            <span className="user-description">{userData?.user_bio}</span>
                        </div>
                    </div>
                </div>
            </Row>
            <Divider className="user-module-profile-section-divider">
            {userData?.id !== AppStore.user?.id ? (
                    <div className="follow-btn-container">
                {following ? (
                    <Button 
                        className="follow-btn"
                        title="Unfollow" 
                        type="ghost" 
                        onClick={()=> onUnfollow()}
                        >
                        Unfollow
                        </Button>
                ) : 
                (
                    <Button 
                        className="follow-btn"
                        title="Follow" 
                        type="ghost" 
                        onClick={()=> onFollow()}>
                            Follow
                    </Button>
                )
                }
                    </div>
                ): null}
            </Divider>
            <Row className="user-module-profile-section-stats">
                <Col className="user-module-profile-stats-col">
                    <div className="user-module-profile-stats-title">
                        <h4>Exhibits</h4>
                    </div>
                    <div className="user-module-profile-stats-num">
                        <h5>3</h5>
                    </div>
                </Col>
                <Col className="user-module-profile-stats-col">
                    <div className="user-module-profile-stats-title">
                        <h4>Followers</h4>
                    </div>
                    <div className="user-module-profile-stats-num">
                        <h5>10.5m</h5>
                    </div>
                </Col>
                <Col className="user-module-profile-stats-col">
                    <div className="user-module-profile-stats-title">
                        <h4>Following</h4>
                    </div>
                    <div className="user-module-profile-stats-num">
                        <h5>0</h5>
                    </div>
                </Col>
            </Row>
            <Divider />
            <Row className="user-module-profile-section-exhibits">
                <Col className="user-module-profile-exhibits-col">
                    <div className="user-module-profile-exhibits-title">
                        <h2 className="user-module-profile-header">{userData?.username}'s Exhibits</h2>
                    </div>
                    <div className="user-module-profile-exhibits-num">
                        {renderUserExhibits()}
                    </div>
                </Col>
            </Row>
            </div>
    )
}