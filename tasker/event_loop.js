function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

// const { performance } = require('perf_hooks');
// let test_queue = 'example_task,example_async_loop'
// function flash(msg) {console.log(msg)}
// function exit(){console.log('exit()')}
// function global(a1){return test_queue}
// function setGlobal(a1,a2){if (a1 == 'JS_queue') {test_queue = ''}}
// function writeFile(a1,a2,a3){return true;}


//#region functions
function example_task(){
    return new Promise(resolve => {
        flash('example_task');
        resolve('example_task done');
    });
}

async function example_async_loop(){
    return new Promise(async function (resolve) {
        let t0 = performance.now()
        while (true){
            
            let elapsed = parseInt(performance.now() - t0) / 1000;
            flash('while loop: ' + elapsed);
            await sleep(3000);
            if (elapsed > 3) {
                flash('elapsed time: ' + elapsed)
                break
            }

        }
        resolve('while loop done');
    });
}
//#endregion functions


async function event_loop(){
    setGlobal('JS_running', 'true')
    let debugging = (global('Debugging') === 'true');
    debugging = true;
    
    // if (debugging) {flash()}
    let promise_list = []; // running fns
    let once = true;
        
    while (true) {
        let queue_str = global('JS_queue');
        setGlobal('JS_queue', '');
        
        if (queue_str) {
            let queue = queue_str.split(',');

            if (debugging) {flash('Queue String: ' + queue_str + '\nQueue length: ' + queue.length)}

            promise_list = launch_functions(queue, promise_list);
            
        } else { 
            // if (debugging) {flash(promise_list)}
            let should_break = check_running(promise_list);
            if (should_break) {break}
        }
        await sleep(200);
    }
    setGlobal('JS_running', 'false');
    if (debugging) {flash('Exiting Event Loop.')}
    exit();
}


//#region helpers
function launch_functions(queue, promise_list) {
    for (i in queue) {
        let fn = queue[i];

        // console.log('launching ' + fn)
        try {
            let promise = eval(fn + '()');

            promise = extendPromise(promise);
            promise_list.push(promise);

        } catch(error) {
            writeFile('Tasker/log/launch_functions_error.txt', error + '\n')
        }
    }
    return promise_list
}

function extendPromise(promise) {
    if (promise.isPending) return promise;

    let isPending = true;

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

function check_running(promise_list) {
    let should_break = true;
    for (i in promise_list) {
        let promise = promise_list[i];
        let pending = promise.isPending();
        // console.log('function: ' + promise_list[i][0], pending);
        if (pending) {should_break = false}
    }
    return should_break
}
//#endregion helpers


event_loop()
