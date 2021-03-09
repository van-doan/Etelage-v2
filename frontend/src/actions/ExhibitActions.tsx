import axios from 'axios';
import { TUser, TExhibit } from '../stores/App/Types'

export default class ExhibitActions {
    static async getOwnExhibits(){
            let res = await axios.get(
                `http://localhost:1337/exhibits`
                );
            let exhibitData = res.data
        return exhibitData as TExhibit[];
    }

    static async getUserExhibits(userId:any) {
        try {
            let res = await axios.get(`http://localhost:1337/users/${userId}/exhibits`)
            return res.data
        } catch (e) {
            console.log('User does not have any exhibits yet', e.message);
            return null;
        }
    }

    static async getExhibitById(exhibitId:number){
        try {
            let res = await axios.get(`http://localhost:1337/exhibits/${exhibitId}`);
            return res.data as TExhibit[];
        } catch (e) {
            console.log('Could not load exhibit at this time', e.message);
            return undefined;
        }
    }

    static async saveExhibit(values: { id:number, title: string, description: string, artwork_ids: string, user: TUser}, exhibit?:any ){
        if (exhibit) {
            try {
                let initialArtworkIds = exhibit.artwork_ids + ", "
                let newArtworkId = values.artwork_ids
                let combinedArtworkIds = initialArtworkIds.concat(newArtworkId)
                let res = await axios.put(`http://localhost:1337/exhibits/${exhibit.id}`, {artwork_ids: combinedArtworkIds});
                return res.data as TExhibit;
            } catch (e){
                console.error('Could not update exhibit at this time', e.message);
                return undefined
            }
    } else {
            try {
                let exhibitValues = {...values}
                let user = values.user
                let res = await axios.post('http://localhost:1337/exhibits', exhibitValues)
                let resTwo = await axios.put(`http://localhost:1337/users/${user.id}`, user.exhibits && exhibitValues)
                // ^ This needs to be edited to add exhibit to user collection
                return res.data as TExhibit && resTwo.data as TUser;
            } catch (e) {
                console.log('Could not create exhibit', e.message);
                return undefined;
            }
        }
    }

}

