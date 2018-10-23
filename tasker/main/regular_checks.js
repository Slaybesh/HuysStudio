function regular_checks() {
    shell('settings put secure enabled_accessibility_services' + global('Accessibility_services'));
    performTask('roundr');
    performTask('remove_persistent_notifications');
    performTask('zooper_disengaged');
    performTask('zooper_reload_location');
}