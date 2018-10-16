function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}
function flash(msg) {console.log(msg)}

function task1(){
    flash('task1')
}
function task2(){
    flash('task2')
}
async function long_task(){
    flash('beginning long task')
    await sleep(2000)
    flash('finishing long task')
}

async function loop(){
    for (i=0; i<4; i++){
        flash('loop ' + i)
        await sleep(3000)
    }
}

function event_loop(fn){
    eval(fn + '()')
}
flash(par1)
event_loop(par1)