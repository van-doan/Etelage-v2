// import { UserSwitchOutlined } from "@ant-design/icons";
import axios from "axios";
import {TUser} from "../stores/App/Types";
// import { UserSettingsValidationSchema } from "../stores/App/ValidationSchemas";

export default class DashboardActions {

    static async getUserData(){
        try {
            let res = await axios.get('http://localhost:1337/users');
            return res.data as TUser[];
        } catch (e){
            console.log('Could not get user data', e.message);
            return undefined;
        }
    }
    
    static async getOwnUserData(userId:any){
        try {
            let res = await axios.get(`http://localhost:1337/users/${userId}`);
            return res.data as TUser;
        } catch (e){
            console.log('Could not retrieve your user data... do you exist?', e.message);
            return null;
        }

    } 

    static async editUserData(userId:any, values: {username?:string, user_bio?: string} ){
        if(userId){
            try {
                let res = await axios.put(`http://localhost:1337/users/${userId}`, values);
                console.log('This is the data being passed through from the edit form', res.data)
                return res.data;
            } catch (e){
                console.log('Could not create assessment template', e.message);
                return undefined;
            }

        }
    }

    static async retrieveUserPicture(attachmentId:number){
        try {
            let res = await axios.get(`http://localhost:1337/upload/files/${attachmentId}`);
            return res.data as TUser;
        } catch (e) {
            console.log('Could not retrieve user media file', e.message);
            return undefined;
        }
    }

    static async uploadFilesForUser(file:File, userId:number) {
        let formData = new FormData();
        formData.append('files', file);    
        formData.append('refId', userId.toString());
        formData.append('ref', 'User');
        formData.append('field', 'profile_img');
        try{
            let res = await axios.post('http://localhost:1337/upload', formData);
            return res.data;
        } catch (e){
            console.error('Could not upload file for Response', e.message);
            return undefined;
        }
    }
}