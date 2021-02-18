import React, {useCallback, useEffect, useState} from 'react';
import ExhibitDisplayPage from './ExhibitDisplayPage'

import { Layout } from 'antd'

import './styles.scss';
import ExhibitActions from '../../actions/ExhibitActions';
import { TExhibit } from '../Explore/Types';

const { Content } = Layout;

// This page will serve as the parent to pass down exhibit props

export default () => {
    const [loading, setLoading] = useState(false)
    const [exhibitData, setExhibitData] = useState<TExhibit[] | undefined>();
    
    function renderExhibitResults() {
        if(loading) {
            return <div className="exhibits-loading" style={{textAlign: 'center', margin: '12px 0'}}>Loading...</div>
        } else if (exhibitData) {
            return exhibitData.map((exhibit, index) => (
                <ExhibitDisplayPage key={index} data={exhibit}/>
            ))
        }
    }

    const getExhibitData = useCallback(async () => {
        setLoading(true);
        let exhibitInfo = await ExhibitActions.getOwnExhibits();
        setExhibitData(exhibitInfo);
        setLoading(false)
    }, [])

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
                {renderExhibitResults()}
        </div>
    )
}