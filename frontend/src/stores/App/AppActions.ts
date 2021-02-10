import AppStore from "./AppStore";
import {
    LSAuthTokenKey,
    TLoginResponse,
    TLoginValues, TSignupResponse, TSignupValues, TUser,
} from "./Types";
import axios from 'axios';

export default class AppActions {

    static async checkForAuthToken(){
        let authToken = localStorage.getItem(LSAuthTokenKey);
        if (authToken) {
            let url = `${AppStore.baseUrl}/users/me`;
            let headers = {'Authorization': `Bearer ${authToken}`};
            try{
                let res = await axios.get<TUser>(url, { headers });
                AppActions.onUserIsAuthenticated(authToken, res.data, false);
            } catch (e) {
                // AppActions.logout();
            }
        }
        AppStore.authTokenChecked = true;
    }

    static async sendPasswordResetEmail(email:string){
        let url = `${AppStore.baseUrl}/auth/forgot-password`;
        try{
            await axios.post(url, {email});
            return true;
        } catch (e) {
            console.error('Could not send password reset email', e.message);
            return false;
        }
    }

    static async resetPassword(values:any){
        let url = `${AppStore.baseUrl}/auth/reset-password`;
        try{
            let res = await axios.post(url, values);
            return res.data;
        } catch (e) {
            console.error('Could not send password reset email', e.message);
            return false;
        }
    }

    static async signup(values:TSignupValues){
        let signupUrl = `${AppStore.baseUrl}/auth/local/register`;
        values.username = values.email;
        try{
            let res = await axios.post<TSignupResponse>(signupUrl, values);
            AppActions.onUserIsAuthenticated(res.data.jwt, res.data.user);
            return true;
        } catch (e) {
            if (e.response.data){
                return e.response.data?.non_field_errors?.[0]
            }
            console.log('Could not sign in user');
            return false;
        }
    }

    static async onUserIsAuthenticated(authToken:string, user?:TUser, set = true){
        if (set) localStorage.setItem(LSAuthTokenKey, authToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        AppStore.user = user;
        AppStore.authToken = authToken;
    }

    static async login(values:TLoginValues){
        let loginUrl = `${AppStore.baseUrl}/auth/local`;
        const {username, password} = values;
        try{
            let res = await axios.post<TLoginResponse>(loginUrl, {identifier:username, password});
            AppActions.onUserIsAuthenticated(res.data.jwt, res.data.user);
            return true;
        }catch (e) {
            if (e.response.data){
                return e.response.data?.non_field_errors?.[0]
            }
            console.log('Could not sign in user');
            return false;
        }
    }

    static logout(){
        try{
            localStorage.removeItem(LSAuthTokenKey);
            window.location.replace('/');
        }catch (e) {
            console.log('Could not logout user');
        }
    }
}