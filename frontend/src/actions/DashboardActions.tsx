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
    
    static async editUserData(userName:string, ){
        try {
            let res = await axios.post(`http://localhost:1337/users/${userName}`);
            return res.data as TUser;
        } catch (e){
            console.log('Could not create assessment template', e.message);
            return undefined;
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