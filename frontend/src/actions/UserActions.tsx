import axios from 'axios';
import { TUser } from '../stores/App/Types'

export default class UserActions {
    static async getUserById(userId:number){
        try{
            let res = await axios.get(`http://localhost:1337/user/${userId}`)
            return res.data as TUser
        } catch (e) {
            console.log('Could not load user information', e.message);
            return undefined;
        }
    }
}