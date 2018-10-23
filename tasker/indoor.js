function indoor() {
    setGlobal('Indoor', 1);
    setGlobal('Outdoor', 0);

    if (parseInt(global('Car'))) {
        performTask('stop_blitzer');
    }
    performTask('regular_checks');
}


async function outdoor() {
    await sleep(300);
    let WIFI = global('WIFI');
    let WIFII = global('WIFII');
    if (WIFII.includes('SCAN') && WIFII.includes('kthome') && WIFI == 'on') {
        callVol(4, false, false);
        setGlobal('Indoor', 0);
        setGlobal('Outdoor', 1);
        if (parseInt(global('Disengaged'))) {
            performTask('engage')
        }
    }
}

function regular_checks() {
    shell('settings put secure enabled_accessibility_services' + global('Accessibility_services'));
    performTask('roundr');
    performTask('remove_persistent_notifications');
    performTask('zooper_disengaged');
    performTask('zooper_reload_location');



}