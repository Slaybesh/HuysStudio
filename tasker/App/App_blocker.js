function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}


async function app_blocker() {
    
    /* initialize vars */
    let higher_prio = parseInt(priority) + 1;
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
        performTask('App.ui', higher_prio);

        let aipackage;
        let aiapp;
        
        do {
            app.last_used = parseInt(global('TIMES'));
            performTask('Notification.create', higher_prio, `Timer|${i}|mw_image_timer|2`);
            
            let ai = get_auto_input();
            let aipackage = ai.aipackage;
            let aiapp = ai.aiapp;

            app.dur = app.dur + (TIMES - last_used);
            if (dur > max_dur) {
                close();
                return
            }
            await sleep(500);
        } while (aipackage in [package, 'com.android.systemui', 'net.dinglisch.android.taskerm'])

    }
}

async function close() {
    performTask('Notification.cancel', higher_prio, name);
}



function get_app() {
    /* vars_str is a JSON string containing 
       app information */
    let vars = JSON.parse(vars_str);

    let ai = get_auto_input();
    let aipackage = ai.aipackage;
    let aiapp = ai.aiapp;

    let package_var = aipackage.replace(/\./g, '_');
    package_var = package_var.charAt(0).toUpperCase() + package_var.slice(1);

    let app_info_str = global(package_var);
    // let app_info_str;
    if (!app_info_str) {
        app_info_str = {
            max_dur: vars.max_dur,
            reset_time: vars.reset_time,
            max_freq: vars.max_freq,
            ignore_disengaged: vars.ignore_disengaged,

            name: aiapp,
            package: aipackage,
            dur: 0,
            freq: 0,
            last_used: 0,
            blocked_until: 0,
        }
        let json_str = JSON.stringify(dict);
        setGlobal(package_var, json_str);

    return app_info_str
    }
}

function get_auto_input() {
    performTask('Autoinput_ui_query', higher_prio);
    let Autoinput_ui_query = JSON.parse(global('Autoinput_ui_query'));
    // let aipackage = Autoinput_ui_query.aipackage;
    // let aiapp = Autoinput_ui_query.aiapp;
    return Autoinput_ui_query
}

function pad(n, padding) {
    n = String(n);
    return n.length >= padding ? n : new Array(padding - n.length + 1).join('0') + n;
};
