function disengage() {
    if (global('Indoor') == 1) {
        setGlobal('Disengaged', true);
        performTask('Remove Notifications');
        shell('settings put secure accessibility_display_daltonizer_enabled 1', true);
        enableProfile('WakeUp', true);
        // setWifi(false);
        // mobileData(false);
    }
}
disengage()

function engage() {
    setGlobal('Disengaged', false);
    enableProfile('Engage', false);
    shell('settings put secure accessibility_display_daltonizer_enabled 0', true);
    performTask('regular_checks')
    // setWifi(true);
    // mobileData(true);
}
engage()
