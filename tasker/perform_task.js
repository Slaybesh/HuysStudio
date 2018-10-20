function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function tasker(task_name) {
    flash('Starting: ' + task_name);
    performTask(task_name);
    while (global('TRUN').includes(task_name)) {
        await sleep(100);
    }
    flash('Finished: ' + task_name);
}

tasker(some_task)