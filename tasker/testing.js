// while (true) {
//     flash('test');
//     wait(2000);
// }


function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function loop() {
    for (i = 0; i < 6; i++) {
        flash('test');
        sleep(2000);
    }

}