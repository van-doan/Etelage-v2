import {decorate, observable, computed} from "mobx";
import {TUser} from "./Types";

class AppStoreClass {

    initialized:    boolean = false;
    user?:          TUser;
    authToken?:     string;
    authTokenChecked:boolean = false;
    baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'http://localhost:1337';
    
    init(){

    }


    get necessaryDataIsLoaded(){
        return true;
    }
}


decorate(AppStoreClass, {
    authToken:      observable,
    authTokenChecked:observable,
    user:           observable,
    necessaryDataIsLoaded: computed,
});


const AppStore = new AppStoreClass();
export default AppStore;