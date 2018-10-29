function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

function create_logger(path) {
    Date.prototype.getFullHours = function () {
        if (this.getHours() < 10) {
            return '0' + this.getHours();
        }
        return this.getHours();
    };
    Date.prototype.getFullMinutes = function () {
        if (this.getMinutes() < 10) {
            return '0' + this.getMinutes();
        }
        return this.getMinutes();
    };
    Date.prototype.getFullSeconds = function () {
        if (this.getSeconds() < 10) {
            return '0' + this.getSeconds();
        }
        return this.getSeconds();
    };
    Date.prototype.getFullMilliseconds = function () {
        if (this.getMilliseconds() < 10) {
            return '00' + this.getMilliseconds();
        } else if (this.getMilliseconds() < 100) {
            return '0' + this.getMilliseconds();
        }
        return this.getMilliseconds();
    };
    return function(msg) {
        var date = new Date(); 
        let time = date.getFullHours() + ":" 
                 + date.getFullMinutes() + ":" 
                 + date.getFullSeconds() + ":" 
                 + date.getFullMilliseconds();
        writeFile(path, `${time}    ${msg}\n`, true);
    }
}

logger = create_logger('Tasker/log/app_blocker.txt');

let higher_prio = parseInt(priority) + 1;
async function app_blocker() {
    
    /* initialize vars */
    let TIMES = parseInt(global('TIMES'));
    let Disengaged_until = parseInt(global('Disengaged_until'));
    // let Disengaged = (global('Disengaged') === 'true');
    let Disengaged = parseInt(global('Disengaged'));
    let Pomo = parseInt(global('Pomo'));
    
    performTask('regular_checks', higher_prio);

    if (Disengaged || Pomo) {
        // performTask('App.close', higher_prio);
        close();
        return

    } else {
        let app = get_app();
        
        if (app.blocked_until > TIMES) {
            close();
            return
        } else if (app.freq > app.max_freq) {
            close();
            return
        } else if (TIMES - app.last_used > app.reset_time) {
            app.dur = 0;
            app.freq = 0;
        }

        app.freq = app.freq + 1;
        ui()

        let ai;
        do {
            app.last_used = parseInt(global('TIMES'));
            performTask('Notification.create', higher_prio, `Timer|${i}|mw_image_timer|2`);
            
            ai = get_auto_input();

            app.dur = app.dur + (TIMES - last_used);
            if (dur > max_dur) {
                close();
                return
            }
            await sleep(500);
        } while (ai.package in [app.package, 'com.android.systemui', 'net.dinglisch.android.taskerm'])

    }
}


function close(app, reset) {
    // goHome(0);
    ui();
    performTask('Notification.cancel', higher_prio, name);

    let TIMES = parseInt(global('TIMES'));

    if (reset) {
        app.dur = 0;
        app.freq = 0;
        app.blocked_until = TIMES + app.reset_time;
    }
    setGlobal(package_var, JSON.stringify(app_json, null, 2));

    performTask('Notification.snooze');
    performTask('Regular Checks');
}

function ui(app) {

}

function get_app() {
    /* vars_str is a JSON string containing 
       app information */

    let ai = get_auto_input();

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
function get_auto_input() {
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

function pad(n, padding) {
    n = String(n);
    return n.length >= padding ? n : new Array(padding - n.length + 1).join('0') + n;
};
