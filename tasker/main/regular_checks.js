function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function regular_checks() {
    writeFile('Tasker/log/regular_checks.txt', 'start regular_checks\n', true)
    shell('settings put secure enabled_accessibility_services' + global('Accessibility_services'));
    roundr();
    remove_persistent();
    // performTask('Remove Persistent');
    performTask('Zooper Disengaged');
    performTask('Zooper Reload Location');
    writeFile('Tasker/log/regular_checks.txt', 'end regular_checks\n', true)
}

async function remove_persistent() {
    writeFile('Tasker/log/regular_checks.txt', 'start remove_persistent\n', true)
    let persistent_apps = JSON.parse(global(Apps_persistent));
    for (i in persistent_apps) {
        performTask('Notification.snooze', parseInt(priority) + 1, persistent_apps[i], 10000000000000);
    }
    writeFile('Tasker/log/regular_checks.txt', 'end remove_persistent\n', true)
}
async function roundr() {
    writeFile('Tasker/log/regular_checks.txt', 'start roundr\n', true)
    let id_roundr = shell("echo proc/$(pidof mohammad.adib.roundr) | cut -f 2 -d '/'", true);
    // flash(id_roundr);
    if (!id_roundr.match(/[0-9]+/)) {
        loadApp('Roundr', '', true);
        await sleep(100);
        button('back');
    }
    writeFile('Tasker/log/regular_checks.txt', 'end roundr\n', true)
}

regular_checks().then(() => exit());