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