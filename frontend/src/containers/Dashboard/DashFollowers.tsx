import React from 'react';
import { Row, Col, Button, Avatar, Image, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { TUser } from '../../stores/App/Types';
import './styles.scss'

const StrapiDomain = 'http://localhost:1337'

interface Props {
    data: TUser,
}

export default (props:Props) => {
    // Get image src for exhibit
    function renderUserAvatar () {
        if (props.data.profile_img.url) {
            return <Avatar size={64} className="dashboard-master-img" 
            src={<Image 
            preview={false}
            src={`${StrapiDomain}${props.data.profile_img.url}`}/>}/>
        } else if (!props.data.profile_img.url) {
            return <Avatar size={64} className="dashboard-module-profile-img" icon={UserOutlined}/>
        }
    }
    
    return(
        <Col className="dashboard-master-follow">
            <Row className="dashboard-module-profile-follow">
                    {renderUserAvatar()}
                    <Button className="follower-name"><a href={`/users/${props.data.id}`} className="follow-page-link">{props.data.username}</a></Button>
            </Row>
        </Col>
    )
}