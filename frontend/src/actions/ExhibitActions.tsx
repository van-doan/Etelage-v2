import axios from 'axios';
import { TExhibits, TUser } from '../stores/App/Types';

export default class ExhibitActions {

    static async getOwnExhibits(){
        try {
            let res = await axios.get('http://localhost:1337/exhibits');
            return res.data;
        } catch (e){
            console.log('Could not get user data', e.message);
            return undefined;
        }
    }

    static async saveExhibit(exhibitId:number, values: { title: string, description: string, artwork_ids: string} ){
        if (exhibitId){
            try {
                let res= await axios.put(`http://localhost:1337/exhibits/${exhibitId}`, values.artwork_ids);
                return res.data as TExhibits;
            } catch (e){
                console.error('Could not update exhibit at this time', e.message);
                return undefined
            }
    } else {
            try {
                let exhibitValues = {...values}
                let res = await axios.post('http://localhost:1337/exhibits', values);
                return res.data as TExhibits;
            } catch (e) {
                console.log('Could not create exhibit', e.message);
                return undefined;
            }
        }
    }

}