import React, {useCallback, useEffect, useState} from 'react';

// Component Actions & Structure
import ExhibitActions from '../../actions/ExhibitActions';
import { TExhibit } from '../../stores/App/Types'

// AntDesign Imports
import { Layout, Input, Divider, Form, Button } from 'antd'

///Custom Styling
import './styles.scss';
import BrowserRouter, { BrowserRoutes } from '../../stores/App/BrowserRouter';

const { Content, Footer } = Layout;

export default () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [exhibitData, setExhibitData] = useState<TExhibit[] | undefined>();
    
    const getExhibitData = useCallback(async () => {
        setLoading(true);
        let exhibitInfo = await ExhibitActions.getOwnExhibits();
        setExhibitData(exhibitInfo);
        setLoading(false)
    }, [])

    // async function handleSubmit() {
    //     let userId = form.getFieldValue('user')
    //     console.log('This is the userId submitted', userId)
    //     let foundUser = exhibitData?.filter((exhibit) => (exhibit.user.id === userId))
    //     return foundUser;
    // }


    // This function iterates all existing exhibits for all users
    function renderExhibitResults() {
        if(loading) {
            return <div className="exhibits-loading" style={{textAlign: 'center', margin: '12px 0'}}>Loading...</div>
        } else if (exhibitData) {
            const handleHidden = (url:any) => {
            if(url === null) {
                return 'none'
            }
        }
            return exhibitData.map((exhibit) => (
                <div className="exhibit-section-all-content">
                    <Input type="image" src={exhibit.artwork_ids} style={{display: handleHidden(exhibit.artwork_ids)}}/>
                    <h2 className="exhibit-section-all-label" style={{display: handleHidden(exhibit.artwork_ids)}}>
                        {exhibit.title} 
                    </h2>
                    <h4 className="exhibit-section-all-label" style={{display: handleHidden(exhibit.artwork_ids)}}>
                        curated by 
                    </h4>
                    <Button 
                        className="user-link-btn"
                        block 
                        onClick={() => BrowserRouter.push(`${BrowserRoutes.users}/${exhibit.user.id}`)}
                        htmlType="submit">
                            {exhibit.user.username}
                    </Button>
                </div>
            ))
        }
    }
    // This calls the API call on page load as a side effect
    useEffect(() => {
        getExhibitData()
    }, [getExhibitData])

    return (
        <div className='exhibit-display'>
            <Content className='exhibit-display-content-first'>
                <div className='exhibit-display-content-first-logo'>
                    EXHIBITS
                </div>    
            </Content>
            <Divider className='exhibit-display-content-divider'/>
            <Content className='exhibit-section-featured'>
                <div className='exhibit-section-featured-title'>
                    <h2>Featured Exhibits</h2>
                </div>
                The most liked exhibit will be featured here.
            </Content>
            <Divider className='exhibit-section-divider'/>
            <Content className='exhibit-section-all'>
                <div className='exhibit-section-all-title'>
                    <h2>All Exhibits</h2>
                </div>
                {renderExhibitResults()}
            </Content>
            <Footer className='exhibit-section-search'>
                <a className='exhibit-section-search-link' href="/explore">Search More Artwork</a>
            </Footer>
        </div>
    )
}