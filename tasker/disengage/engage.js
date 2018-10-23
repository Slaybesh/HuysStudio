function engage() {
    setGlobal('Disengaged', false);
    enableProfile('Engage', false);
    shell('settings put secure accessibility_display_daltonizer_enabled 0', true);
    performTask('regular_checks');
    // setWifi(true);
    // mobileData(true);
}
engage()