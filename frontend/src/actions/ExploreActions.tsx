import axios from 'axios';
import { IArtsyArtworkApiResponse } from '../containers/Explore/Types';
// import { XAPP_TOKEN } from './config/key';

export default class ExploreActions {
    static async getArtwork(value:string){
        // Retrieve XAPP_TOKEN from Artsy API
            let token = await axios.post(
                `https://api.artsy.net/api/tokens/xapp_token?client_id=8ef8eadf0157ee092184&client_secret=a8e7d551a1198a319901d988fa9d2f1d`
            )
                let XAPP_TOKEN = token.data.token
                console.log(XAPP_TOKEN);
        try {    
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

