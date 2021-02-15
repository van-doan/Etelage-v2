import axios from 'axios';
import { TExhibit } from '../containers/Explore/Types';

export default class ExhibitActions {

    static async getOwnExhibits(){
            let res = await axios.get(
                'http://localhost:1337/exhibits'
                );
            let exhibitData = res.data
            console.log(exhibitData)
        return exhibitData as TExhibit[];
    }

    static async saveExhibit(values: { id:number, title: string, description: string, artwork_ids: string} ){
        if (values.id){
            try {
                let res= await axios.patch(`http://localhost:1337/exhibits/${values.id}`, values.artwork_ids && values.id );
                return res.data as TExhibit;
            } catch (e){
                console.error('Could not update exhibit at this time', e.message);
                return undefined
            }
    } else {
            try {
                let exhibitValues = {...values}
                let res = await axios.post('http://localhost:1337/exhibits', exhibitValues);
                return res.data as TExhibit;
            } catch (e) {
                console.log('Could not create exhibit', e.message);
                return undefined;
            }
        }
    }

}