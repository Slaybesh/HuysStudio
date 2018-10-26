function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function app_closer() {
    performTask('Notification.cancel', higher_prio, name);
}