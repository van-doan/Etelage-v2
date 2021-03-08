import axios from 'axios';
import { userInfo } from 'os';
import { TUser } from '../stores/App/Types'

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

    static async getUserFollowers(userId: TUser){
        // A userId needs to be present to retrieve their follower ids
        try{
            let res = await axios.get(`http://localhost:1337/users/followers`)
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
}
