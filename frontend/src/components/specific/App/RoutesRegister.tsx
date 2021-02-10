import {AppRoutesObject} from "./AppRoutes";

export interface AppRoute extends AppRouteHeader, AppRouteRender {}

export interface AppRouteRender {
    render:any,
}
export interface AppRouteHeader {
    icon:any,
    path:string,
    key?:string,
    hide?:boolean,
}

export interface AppRoutesObject {
    [key:string]:AppRoute,
}

function getAppRoutesRenders(routesObject:AppRoutesObject):AppRouteRender[]{
    return Object.keys(routesObject).map(key => routesObject[key].render)
}

function getAppRoutesHeaders(routesObject:AppRoutesObject):AppRouteHeader[]{
    let ret:AppRouteHeader[] = [];
    Object.keys(routesObject).forEach(key => {
        const {path, icon, hide} = routesObject[key];
        if (!hide) ret.push({key, path, icon} as AppRouteHeader);
    });
    return ret;
}

export const AppRoutesRenders = [
    getAppRoutesRenders(AppRoutesObject),
    //This must go last since there's a / path here
];

export const AppHeaderItemsMap:AppRouteHeader[] = [
    ...getAppRoutesHeaders({
    })
];

export const AppHeaderItems:{[key:string]: AppRouteHeader[]} = {

};

export const AppRoutesPathReference:AppRoutesObject = {

};



