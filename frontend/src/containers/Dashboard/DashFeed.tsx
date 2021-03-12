import React, { useState, useEffect } from 'react';
import {Row, Col, Input, Button, Avatar, Image, Divider} from 'antd'
import { TExhibit, TUser } from '../../stores/App/Types'
import { HeartFilled, HeartOutlined, MessageOutlined } from '@ant-design/icons'
import AppStore from "../../stores/App/AppStore";

import UserActions from "../../actions/UserActions"
import ExhibitActions from "../../actions/ExhibitActions"

interface Props {
    data: TExhibit,
}

const moment = require('moment')
const StrapiDomain = 'http://localhost:1337'

export default (props: Props) => {
    const [userDataFromExhibit, setUserDataFromExhibit] = useState<TUser | undefined>();
    const [liked, setLike] = useState(false);
    const [exhibitLikes, setExhibitLikes] = useState<string | null>();

    const handleHidden = () => {
        let url = props.data.artwork_ids
        if(url === null){
            return 'none'
        }
    }
    // Get image src for exhibit
    if(!props.data) return null
    let getExhibitImage = () => {
        let url = props.data.artwork_ids
        if (url !== null){
            return url
        } 
    }

    // See Component Data
    function seeData () {
        let exhibitData = props.data
    }
    seeData();

    async function likeExhibit(){
        if(AppStore.user){
            let userId = AppStore.user.id
            let exhibitId = props.data.id
            console.log('This is the "exhibitId" aka props.data.id', exhibitId)
            let exhibitLiked = await UserActions.likeExhibit(userId, exhibitId);
            console.log("This is the exhibit liked", exhibitLiked)
            setLike(true)
        } else {
            console.log("You must be logged in to like user's exhibits")
        }
    }

    async function unlikeExhibit(){
        if(AppStore.user){
            let userId = AppStore.user.id
            let exhibitId = props.data.id
            let exhibitLiked = await UserActions.unlikeExhibit(userId, exhibitId);
            console.log("This is the exhibit liked", exhibitLiked)
            setLike(false)
        } else {
            console.log("You must be logged in to unlike user's exhibits")
        }
    }


    async function getUserFromExhibit(){
        let followee = props.data.user
        let followeeId = JSON.stringify(followee)
        let followeeData = await UserActions.getUserById(parseInt(followeeId))
        return setUserDataFromExhibit(followeeData);
    }

    async function getExhibitLikes(){
        if(props.data.id){
            let exhibitId = props.data.id;
            let exhibitData = await ExhibitActions.getExhibitData(exhibitId);
            let exhibitLikes = exhibitData?.exhibitLikes.map(user => user.id)
            let exhibitLikesLength = exhibitLikes?.length
            let likes = JSON.stringify(exhibitLikesLength)
            return setExhibitLikes(likes)
        } 
    }

    async function getUserLikes() {
        let userLikes = AppStore.user?.likes
        let exhibitId = props.data.id
        if(userLikes?.find(exhibit => exhibit.id === exhibitId)) {
            setLike(true)
            return <Button 
                    icon={<HeartFilled/>} 
                    className="heart-icon" 
                    onClick={unlikeExhibit} 
                    />
        } else {
            setLike(false)
            return <Button 
                    icon={<HeartOutlined/>} 
                    className="heart-icon" 
                    onClick={likeExhibit}
                    />
            
        }
    }

    useEffect(()=> {
        getExhibitLikes();
        getUserLikes();
        getUserFromExhibit();
    }, [])

    return (
        <Col className="dash-feed-master">
            <Row className="dash-feed-master-container">
                <Col className="dash-feed-user"> 
                    <Row className="dash-feed-user-container">
                        <Button className="dash-feed-user-img" style={{display: handleHidden()}} href={`/users/${userDataFromExhibit?.id}`}> 
                            <Avatar size={36} className="dash-feed-user-img-avatar" 
                            src={<Image 
                                    preview={false}
                                    src={`${StrapiDomain}${userDataFromExhibit?.profile_img.formats.thumbnail.url}`}/>}
                            />
                        </Button> 
                        <Button className="dash-feed-user-username" style={{display: handleHidden()}} href={`/users/${userDataFromExhibit?.id}`}>
                            {userDataFromExhibit?.username}
                        </Button>
                    </Row>
                    <Row className="dash-feed-user-exhibits">
                        <Input type="image" className="dashboard-module-profile-exhibits-gallery-img" style={{display: handleHidden()}} src={getExhibitImage()}/>
                        <Col>
                            <Row className="dash-feed-user-exhibits-icons" style={{display: handleHidden()}}>
                                {liked ? (
                                    <Button 
                                        icon={<HeartFilled/>} 
                                        className="heart-icon" 
                                        onClick={unlikeExhibit} 
                                    />
                                ) : (
                                    <Button 
                                        icon={<HeartOutlined/>} 
                                        className="heart-icon" 
                                        onClick={likeExhibit}
                                    />
                                )}

                                <Button icon={<MessageOutlined/>} className="message-icon" />
                            </Row>
                            <Row className= "dash-feed-user-exhibits-likes">
                                {/* This will eventually be a href link to show users who liked */}
                                { props.data.id ? (
                                    <span className="dash-feed-user-exhibits-desc-likes">
                                        {exhibitLikes} likes
                                    </span>
                                ): (
                                    <span className="dash-feed-user-exhibits-desc-likes">
                                        0 likes
                                    </span>
                                )}
                            </Row>
                            <Row className="dash-feed-user-exhibits-desc">
                                <span className="dash-feed-user-exhibits-desc-username" style={{display: handleHidden()}}>{userDataFromExhibit?.username}</span>
                                <span className="dash-feed-user-exhibits-desc-title" style={{display: handleHidden()}}>{props.data.title}</span>
                                <span className="dash-feed-user-exhibits-desc-exhibitDesc" style={{display: handleHidden()}}>{props.data.description}</span>
                            </Row>
                            <Row className="dash-feed-user-exhibits-comment">
                            <Avatar size={20} className="dash-feed-user-exhibits-comment-avatar" 
                                src={<Image 
                                        preview={false}
                                        src={`${StrapiDomain}${AppStore.user?.profile_img.formats.thumbnail.url}`}/>}
                                />
                                <span className="dash-feed-user-exhibits-comment-text">Add a comment...</span>
                            </Row>
                            <Row className="dash-feed-user-exhibits-date">
                                {moment(props.data.published_at).endOf('day').fromNow()}
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Divider/>
        </Col>
    )
}