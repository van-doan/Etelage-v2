import axios from 'axios';
import { TExhibit, TUser, TComments } from '../stores/App/Types'

export default class UserActions {
    static async getUserById(userId:number){
        try{
            let res = await axios.get(`http://localhost:1337/users/${userId}`)
            return res.data as TUser
        } catch (e) {
            console.log('Could not load user information', e.message);
            return undefined;
        }
    }

    static async getUsers(){
        try {
            let res = await axios.get(`http://localhost:1337/users`)
            return res.data as TUser[]
        } catch (e) {
            console.log('Could not load all users', e.message);
            return undefined;
        }
    }

    static async getUserFollowers(userId: number){
        // A userId needs to be present to retrieve their follower ids
        try{
            let res = await axios.get(`http://localhost:1337/users/${userId}/followers`)
            return res.data
            // This data will need to be split since it'll return as a string
        } catch(e) {
            console.log('Could not get user followers', e.message);
        }
    }

    static async getUserFollowing(userId: TUser){
        // A userId needs to be present to retrieve their following ids
        try{
            let res = await axios.get(`http://localhost:1337/users/following`)
            return res.data
            // This data will need to be split since it'll return as a string
        } catch(e) {
            console.log('Could not get user following', e.message);
        }
    }

    static async followUser( followeeId:number, followerId?:number ) {
            try {
                    let res = await axios.put(`http://localhost:1337/users/${followerId}`, {followees: [followeeId]})
                    return res.data
                
            } catch (e){
                console.error('Could you not follow user at this time', e.message);
                return undefined
            }
        }
    static async unfollowUser( followeeId:number) {
        try {
            let res = await axios.put(`http://localhost:1337/users/unfollow/${followeeId}`)
            console.log('User has been unfollowed')
            return res.data
        } catch (e){
            console.error('Could not unfollow user at this time', e.message);
            return undefined
        }
    }
    static async likeExhibit(userId?:number, exhibitId?:number){
        if(userId){
            try {
                if (exhibitId !== undefined){
                        let res = await axios.put(`http://localhost:1337/users/like/${exhibitId}`);
                        // console.log('This is the liked data', res.data)
                        return res.data;
                    } else {
                        console.error('The exhibit you liked does not exist or may have been deleted!')
                    }
            } catch (e){
                    console.error('Could not like exhibit at this time', e.message);
                    return undefined
            }
        }
    }
    
    static async unlikeExhibit(exhibitId?: number, userId?:number){
        if (userId) {
            try {
                if (exhibitId !== undefined){
                    let res = await axios.put(`http://localhost:1337/users/unlike/${exhibitId}`);
                    console.log('Exhibit has been unliked')
                    return res.data
                } else {
                    console.error('The exhibit you unliked does not exist or may have been deleted!')
                }
            } catch (e) {
                console.log('Could not unlike exhibit at this time', e.message);
                return undefined
            }
        }
    }

    static async getExhibitComments(){
        try {
            let res = await axios.get(`http://localhost:1337/comments`)
            return res.data as TComments[];
        } catch (e){
            console.log('Could not get comments for this exhibit at this time', e.message)
        }
    }

    static async getCommentById(foundCommentId:number){
        try {
            let res = await axios.get(`http://localhost:1337/comments/${foundCommentId}`)
            return res.data as TComments;
        } catch (e){
            console.log('Could not get comments for this exhibit at this time', e.message)
        }
    }

    static async addComment(values:{content: string, exhibit_ids?:TExhibit, users?:TUser}){
        try {
            let res = await axios.post(`http://localhost:1337/comments`, values) 
            console.log(res.data)          
            return res.data as TComments              
        } catch (e) {
            console.log('Could not add comment at this time', e.message)
        }
    }
}
