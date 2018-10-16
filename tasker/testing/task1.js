function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}
function flash(msg) {console.log(msg)
}
async function loop() {
    // performTask('JS Task2');
    // let start_time = parseInt(global('TIMES'));
    while (true) {
        // let new_time = parseInt(global('TIMES'));
        flash('wait');
        await sleep(3000);
    }
}
loop();
