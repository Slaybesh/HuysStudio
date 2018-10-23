function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

function get_vars(vars_str) {
    let vars = JSON.parse(vars_str);
    // let auto_input = performTask('get_current_package');
    // let aipackage = auto_input.package;
    // let aiapp = auto_input.app;
    let aipackage = 'asdf.asdfasdf.com';
    let aiapp = 'asdf';

    let package = aipackage.replace(/\./g, '_');
    let package = package.charAt(0).toUpperCase() + package.slice(1);

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
console.log(get_vars)

function app_start() {

}

async function app_blocker() {
    performTask('regular_checks');

    /* initialize vars */

    let TIMES = parseInt(global('TIMES'));
    let Disengaged_until = parseInt(global('Disengaged_until'));
    let Disengaged = (global('Disengaged') === 'true');
    let ignore_disengaged = (ignore_disengaged === 'false');

    if (blocked_until > TIMES || Disengaged && !ignore_disengaged) {

    }
}