function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function timer () {
    let i = 0;
    while (i < 10) {
        
        performTask('create_notification', 5, `Timer|${i}|mw_image_timer|3`);
        i++;
        // flash(i);
        await sleep(1000);
    }
    exit();
}

create()

async function create() {
    // var text;
    launch_task('create_notification', 5, `Timer|0|mw_image_timer|3`);
    await sleep(1000)
    launch_task('create_notification', 5, `Timer|1|mw_image_timer|3`);
    await sleep(1000)
    launch_task('create_notification', 5, `Timer|2|mw_image_timer|3`);
    exit();
}

async function launch_task(task_name, priority=5, par1='', par2='') {
    // if (debugging) {flash('Starting: ' + task_name)}
    
    performTask(task_name, priority, par1, par2);
    while (global('TRUN').includes(task_name)) {await sleep(100)}

    // if (debugging) {flash('Finished: ' + task_name)}
}

// function performTask(task_name, priority, par1, par2) {
//     console.log(par1)
// }
// function exit() {
//     console.log('exit()')
// }