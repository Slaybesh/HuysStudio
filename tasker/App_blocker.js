function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}


const logger = create_logger('Tasker/log/app_blocker.txt');

let glob = {
    higher_prio: parseInt(priority) + 1,
    get TIMES() {return parseInt(global('TIMES'))},
    get Disengaged() {return parseInt(global('Disengaged'))},
    get Disengaged_until() {return parseInt(global('Disengaged_until'))},
    get Pomo_until() {return parseInt(global('Pomo_until'))}
}


async function app_blocker(blocked=false) {

    let t0 = performance.now();
    performTask('regular_checks', glob.higher_prio);

    let ui = new UI(blocked);

    if (blocked) {
        ui.load(app);
        exit();
    }

    let app = await get_app_json();
    
    if (app.blocked_until > glob.TIMES) {
        ui.load(app);
        // logger('blocked');
        exit();
    } else if (app.freq > app.max_freq) {
        ui.load(app);
        // logger('max freq');
        reset_vars(app);
        exit();
    } else if (glob.TIMES - app.last_used > app.reset_time) {
        app.dur = 0;
        app.freq = 0;
    }

    app.freq = app.freq + 1;
    ui.load(app)

    let ai;

    logger('start part: ' + elapsed(t0));
    do {

        app.last_used = glob.TIMES;

        // logger('ai.package: ' + ai.package);
        performTask('Notification.create', glob.higher_prio,
                    `${app.name}|${time_left_string(app.dur, app.max_dur)}|mw_image_timelapse|5`);
        
        // await sleep(500);
        ai = await get_current_app();
        setGlobal(app.package_var, JSON.stringify(app, null, 2));

        if (app.dur > app.max_dur) {
            ui.load(app)
            reset_vars(app);
            break
        }


        if ([app.package, 'com.android.systemui'].indexOf(ai.package) != -1) {
            /* only add to duration if in app or system ui */
            app.dur = app.dur + (glob.TIMES - app.last_used);
        }

    } while ([app.package, 'com.android.systemui', 'net.dinglisch.android.taskerm'].includes(ai.package) && 
             global('TRUN').includes('App Blocker'));
    
    
    performTask('Notification.cancel', glob.higher_prio, app.name);
    setGlobal(app.package_var, JSON.stringify(app, null, 2));
    logger('out of app');
    exit();
}

/* ##################################################################################### */
/* ################################ app_blocker helpers ################################ */
/* ##################################################################################### */
//#region
async function get_app_json() {
    /* vars_str is a JSON string containing 
       app information */

    let t0 = performance.now();

    // let ai = await get_current_app();
    // let ai = JSON.parse(global('Return_AutoInput_UI_Query'));

    logger('var aipackage = ' + aipackage)
    let package_var = aipackage.replace(/\./g, '_');
    // let package_var = ai.package.replace(/\./g, '_');
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
    logger('get_app_json: ' + elapsed(t0));
    logger('app_json_str: ' + app_json_str);
    return app_json
}

async function get_current_app() {
    let t0 = performance.now();
    await launch_task('AutoInput UI Query');
    // logger(global('Return_AutoInput_UI_Query'))
    let ai = JSON.parse(global('Return_AutoInput_UI_Query'));
    logger('get_current_app: ' + elapsed(t0));
    return ai
}

function reset_vars(app) {

    app.dur = 0;
    app.freq = 0;
    app.blocked_until = glob.TIMES + app.reset_time;
    setGlobal(app.package_var, JSON.stringify(app, null, 2));
    
    performTask('Notification.snooze');
}
//#endregion


/* #################################################################### */
/* ################################ UI ################################ */
/* #################################################################### */
//#region
class UI {
    constructor(blocked=false) {
        
        this.blocked = blocked;
        this.ui = blocked ? 'app_blocked' : 'app';

        logger(`ui: ${this.ui}`)
        // destroyScene(this.ui)
        // createScene(this.ui)
        elemVisibility(this.ui, 'Dismiss', true, 300)
        // showScene(this.ui, 'ActivityFullWindow', 0, 0, false, false)
    }

