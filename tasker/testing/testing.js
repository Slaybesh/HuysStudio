// while (true) {
//     flash('test');
//     wait(2000);
// }


function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function async_loop() {
    let start_time = parseInt(global('TIMES'));
    while (true) {
        let new_time = parseInt(global('TIMES'));
        flash(new_time - start_time);
        await sleep(3000);
    }
}
// loop();

function test1(){
    setTimeout(function(){console.log(2)}, 1000)
}

async function test2(){
    await test1()
    console.log(3)
}

test2()
// test1()

