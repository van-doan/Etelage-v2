import moment from 'moment';

export default class NumbersUtil {
    static isANumber(number:number){
        if (number === undefined || number === null) return false;
        else return (!isNaN(number));
    }
    static toDuration(ms:number){
        let duration = moment.duration(ms);

        let seconds = NumbersUtil.prependZeroToDuration(duration.seconds());
        let minutes = NumbersUtil.prependZeroToDuration(duration.minutes());
        let hours = NumbersUtil.prependZeroToDuration(duration.hours());

        return `${hours}:${minutes}:${seconds}`;
    }

    static prependZeroToDuration(number:number){
        if (number < 10 && number > -10) return `0${number.toString()}`;
        else return number.toString();
    }
    static toDurationPretty(ms:number){
        let dur = moment.duration(ms);
        let hours = dur.hours();
        let minutes = dur.minutes();
        let seconds = dur.seconds();

        let str = '';
        if (hours) str += `${hours}h `;
        if (minutes || hours) str += `${minutes}m `;
        str += `${seconds}s`;

        return str;
    }
}