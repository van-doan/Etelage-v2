import axios from 'axios';
import { XAPP_TOKEN } from './config/key';
import { IArtsyArtworkApiResponse } from '../containers/Explore/Types'

export default class ExploreActions {
    
    static async getArtwork(value:string){
        try{
            let res = await axios.get(
                `https://api.artsy.net/api/search?q=${value}&type=artwork`,
                {
                    headers: {
                        'X-Xapp-Token': XAPP_TOKEN,
                        'Accept': 'application/vnd.artsy-v2+json'
                    }
                });
                let data = res.data
                console.log(data)
            return data as IArtsyArtworkApiResponse;
        } catch (e) {
            console.log('Could not retrieve artwork', e.message);
            return undefined;
        }
    }
}

