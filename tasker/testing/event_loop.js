function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}
function flash(msg) {console.log(msg)}
function exit(){console.log('exit()')}

function task1(){
    return new Promise(resolve => {
        flash('task1');
        resolve('task1 done');
    });
}
function task2(){
    return new Promise(resolve => {
        flash('task2');
        resolve('task2 done');
    });
}
async function long_task(){
    return new Promise(async function (resolve) {
        flash('beginning long task');
        await sleep(3000);
        flash('finishing long task');
        resolve('long_task done');
    });
}

async function loop(){
    return new Promise(async function (resolve) {
        for (i=0; i<4; i++){
            flash('loop ' + i);
            await sleep(1000);
        }
        resolve('loop done');
    });
}

// var fn = [loop(), long_task(), task1()]
// Promise.all(fn).then((message) => console.log(message));
// flash(fn)

async function event_loop1(){
    // setGlobal('JS_running', 'true')
    let queue_str = 'task1,long_task,loop'
    while (true) {

        // let queue_str = global('JS_queue')
        if (queue_str) {
            // let queue = global('JS_queue').split(',')
            let queue = queue_str.split(',')
            let fn = queue.pop()
            queue_str = queue.toString()
            // setGlobal('JS_queue', queue.toString())
            // flash(fn)
            const ret = eval(fn + '()');
            // await ret
        } else {
            break;
        }
    }
    // setGlobal('JS_running', 'false')
    exit();
}

async function event_loop2(){
    // setGlobal('JS_running', 'true')
    let queue_str = 'task1,long_task,loop'
        
    // let queue_str = global('JS_queue')
    if (queue_str) {
        // let queue = global('JS_queue').split(',')
        // setGlobal('JS_queue', '')
        let queue = queue_str.split(',')
        let fn_list = []
        for (key in queue) {
            
            let fn = queue[key]
            // flash(fn)
            fn_list.push(eval(fn + '()'))
        }
        for (key in fn_list) {
            await fn_list[key]
        }
        // queue_str = queue.toString()
        // flash(fn)
        // await ret
    }
    // setGlobal('JS_running', 'false')
    exit();
}
// flash(fn_name)

async function fn_running(fn_list) {
    Promise.all(fn_list);

    // for (key in fn_list) {
    //     await fn_list[key]
    // }
}
function event_loop3(){
    // setGlobal('JS_running', 'true')
    let queue_str = 'task1,long_task,loop'
        
    // while (true) {
        // let queue_str = global('JS_queue')
        if (queue_str) {
            // let queue = global('JS_queue').split(',')
            // setGlobal('JS_queue', '')
            let queue = queue_str.split(',') // convert string to list
            queue_str = ''
            let fn_list = [] // running fns

            for (key in queue) {
                let fn = queue[key]
                // flash(fn)
                // fn_list.push(eval(fn + '()'))
                eval(fn + '().then((message) => console.log(message));')
            }
            
            // fn_list = [loop(), long_task(), task1()]
            // Promise.all(fn_list).then((message) => console.log(message));
            flash(fn_list)
            // fn_running()
            // queue_str = queue.toString()
            // flash(fn)
            // await ret
        }
    // }
    // setGlobal('JS_running', 'false')
    exit();
}
event_loop3()