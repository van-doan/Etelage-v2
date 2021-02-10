export class StringUtils {
    static capitalize(str:string|null){
         if (!str) return '';
         let lowercase = str.toLowerCase();
         return lowercase[0].toUpperCase() + lowercase.substr(1);
    }

    static camelCaseToRegular(string: string, capFirstLetter = false, capAllWords = false) {
        if (capFirstLetter) string = string.charAt(0).toUpperCase() + string.substr(1);
        string = string.split('_').map(word => {
            if (capAllWords) return StringUtils.capitalize(word);
            else return word;
        }).join(' ');
        return string;
    }

    static insert(str:string, index:number, insert:string,){
        if (index > 0) {
            return str.substring(0, index) + insert + str.substring(index, str.length);
        }else return str;
    }

    static addMultipleToNoun(num:number, noun:string, modifier = 's'){
        if (num === 1) return noun;
        else return noun + modifier;
    }
}