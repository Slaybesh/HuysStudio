// while (true) {
//     flash('test');
//     wait(2000);
// }


function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function loop() {
    let start_time = parseInt(global('TIMES'));
    while (true) {
        let new_time = parseInt(global('TIMES'));
        flash(new_time - start_time);
        await sleep(3000);
    }
}
loop();
