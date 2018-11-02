function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}


const logger = create_logger('Tasker/log/app_blocker.txt');

const higher_prio = parseInt(priority) + 1;
let TIMES = () => {return parseInt(global('TIMES'))}
let Disengaged_until = () => {return parseInt(global('Disengaged_until'))}
let Disengaged = () => {return parseInt(global('Disengaged'))}
let Pomo_until = () => {return parseInt(global('Pomo_until'))}

var par1;
app_blocker(par1);
async function app_blocker(blocked=false) {
        
    performTask('regular_checks', higher_prio);

    if (blocked) {
        // show_ui(app, blocked);
        exit();
    }

    let app = await get_app_json();
    
    if (app.blocked_until > TIMES()) {
        // show_ui(app);
        exit();
    } else if (app.freq > app.max_freq) {
        // show_ui(app);
        reset_vars(app);
        exit();
    } else if (TIMES() - app.last_used > app.reset_time) {
        app.dur = 0;
        app.freq = 0;
    }

    app.freq = app.freq + 1;
    // show_ui(app);

    let ai;
    do {
        app.last_used = TIMES();

        ai = await get_current_app();
        logger('ai.package: ' + ai.package);
        performTask('Notification.create', higher_prio,
                    `${app.name}|${time_left_string(app.dur, app.max_dur)}|mw_image_timelapse|5`);
        

        await sleep(500);
        app.dur = app.dur + (TIMES() - app.last_used);
        if (app.dur > app.max_dur) {
            // show_ui(app);
            reset_vars(app);
            break
        }
    } while ([app.package, 'com.android.systemui', 'net.dinglisch.android.taskerm'].indexOf(ai.package) != -1);


    setGlobal(app.package_var, JSON.stringify(app, null, 2));
    performTask('Notification.cancel', higher_prio, app.name);
    logger('out of app\n');
    exit();
}

/* ##################################################################################### */
/* ################################ app_blocker helpers ################################ */
/* ##################################################################################### */
//#region
function reset_vars(app) {

    app.dur = 0;
    app.freq = 0;
    app.blocked_until = TIMES() + app.reset_time;
    setGlobal(app.package_var, JSON.stringify(app, null, 2));
    
    performTask('Notification.snooze');
}

function show_ui(app, blocked=false) {
    destroyScene('App_blocker_ui');

    let curr_time = TIMES();
    
    let information = '';
    if (blocked) {
        if (Pomo_until() > curr_time) {
            information = 'Currently in Pomo Session.\nCome back at ' + unix_to_time(Pomo_until());
        } else if (Disengaged_until() > curr_time) {
            information = 'Currently Disengaged.\nCome back at ' + unix_to_time(Disengaged_until());
        } else if (Disengaged()) {
            information = 'Currently Disengaged.\nCome back tomorrow.';
        }
    } else {
        if (app.blocked_until > curr_time) {
            information = 'Currently blocked.\nCome back at ' + unix_to_time(app.blocked_until);
        } else {
            let time_left = time_left_string(app.dur, app.max_dur);
            information = `Time left: ${time_left}\nTimes opened: ${app.freq}`
        }
    }
    
    elemText('App_blocker_ui', 'information', 'repl', information);
    showScene('App_blocker_ui', 'ActivityFullWindow', 0, 0, false, false);
}

function get_app_json() {
    /* vars_str is a JSON string containing 
       app information */

    let ai = await get_current_app();

    let package_var = ai.package.replace(/\./g, '_');
    package_var = package_var.charAt(0).toUpperCase() + package_var.slice(1);

    let app_json_str = global(package_var);
    // logger('app_json_str' + app_json_str);
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
//#endregion

/* ######################################################################### */
/* ################################ helpers ################################ */
/* ######################################################################### */
//#region
async function get_current_app() {
    await launch_task('AutoInput UI Query');
    // logger(global('Return_AutoInput_UI_Query'))
    let ai = JSON.parse(global('Return_AutoInput_UI_Query'));
    return ai
}

async function launch_task(task_name) {
    logger('launching: ' + task_name)
    
    performTask(task_name, higher_prio);
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

function unix_to_time(unix_ts) {
    let date = new Date(unix_ts * 1000);
    let hour = '0' + date.getHours();
    let min = '0' + date.getMinutes();
    let time = hour.substr(-2) + ':' + min.substr(-2);
    return time
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
//#endregion
