function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function loop() {
    for (i = 0; i < 6; i++) {
        if (global('PACTIVE').includes('Insta')) {
            flash('yess')
        }
        await sleep(2000);
    }
}