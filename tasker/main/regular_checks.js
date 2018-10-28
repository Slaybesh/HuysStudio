function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

function regular_checks() {
    shell('settings put secure enabled_accessibility_services' + global('Accessibility_services'));
    roundr();
    performTask('Remove Persistent');
    performTask('Zooper Disengaged');
    performTask('Zooper Reload Location');
    remove_persistent()
}

async function remove_persistent() {
    let persistent_apps = JSON.parse(global(Apps_persistent));
    for (i in persistent_apps) {
        performTask('Notification.snooze', parseInt(priority) + 1, persistent_apps[i], 10000000000000);
    }
}
async function roundr() {
    let id_roundr = shell("echo proc/$(pidof mohammad.adib.roundr) | cut -f 2 -d '/'", true);
    // flash(id_roundr);
    // flash(!id_roundr.match(/[0-9]+/));
    if (!id_roundr.match(/[0-9]+/)) {
        loadApp('Roundr', '', true);
        performTask('Remove Persistent');
        await sleep(100);
        button('back');
    }
}

regular_checks()