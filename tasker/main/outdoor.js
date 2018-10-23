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
outdoor()