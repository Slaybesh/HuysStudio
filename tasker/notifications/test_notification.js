function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function timer () {
    let i = 0;
    let new_priority = parseInt(priority) + 1;
    while (i < 10) {
        
        performTask('create_notification', new_priority, `Timer|${i}|mw_image_timer|2`);
        i++;
        // flash(i);
        await sleep(1000);
    }
    exit();
}

timer()

async function create() {
    // var text;
    let new_priority = parseInt(priority) + 1;
    flash(new_priority);
    performTask('create_notification', new_priority, `Timer0|0|mw_image_timer|3`);
    await sleep(1000);
    performTask('create_notification', new_priority, `Timer1|1|mw_image_timer|3`);
    await sleep(1000);
    performTask('create_notification', new_priority, `Timer2|2|mw_image_timer|3`);
    exit();
}

async function launch_task(task_name, priority=5, par1='', par2='') {
    //if (debugging) {flash('Starting: ' + task_name)}
    
    performTask(task_name, priority, par1, par2);
    while (global('TRUN').includes(task_name)) {await sleep(100)}

    //if (debugging) {flash('Finished: ' + task_name)}
}

// function performTask(task_name, priority, par1, par2) {
//     console.log(par1)
// }
// function exit() {
//     console.log('exit()')
// }
