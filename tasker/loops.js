function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function loop() {
    while (true) {
        if (global('PACTIVE').includes('Insta')) {
            flash('yess')
        }
        await sleep(100);
    }
    exit()
}
loop()