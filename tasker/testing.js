function disengage(){
    if (global('Indoor') == 1) {
        setGlobal('Disengaged', true);
        performTask('Remove Notifications');
        shell('settings put secure accessibility_display_daltonizer_enabled 1', true);
        flash(0);
        var ok = enableProfile('Swag', True);
        flash(1)
    }
}

function engage(){

    setGlobal('Disengaged', false);
    shell('settings put secure accessibility_display_daltonizer_enabled 0', true);
    performTask('Regular Checks');
}

function wake_up(){
    flash(0)
    var start_time = global('TIMES');
    flash(start_time)
    while (global('SCREEN') == 'On'){
        wait(2000)
        flash('waiting')
        if (global('TIMES') > start_time + 6) {
            setGlobal('Disengaged_until', global('TIMES') + 7200)
        }
    }
}
