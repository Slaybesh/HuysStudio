// while (true) {
//     flash('test');
//     wait(2000);
// }


function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function loop() {
    while (true) {
        flash('');
        sleep(3000);
    }

}