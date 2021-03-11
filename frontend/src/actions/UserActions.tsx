import { ConsoleSqlOutlined } from '@ant-design/icons';
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
    static async likeExhibit(user:TUser, userId:number, exhibitId?:number ){
        if (userId) {
            try {
                if (exhibitId !== undefined){
                    // let userExistingLikes = user.likes
                    // console.log('This is the user likes as is', userExistingLikes)
                    // let exhibitIds = userExistingLikes.map(exhibit => ({id: exhibit.id}))
                    // console.log('This is the user exhibit Ids after mapping', exhibitIds)
                    // let newUserLikes = exhibitIds.push({id: exhibitId});
                    let res = await axios.put(`http://localhost:1337/users/${userId}`, {likes: exhibitId});
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
    static async unlikeExhibit(userId:number){
        try {
            let res = await axios.put(`http://localhost:1337/users/${userId}`);
            console.log('Exhibit has been unliked')
            return res.data
        } catch (e) {
            console.log('Could not unlike exhibit at this time', e.message);
            return undefined
        }
    }

}
