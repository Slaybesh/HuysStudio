function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function timer () {
    let i = 0;
    while (i < 10) {
    
        launch_task('create_notification', 5,
                    `Timer|${i}|mw_image_timer|3`);
        i++;
        await sleep(1000);
    }
    exit();
}
timer()

async function launch_task(task_name, priority=5, par1='', par2='') {
    // if (debugging) {flash('Starting: ' + task_name)}
    
    performTask(task_name, priority, par1, par2);
    while (global('TRUN').includes(task_name)) {await sleep(100)}

    // if (debugging) {flash('Finished: ' + task_name)}
}

// function performTask(task_name, priority, par1, par2) {
//     console.log(task_name, priority, par1, par2)
// }