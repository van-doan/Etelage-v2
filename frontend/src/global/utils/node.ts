export default class NodeUtils {

    static async sleep(ms:number){
        return await new Promise(r => setTimeout(r, ms));
    }
}