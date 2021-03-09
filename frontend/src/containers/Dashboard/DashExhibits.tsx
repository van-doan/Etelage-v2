import React from 'react';
import {Row, Col, Input} from 'antd'
import { TExhibit } from '../../stores/App/Types'
import './styles.scss'

interface Props {
    data: TExhibit,
}

export default (props:Props) => {
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
    
    return(
        <Col className="dashboard-master-exhibits">
            <Row className="dashboard-module-profile-exhibits">
                <Col className="dashboard-module-profile-exhibits-gallery"> 
                    <Input type="image" className="dashboard-module-profile-exhibits-gallery-img" style={{display: handleHidden()}} src={getExhibitImage()}/>
                    <div className="dashboard-module-profile-exhibits-desc">
                        <h3 className="exhibits-title" style={{display: handleHidden()}}>{props.data.title}</h3>
                        <p className="exhibits-desc" style={{display: handleHidden()}}>{props.data.description}</p>
                    </div>
                </Col>
            </Row>
        </Col>
    )
}