let chalk = require('chalk'),	// just a colors :)
    fs = require('fs');


//----------------------------------------------------------------------------------------
// Option config

let cfg = require("./../config")


class Logger {
    write(msg) {
        let date = new Date(),
            time = date.getDate() + '.' + parseInt(date.getMonth() + 1) + '.' + date.getFullYear() + ' '
                + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

        this.writeConsole(time, msg);
        this.writeFile(time, msg, date);
    }
    writeConsole(time, msg) {
        switch (msg.action) {
            case 'INFO':
                console.log(chalk.green(`[INFO «${time}» ${msg.source}] -> `) + msg.text);
                break;
            case 'ERR':
                console.log(chalk.red(`[ERR «${time}» ${msg.source}] -> `) + msg.text);
                break;
            case 'DEBUG':
                console.log(chalk.cyan(`[DEBUG «${time}» ${msg.source}] -> `) + msg.text);
            default: break;
        }
    }
    async writeFile(time, msg, date) {
        let newDate = `${date.getFullYear()}-${parseInt(date.getMonth() + 1)}-${date.getDate()}`,
            filePath = `${cfg['LOGS_DIR']}/${newDate}.log`,
            msgStr = `[${msg.action} «${time}» ${msg.source}] -> ${msg.text}\n`;

        fs.appendFile(filePath, msgStr, () => { /* ? */ });
    }
}


let logger = new Logger();

module.exports = logger;