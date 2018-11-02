const logger = create_logger('Tasker/log/performTask.txt');


async function func() {
    logger('before task');
    performTask('Slow Task');
    logger('after task');
}
func()

async function launch_task(task_name) {
    logger('launching: ' + task_name)
    
    performTask(task_name);
    while (global('TRUN').includes(task_name)) {await sleep(100)}

    logger('finishing: ' + task_name)
}


function create_logger(path) {
    writeFile(path, '', false);
    return function(msg) {
        var date = new Date(); 
        let hours = '0' + date.getHours();
        let min = '0' + date.getMinutes();
        let sec = '0' + date.getSeconds();
        let ms = '00' + date.getMilliseconds();
        let time = hours.substr(-2) + ":" 
                 + min.substr(-2) + ":" 
                 + sec.substr(-2) + ":" 
                 + ms.substr(-3);
        writeFile(path, `${time}    ${msg}\n`, true);
    }
}