function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function timer () {
    let i = 0;
    while (i < 10) {
    
        performTask('create_notification', 5,
                    `Timer|${i}|mw_image_timer|3`);
        i++;
        await sleep(2000);
    }
    exit();
}
timer();