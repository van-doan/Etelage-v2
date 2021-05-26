import { createBrowserHistory } from 'history';

/*
 * The browser router class creates an instance of BrowserHistory so we can track the browser's history in a single-page
 * application. Only use this if you are using React as a single-page app. This allows the user to use the native back
 * button or forward buttons as if they were on a regular application. This is closely tied to React Router v4, so check
 * documentation at https://github.com/ReactTraining/react-router for more details. You'll see this instantiated in
 * App.tsx in RR4's <Router/> component.
 *
 */

class BrowserRouterClass {
    history:any;

    constructor(){
        this.history = createBrowserHistory();
    }

    push(url:string){
        this.history.push(url);
        window.scroll(0, 0);
    }

}

const BrowserRouter = new BrowserRouterClass();
export default BrowserRouter;

/*
 * Use this class to statically type the exact browser routes you'd like to handle. If your route uses a param, make
 * make sure to use the "exampleByIdParam" route. It acts as a catch-all, so it will route to your component whether
 * or not you have the ID param in the url.
 */

export class BrowserRoutes {

    static BASE = '';

    /* Data Type Route Chunks */

    static AUTH = 'auth';
    static ACCOUNT = 'account';
    static DEBUGGER = 'debugger';
    static REQUEST_PASSWORD_RESET = 'request_password_reset';
    static PASSWORD_RESET = 'reset_password';
    static LOGIN = 'login';
    static SIGNUP = 'signup';
    static ADMIN = 'admin';
    static DASHBOARD = 'dashboard';
    static HOME = 'home';
    static EXHIBITS = 'exhibits';
    static EXPLORE = 'explore';
    static USERS = 'users';
    static COMMENTS = 'comments';
    static STATIC_CONTAINER = 'static_container';
    static NOT_FOUND = 'not_found';

    static get debugger(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.DEBUGGER}`;
    }
    static get home(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.HOME}`;
    }
    static get dashboard(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.DASHBOARD}`;
    }
    static get exhibits(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.EXHIBITS}`;
    }
    static get explore(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.EXPLORE}`;
    }
    static get comments(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.COMMENTS}`;
    }
    static get static_container(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.STATIC_CONTAINER}`;
    }
    static get not_found(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.NOT_FOUND}`;
    }
    static get users(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.USERS}`;
    }
    static get admin(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.ADMIN}`;
    }
    static get auth(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.AUTH}`;
    }

    /* Data Type Static Routes */

    static get account(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.ACCOUNT}`
    }
    static get login(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.LOGIN}`
    }
    static get signup(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.SIGNUP}`
    }
    static get requestPasswordReset(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.REQUEST_PASSWORD_RESET}`;
    }
    static get passwordReset(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.PASSWORD_RESET}`;
    }
    static get exhibitsByIdParam(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.EXHIBITS}/:exhibitId`;
    }
    static get userByIdParam(){
        return `${BrowserRoutes.BASE}/${BrowserRoutes.USERS}/:userId`;
    }

    static getUserById(userId:number){
        return `${BrowserRoutes.USERS}/${userId}`;
    }

    static getExhibitById(exhibitId:number){
        return `${BrowserRoutes.EXHIBITS}/${exhibitId}`;
    }
}