    load(app) {
        let curr_time = glob.TIMES;
        let Pomo_until = glob.Pomo_until;
        let Disengaged_until = glob.Disengaged_until;
        let Disengaged = glob.Disengaged;
        
        let information = '';
        let difficulty;
        if (this.blocked) {
            if (Pomo_until > curr_time) {
                information = 'Currently in Pomo Session.\nCome back at ' + unix_to_time(Pomo_until);
            } else if (Disengaged_until > curr_time) {
                information = 'Currently Disengaged.\nCome back at ' + unix_to_time(Disengaged_until);
            } else if (Disengaged) {
                information = 'Currently Disengaged.\nCome back tomorrow.';
            }
            difficulty = 1;
        } else {
            if (app.blocked_until > curr_time) {
                information = 'Currently blocked.\nCome back at ' + unix_to_time(app.blocked_until);
                difficulty = 1;
            } else {
                let time_left = time_left_string(app.dur, app.max_dur);
                information = `Time left: ${time_left}\n\nTimes opened: ${app.freq}/${app.max_freq}`
                difficulty = 0;
            }
        }

        logger('set information')
        elemText(this.ui, 'information', 'repl', information)
        logger('show scene')
        logger('create math question')
        this.createMathExercise(difficulty)
    }

    createMathExercise(difficulty) {
        let randint = (min, max) => {return Math.floor(Math.random() * (max - min + 1)) + min}

        let round_up = (rounding_num, round_to) => {
            return rounding_num % round_to == 0 ? rounding_num : rounding_num + round_to - rounding_num % round_to
        }

        let range;
        let small_range;
        let big_range;
        switch(difficulty) {
            case 0:
                small_range = [3, 9];
                big_range = [20, 100];
                break;
            case 1:
                small_range = [9, 20];
                big_range = [100, 4000];
                break;
        }

        let operations = ['*', '+', '-', '/']
        let operator = operations[randint(0, operations.length - 1)]

        let small_num1 = randint(small_range[0], small_range[1]);
        let small_num2 = randint(small_range[0], small_range[1]);
        let big_num1 = randint(big_range[0], big_range[1]);
        let big_num2 = randint(big_range[0], big_range[1]);

        let result;
        let question;
        switch(operator) {
            case '+':
                result = big_num1 + big_num2;
                question = `${big_num1} + ${big_num2}  = `
                break;
                
            case '-':
                result = big_num1 - big_num2;
                question = `${big_num1} - ${big_num2}  = `
                break;
                
            case '*':
                result = small_num1 * small_num2;
                question = `${small_num1} * ${small_num2}  = `
                break;
                
            case '/':
                let bigger_num = small_num1 * small_num2;
                result = small_num1;
                question = `${bigger_num} / ${small_num2}  = `
            
            // case '-/':
            //     result = (max_large - min_large) / randint(2, 4);
            //     break;
            
            // default:
            //     result = big_num1 + big_num2;
            //     question = `${big_num1} + ${big_num2}  =`
        }

        logger(`${operator}, ${small_num1}, ${small_num2}, ${big_num1}, ${big_num2}`)
        logger(`question: ${question} result: ${result}`)
        elemText(this.ui, 'Math Question', 'repl', question);
        elemText(this.ui, 'Math Result', 'repl', result);

    }
}
//#endregion


/* ######################################################################### */
/* ################################ helpers ################################ */
/* ######################################################################### */
//#region
async function launch_task(task_name) {
    // logger('launching: ' + task_name)

    performTask(task_name, glob.higher_prio);
    while (global('TRUN').includes(task_name)) {
        await sleep(100)
    }

    // logger('finishing: ' + task_name)
}

function elapsed(start_time) {return String(parseInt(performance.now() - start_time) / 1000) + ' sec'}

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

function create_logger(path, debugging=true) {
    writeFile(path, '', false);
    return function(msg) {
        if (debugging) {
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
}
//#endregion

var aipackage;
var par1;
app_blocker(par1);
