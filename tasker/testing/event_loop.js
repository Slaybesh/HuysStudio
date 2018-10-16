function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}
// function flash(msg) {console.log(msg)}

function task1(){
    flash('task1');
    exit();
}
function task2(){
    flash('task2');
    exit();
}
async function long_task(){
    flash('beginning long task');
    await sleep(2000);
    flash('finishing long task');
    exit();
}

async function loop(){
    for (i=0; i<4; i++){
        flash('loop ' + i);
        await sleep(3000);
    }
    exit()
}

function event_loop(fn){
    eval(fn + '()');
}
// flash(fn_name)
event_loop(fn_name)