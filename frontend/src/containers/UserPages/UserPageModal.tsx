import React, { useState, useEffect } from 'react';
import { Row, Col, Divider, Avatar, Button, Image, message, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './styles.scss'

import { TExhibit, TUser, TComments } from '../../stores/App/Types'
import { HeartFilled, HeartOutlined, MessageOutlined } from '@ant-design/icons'
import AppStore from "../../stores/App/AppStore";

import UserActions from "../../actions/UserActions"
import ExhibitActions from "../../actions/ExhibitActions"

const moment = require('moment')
const StrapiDomain = 'http://localhost:1337'

interface Props {
    data: TExhibit,
}

export default (props:Props) => {
    const [form] = Form.useForm();
    const [userDataFromExhibit, setUserDataFromExhibit] = useState<TUser | undefined>();
    const [liked, setLike] = useState(false);
    const [exhibitLikes, setExhibitLikes] = useState<string | null>();
    const [addedComment, setAddedComment] = useState(false)
    const [comment, setComment] = useState<TComments | undefined>()
    const [commentData, setCommentData] = useState<TComments[] | undefined>();
    const [commentor, setCommentor] = useState<TUser | undefined>()
    const [commentorImg, setCommentorImg] = useState<string | undefined>()
    const [showComment, setShowComment] = useState(false);

    const success = () => {message.success('Your comment has been added!', 3)}

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                    Exhibit Likes Functionality                                             //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get image src for exhibit
    async function likeExhibit(){
        let userId = AppStore.user?.id
        let exhibitId = props.data.id
        console.log('This is the "exhibitId" aka props.data.id', exhibitId)
        let exhibitLiked = await UserActions.likeExhibit(userId, exhibitId);
        console.log("This is the exhibit liked", exhibitLiked)
        await getExhibitLikes()
        setLike(true)
    }
    
    async function unlikeExhibit(){
        let userId = AppStore.user?.id
        let exhibitId = props.data.id
        let exhibitLiked = await UserActions.unlikeExhibit(exhibitId, userId);
        console.log("This is the exhibit liked", exhibitLiked)
        await getExhibitLikes()
        setLike(false)
    }
    

    async function getExhibitLikes(){
        if(props.data.id){
            let exhibitId = props.data.id;
            let exhibitData = await ExhibitActions.getExhibitData(exhibitId);
            let exhibitLikes = exhibitData?.exhibitLikes.map(user => user.id)
            let exhibitLikesLength = exhibitLikes?.length
            let likes = JSON.stringify(exhibitLikesLength)
            setExhibitLikes(likes)
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                     Comments Functionality                                                 //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const handleShow = () => setShowComment(true)
    
    async function addComment() {
        if(props.data.id){
            let exhibitId = props.data.id;
            let users = AppStore.user
            setCommentor(users)
            let exhibit_ids = await ExhibitActions.getExhibitData(exhibitId);
            let content = await form.getFieldValue(['content'])
            await UserActions.addComment({content, exhibit_ids, users})
            setAddedComment(true)
            getComments();
        }
    }
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        await addComment();
        success();
        setShowComment(false)
    }

    async function getComments() {
            // Get Exhibit Comment Data
            let exhibitId = props.data.id;
            let exhibitData = await ExhibitActions.getExhibitData(exhibitId);
            let exhibitCommentData = exhibitData?.comments
            let exhibitCommentId = exhibitData?.comments.find(comment => comment.id)
            let foundCommentId = exhibitCommentId?.id
            if(foundCommentId){
                let exhibitComments = exhibitData?.comments.find(comment => comment.content)
                let foundCommentWithId = await UserActions.getCommentById(foundCommentId)
                let commentor = foundCommentWithId?.users
                let foundUser = commentor?.find(user => user)
                let commentorImg = foundUser?.profile_img.formats.thumbnail.url
                    // console.log('This is the url of the commentor img', commentorImg)
                    // console.log('This is the found data for the comment', foundCommentWithId)
                setCommentorImg(commentorImg)
                setComment(exhibitComments)
                setCommentData(exhibitCommentData)
            }
        } 

    async function updateComments(){
        if(addedComment){
            getComments()
        }
    }

    async function getUserFromExhibit(){
        let followee = props.data.user
        let followeeId = JSON.stringify(followee)
        let followeeData = await UserActions.getUserById(parseInt(followeeId))
        return setUserDataFromExhibit(followeeData);
    }

    useEffect(()=> {
        updateComments();
        getComments();
        getExhibitLikes();
        getUserLikes();
        getUserFromExhibit();
    }, [])
    
    return(
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
                            <Col className="dash-feed-user-exhibits-desc">
                                <Row><span className="dash-feed-user-exhibits-desc-username" style={{display: handleHidden()}}>{userDataFromExhibit?.username}</span>
                                <span className="dash-feed-user-exhibits-desc-title" style={{display: handleHidden()}}>{props.data.title}</span>
                                </Row>
                                <Row>
                                    <span className="dash-feed-user-exhibits-desc-exhibitDesc" style={{display: handleHidden()}}>{props.data.description}</span>
                                </Row>
                            </Col>
                            {comment ? ( commentData?.map(comment =>
                            <Row className="dash-feed-user-exhibits-userComments">
                                <Avatar size={18}
                                    className="dash-feed-user-exhibits-commentor"
                                    src={<Image
                                        preview={false}
                                        src={`${StrapiDomain}${commentorImg}`}/>}
                                    />
                                    <span className="dash-feed-user-exhibits-comments">{comment.content}</span> 
                            </Row>
                            )
                            ):(
                                null
                            )}
                            <Row className="dash-feed-user-exhibits-comment" style={{display: showComment ? 'none' : 'flex'}}>
                            <Avatar size={20} className="dash-feed-user-exhibits-comment-avatar" 
                                src={<Image 
                                        preview={false}
                                        src={`${StrapiDomain}${AppStore.user?.profile_img.formats.thumbnail.url}`}/>}
                                />
                                <Button className="dash-feed-user-exhibits-comment-text" onClick={handleShow}>Add a comment...</Button>
                            </Row>
                            <Row className="dash-feed-user-exhibits-comment-form" style={{display: showComment ? 'flex' : 'none'}}>
                                <Form
                                form={form}
                                style={{display: 'flex'}}>
                                    <Form.Item
                                        className="comment-container"
                                        rules={[{required: true}]}
                                        name="content">
                                        <Input 
                                            className="comment-field" 
                                            allowClear/>
                                    </Form.Item>
                                    <Form.Item
                                        className="comment-container"
                                        rules={[{required: true}]}
                                        name="user"
                                        style={{display: 'none'}} 
                                        initialValue={commentor}>
                                            <Input 
                                            className="comment-field" 
                                            />
                                    </Form.Item>
                                    <Form.Item
                                        className="comment-container"
                                        rules={[{required: true}]}
                                        name="exhibit"
                                        style={{display: 'none'}} 
                                        initialValue={props.data}>
                                            <Input 
                                            className="comment-field" 
                                            />
                                    </Form.Item>
                                    <Form.Item
                                        className="btn-container">
                                        <Button className="comment-btn" htmlType="submit" onClick={handleSubmit}>
                                            Comment
                                        </Button>
                                    </Form.Item>
                                </Form>
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