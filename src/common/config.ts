import path from "path"

const logError = function (err: any) {

    const iDate = new Date();
    const date = ("0" + iDate.getDate()).slice(-2);
    const month = ("0" + (iDate.getMonth() + 1)).slice(-2);
    const year = iDate.getFullYear();
    const hours = iDate.getHours();
    const minutes = iDate.getMinutes();
    const seconds = iDate.getSeconds();
    const fs = require('fs')
    const dir = path.join(__dirname, '../../log/' + month + '-' + date + '-' + year)
    const filePath = dir + '/err-' + hours + ".txt"

    let errMessage = "*************************************************************************************************************************\r\n\r\n"
    errMessage += "*************************************************************************************************************************\r\n\r\n"
    errMessage += "Time :- " + hours + ":" + minutes + ":" + seconds + "\r\n"

    if (err.message) {
        errMessage += "Error Message :- " + err.message + "\r\n"
    }

    if (err.status) {
        errMessage += "Error Status :- " + err.status + "\r\n"
    }

    if (err.stack) {
        errMessage += "Error Stack :- " + err.stack + "\r\n"
    }

    errMessage += "\r\n"
    errMessage += "*************************************************************************************************************************\r\n\r\n"
    errMessage += "*************************************************************************************************************************\r\n\r\n"

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    fs.appendFile(filePath, errMessage, (fsErr: any) => {
        if (fsErr) {
            console.error(err)
            console.error(fsErr)
        }
    });
}

export const config = {
    logError: logError,
}