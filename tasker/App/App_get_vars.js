let higher_prio = parseInt(priority) + 1;


function get_auto_input() {
    performTask('Autoinput_ui_query', higher_prio);
    let Autoinput_ui_query = JSON.parse(global('Autoinput_ui_query'));
    let aipackage = Autoinput_ui_query.aipackage;
    let aiapp = Autoinput_ui_query.aiapp;
    return aipackage, aiapp
}
function get_vars(vars_str) {
    /* vars_str is a JSON string containing 
       app information */
    let vars = JSON.parse(vars_str);

    aipackage, aiapp = get_auto_input()

    let package_var = aipackage.replace(/\./g, '_');
    package_var = package_var.charAt(0).toUpperCase() + package_var.slice(1);

    // let app_info_str = global(package);
    let app_info_str;
    if (app_info_str) {
        let app_info = JSON.parse(app_info_str);
        app_info.max_dur = vars.max_dur;
        app_info.reset_time = vars.reset_time;
        app_info.max_freq = vars.max_freq;
        app_info.ignore_disengaged = vars.ignore_disengaged
        return app_info
    } else {
        let dict = {
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
        return json_str
    }
}
get_vars(par1);