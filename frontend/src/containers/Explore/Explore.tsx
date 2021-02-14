import React, { useState } from 'react';
import { Form, Input } from 'antd'

import ExploreActions from '../../actions/ExploreActions'
import ExploreResults from './ExploreResults'

import { IArtsyArtwork, IArtsyArtworkApiResponse } from './Types'

import './styles.scss';

interface Props {

}

export default (props:Props) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<IArtsyArtworkApiResponse | undefined>();
    const [value, setValue] = useState<string>('');


    function handleChange(e:any) {
        setValue(e.target.value)
    }

    async function handleSubmit(e:any) {
        setLoading(true);
        e.preventDefault();
        let artworkData = await ExploreActions.getArtwork(value);
        setData(artworkData)
        console.log(artworkData)
        setLoading(false);
    }

    let isEnabled = value !== ''

    function renderSearchResults () {
        if(loading) {
          return <div className="art-loading" style={{textAlign: "center", margin: "12px 0"}}>Loading...</div>
        } else if (data) {
          return data._embedded.results.map((artwork, index) => (
            <ExploreResults key={index} data={artwork} />
          ))
        } 
    }

    return (
        <div className='explore'>
            <div className='explore-content'>
                <div className='explore-section'>
                    <div className="explore-section-title">EXPLORE</div>
                        <Form className='explore-section-form'>
                            <Input className='explore-query' type='text' name='value' placeholder="art, contemporary, Banksy..." value={value} onChange={handleChange}></Input>
                            <Input className='explore-search' type='submit' value='Search' onClick={handleSubmit} disabled={!isEnabled}></Input>
                        </Form>
                    </div>
                    <div className='explore-section-content'>
                        {data ? 
                        <div className='explore-section-content-label'>Showing search results for "{data.q}"... </div> :
                        <span className='explore-section-content-results'>Don't see any results? Use the search bar above.</span>}
                        {renderSearchResults()}
                    </div>
                </div>
            </div>
    )
}