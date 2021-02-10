export class BrowserUtils {

    static downloadFile(fileName: string, url: string) {
        let downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = fileName;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

    }

    static getParamsFromUrl(url: string) {
        let params: any = {};
        url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
            params[key] = value;
            return value;
        });
        return params;
    }

    static getUrlParams() {
        return BrowserUtils.getParamsFromUrl(window.location.href)
    }
}