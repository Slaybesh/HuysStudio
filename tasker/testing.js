if (global('Indoor') == 1) {
	setGlobal('Disengaged', true);
	performTask('Remove Notifications');
    shell('settings put secure accessibility_display_daltonizer_enabled 0', true);
    flash('worked');
    var ok = enableProfile('Wake Up', True);
}