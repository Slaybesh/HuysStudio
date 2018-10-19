const { performance } = require('perf_hooks');

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
        for (i=0; i<3; i++){
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

function MakeQuerablePromise(promise) {
    // Don't modify any promise that has been already modified.
    if (promise.isPending) return promise;

    // Set initial state
    let isPending = true;
    let isFulfilled = false;
    let isRejected = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    let result = promise.then(
        function(v) {
            isPending = false;
            isFulfilled = true;
            return v; 
        }, 
        function(e) {
            isPending = false;
            isRejected = true;
            throw e; 
        }
    );

    result.isPending = function() { return isPending; };
    result.isFulfilled = function() { return isFulfilled; };
    result.isRejected = function() { return isRejected; };
    return result;
}


function is_pending(promise) {
    // Don't modify any promise that has been already modified.
    if (promise.isResolved) return promise;

    // Set initial state
    let isPending = true;

    // Observe the promise, saving the fulfillment in a closure scope.
    let result = promise.then(
        function(v) {
            isPending = false;
            return v; 
        }, 
        function(e) {
            isPending = false;
            throw e; 
        }
    );

    result.isPending = function() { return isPending; };
    return result;
}

async function event_loop3(){
    // setGlobal('JS_running', 'true')
    // let queue_str = 'task1,long_task,loop';
    let queue_str = 'loop';
    let promise_list = []; // running fns
        
    while (true) {
        // let queue_str = global('JS_queue')
        if (queue_str) {
            // let queue = global('JS_queue').split(',')
            // setGlobal('JS_queue', '')
            let queue = queue_str.split(','); // convert string to list
            queue_str = '';

            for (i in queue) {
                let fn = queue[i];

                console.log('launching ' + fn)
                let promise = eval(fn + '()');
                promise_list.push([fn, promise]);
                // console.log('promise_list ' + promise_list)

            }
            
        } else {
            let should_break = true;
            let promise;
            let pending;
            for (i in promise_list) {
                promise = is_pending(promise_list[i][1]);
                pending = promise.isPending();
                console.log('function: ' + promise_list[i][0], pending)
                if (pending) {should_break = false}
            }
            
            if (should_break) {break}
        }
        await sleep(200);
    }
    // setGlobal('JS_running', 'false')
    exit();
}


async function promise_test() {
    let promise = loop();
    
    promise = is_pending(promise);

    let t0 = performance.now();
    while (true){
        let pending = promise.isPending();
        // console.log(pending)
        
        if (!pending) {
            console.log('breaking');
            // console.log(promise.isResolved);
            console.log(promise);
            console.log('time taken: ' + (performance.now() - t0));
            break;
        }
        await sleep(200)
    }
}


event_loop3()
