import moment from 'moment';

class LogManager {

    showLogs:string|null = localStorage.getItem('logs');
    logs:any[];
    customLogMap: Map<string, boolean> = new Map();

    constructor(){
        this.logs = [];
    }

    on(){
        this.showLogs = "true";
        localStorage.setItem("logs", "true");
    }
    off(){
        this.showLogs = "false";
        localStorage.setItem("logs", "false");
    }

    toggleCustomLogLevel(id:string, status:boolean){
        id = this.transformEventToStorageId(id);
        this.customLogMap.set(id, status);
        localStorage.setItem(id, status.toString());
    }

    transformEventToStorageId(id:string){
        return id + '_custom_log_level';
    }

    multipleConsoleArgs(message:string, style:any, ...args:[any?, ...any[]]){
        this.logs.push({message, ...args});
        if (this.showLogs !== "true") return;

        message = "%c" + message;

        args.unshift(style);
        args.unshift(message + '\n');
        console.log.apply(this, args);
    }

    get Moment(){
        return `${moment().format('MMM DD, YYYY HH:mm')} - `
    }

    action(message:string, ...args:[any?, ...any[]]){
        let style = "color:red";
        message = this.Moment + "Action - " + message;
        this.multipleConsoleArgs(message, style, ...args);
    }

    request(message:string, ...args:[any?, ...any[]]){
        let style = "color:blue";
        message = this.Moment + "Request - " + message;
        this.multipleConsoleArgs(message, style, ...args);
    }

    reaction(message:string, ...args:[any?, ...any[]]){
        let style = "color:green";
        message = this.Moment + "Response - " + message;
        this.multipleConsoleArgs(message, style, ...args);
    }

    component(message:string, ...args:[any?, ...any[]]){
        let style = "color:orange";
        message = this.Moment + "Component - " + message;
        this.multipleConsoleArgs(message, style, ...args);
    }

    customLogLevel(id:string, message:string, ...args:[any?, ...any[]]){
        let style = "color:orange";
        message = this.Moment + `Custom Event Log (${id}) - ` + message;
        let customLogStatus = this.customLogMap.get(id);
        if (customLogStatus || localStorage.getItem(this.transformEventToStorageId(id)) === 'true') this.multipleConsoleArgs(message, style, ...args);
    }

    misc(message:string, ...args:[any?, ...any[]]){
        this.multipleConsoleArgs(message, null, ...args);
    }
}

const Logs = new LogManager();
export default Logs;

(window as any)['LogsManager'] = Logs;