function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}


const logger = create_logger('Tasker/log/app_blocker.txt');

const higher_prio = parseInt(priority) + 1;
const TIMES = () => {return parseInt(global('TIMES'))}
const Disengaged_until = () => {return parseInt(global('Disengaged_until'))}
// const Disengaged = () => {return parseInt(global('Disengaged'))}
// const Pomo = () => {return parseInt(global('Pomo'))}

function get_global(variable) {

}

app_blocker(par1)
async function app_blocker(blocked=false) {
    
    /* initialize vars */
    
    performTask('regular_checks', higher_prio);

    if (blocked) {
        block();
        return
    }

    let app = get_app_json();
    
    if (app.blocked_until > TIMES()) {
        block();
        return
    } else if (app.freq > app.max_freq) {
        block();
        reset_vars(app);
        return
    } else if (TIMES() - app.last_used > app.reset_time) {
        app.dur = 0;
        app.freq = 0;
    }

    app.freq = app.freq + 1;
    show_ui(app);

    let ai;
    do {
        app.last_used = TIMES();

        performTask('Notification.create', higher_prio,
                    `${app.name}|${time_left_string(app.dur, app.max_dur)}|mw_image_timer|2`);
        
        ai = get_current_app();

        app.dur = app.dur + (TIMES - last_used);
        if (dur > max_dur) {
            block();
            reset_vars(app);
            break
        }
        await sleep(500);
    } while (ai.package in [app.package, 'com.android.systemui', 'net.dinglisch.android.taskerm'])
    performTask('Notification.cancel', higher_prio, app.name);

}


function reset_vars(app) {

    app.dur = 0;
    app.freq = 0;
    app.blocked_until = TIMES() + app.reset_time;

    setGlobal(app.package_var, JSON.stringify(app_json, null, 2));
}
function block(app) {
    // goHome(0);
    show_ui(app);

    performTask('Notification.snooze');
}

function show_ui(app) {
    destroyScene('App_blocker_ui');
    createScene('App_blocker_ui');
    
    time_left_string(app.dur, app.max_dur);

    if (Disengaged_until() > TIMES()) {

    }
}

function get_app_json() {
    /* vars_str is a JSON string containing 
       app information */

    let ai = get_current_app();

    let package_var = aipackage.replace(/\./g, '_');
    package_var = package_var.charAt(0).toUpperCase() + package_var.slice(1);

    let app_json_str = global(package_var);
    let app_json;
    if (app_json_str) {
        app_json = JSON.parse(app_json_str);
    } else {
        app_json = {
            max_dur: 600,
            reset_time: 3600,
            max_freq: 10,

            name: ai.app,
            package: ai.package,
            package_var: package_var,
            dur: 0,
            freq: 0,
            last_used: 0,
            blocked_until: 0,
        }
        setGlobal(package_var, JSON.stringify(app_json, null, 2));
    }
    return app_json
}




/* ######################################################################### */
/* ################################ helpers ################################ */
/* ######################################################################### */
//
function get_current_app() {
    launch_task('AutoInput UI Query', higher_prio);
    let ai = JSON.parse(global('Return_AutoInput_UI_Query'));
    return ai
}

async function launch_task(task_name) {
    logger('launching: ' + task_name)
    
    performTask(task_name);
    while (global('TRUN').includes(task_name)) {await sleep(100)}

    logger('finishing: ' + task_name)
}

function time_left_string(curr_time, future_time) {

    let pad = (n, padding) => {
        n = String(n);
        return n.length >= padding ? n : new Array(padding - n.length + 1).join('0') + n;
    }

    let time_left_min = Math.floor((future_time - curr_time) / 60);
    let time_left_sec = (future_time - curr_time) % 60;

    time_left_min = pad(String(time_left_min), 2)
    time_left_sec = pad(String(time_left_sec), 2)

    let time_left = `${time_left_min}:${time_left_sec}`

    return time_left
}


function create_logger(path) {

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
//#region
// function create_logger(path) {
//     Date.prototype.getFullHours = function () {
//         if (this.getHours() < 10) {return '0' + this.getHours()}
//         return this.getHours();
//     };
//     Date.prototype.getFullMinutes = function () {
//         if (this.getMinutes() < 10) {return '0' + this.getMinutes()}
//         return this.getMinutes();
//     };
//     Date.prototype.getFullSeconds = function () {
//         if (this.getSeconds() < 10) {return '0' + this.getSeconds()}
//         return this.getSeconds();
//     };
//     Date.prototype.getFullMilliseconds = function () {
//         if (this.getMilliseconds() < 10) {return '00' + this.getMilliseconds()}
//         else if (this.getMilliseconds() < 100) {return '0' + this.getMilliseconds()}
//         return this.getMilliseconds();
//     };
//     return function(msg) {
//         var date = new Date(); 
//         let time = date.getFullHours() + ":" 
//                  + date.getFullMinutes() + ":" 
//                  + date.getFullSeconds() + ":" 
//                  + date.getFullMilliseconds();
//         writeFile(path, `${time}    ${msg}\n`, true);
//     }
// }
//#endregion