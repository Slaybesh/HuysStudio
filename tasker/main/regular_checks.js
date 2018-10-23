function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

function regular_checks() {
    shell('settings put secure enabled_accessibility_services' + global('Accessibility_services'));
    roundr();
    performTask('remove_persistent_notifications');
    performTask('zooper_disengaged');
    performTask('zooper_reload_location');
}

async function roundr() {
    let id_roundr = shell('echo proc/$(pidof mohammad.adib.roundr) | cut -f 2 -d "/"');
    if (!id_roundr.match(/[0-9]+/)) {
        loadApp('Roundr', '', true);
        performTask('Remove Persistent');
        await sleep(100);
        button('back');
    }
}

regular_checks()