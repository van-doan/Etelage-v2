import React from 'react'
import './styles.scss'
import { Divider, Input } from 'antd'
import { TExhibit } from '../Explore/Types'

interface Props {
    data: TExhibit,
}

export default (props: Props) => {
    const handleHidden = () => {
        let url = props.data.artwork_ids
        if(url === null){
            return 'none'
        }
    }

    if(!props.data) return null
    let getExhibitImage = () => {
        let url = props.data.artwork_ids
        if (url !== null){
            return url
        } 
    }

    return (
        <div className='exhibit'>
            <div className='exhibit-content'>
                <div className='exhibit-section'>
                    <div className='exhibit-section-featured'>
                        <div className='exhibit-section-featured-title'>
                            <h2>Featured Exhibits</h2>
                        </div>
                        The most liked exhibit will be featured here.
                    </div>
                    <Divider className='exhibit-section-divider'/>
                    <div className='exhibit-section-all'>
                        <div className='exhibit-section-all-title'>
                            <h2>All Exhibits</h2>
                        </div>
                        <div className="exhibit-section-all-desc">
                        {/* {props.data?.map((exhibit) => ( <Option value={exhibit.id}>{exhibit.title}</Option>))} */}

                        <Input type="image" className="dashboard-module-profile-exhibits-gallery-img" style={{display: handleHidden()}} src={getExhibitImage()}/>
                            <h3 className="exhibits-section-all-desc-title" style={{display: handleHidden()}}>{props.data.title}</h3>
                            {/* <p className="exhibits-section-all-desc-user" style={{display: handleHidden()}}>by {props.data.user}</p> */}
                        </div>
                    </div>
                    <Divider className='exhibit-section-divider'/>
                    <div className='exhibit-section-search'>
                        <a className='exhibit-section-search-link' href="/explore">Search artwork</a>
                    </div>
                    {/* <div className='explore-section-text'>
                        <h3 className="explore-section-text-1">THE PRINCIPLES OF TRUE ART IS NOT TO PORTRAY, BUT TO EVOKE.</h3>
                        <h3 className="explore-section-text-2">WHAT DOES YOUR AESTHETIC SAY ABOUT YOU?</h3>
                    </div> */}

                </div>
            </div>
        </div>
    )
}