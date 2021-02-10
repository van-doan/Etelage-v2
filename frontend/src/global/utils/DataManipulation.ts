export default class DataManipulation {

    static compare(a:any, b:any){
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
    }

    static snakeCaseToSentence(text:string){
        let result = text.replace(/_/g, " ");
        return result.charAt(0).toUpperCase() + result.slice(1); // capitalize the first letter - as an example.
    }

    static insertAndShift(arr:any[], from:number, to:number) {
        let cutOut = arr.splice(from, 1)[0]; // cut the element at index 'from'
        arr.splice(to, 0, cutOut);            // insert it at index 'to'
        return arr;
    }
}