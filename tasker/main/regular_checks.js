function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}


function create_logger(path) {
    Date.prototype.getFullHours = function () {
        if (this.getHours() < 10) {
            return '0' + this.getHours();
        }
        return this.getHours();
    };
    Date.prototype.getFullMinutes = function () {
        if (this.getMinutes() < 10) {
            return '0' + this.getMinutes();
        }
        return this.getMinutes();
    };
    Date.prototype.getFullSeconds = function () {
        if (this.getSeconds() < 10) {
            return '0' + this.getSeconds();
        }
        return this.getSeconds();
    };
    Date.prototype.getFullMilliseconds = function () {
        if (this.getMilliseconds() < 10) {
            return '00' + this.getMilliseconds();
        } else if (this.getMilliseconds() < 100) {
            return '0' + this.getMilliseconds();
        }
        return this.getMilliseconds();
    };
    return function(msg) {
        var date = new Date(); 
        let time = date.getFullHours() + ":" 
                 + date.getFullMinutes() + ":" 
                 + date.getFullSeconds() + ":" 
                 + date.getFullMilliseconds();
        writeFile(path, `${time}    ${msg}\n`, true);
    }
}

logger = create_logger('Tasker/log/regular_checks.txt');

async function regular_checks() {
    // writeFile('Tasker/log/regular_checks.txt', 'start regular_checks\n', true)
    logger('start regular_checks')
    shell('settings put secure enabled_accessibility_services' + global('Accessibility_services'));
    await roundr();
    await remove_persistent();
    performTask('Zooper Disengaged');
    performTask('Zooper Reload Location');
    logger('end regular_checks')
    // writeFile('Tasker/log/regular_checks.txt', 'end regular_checks\n', true)
}

async function remove_persistent() {
    logger('start remove_persistent')
    // writeFile('Tasker/log/regular_checks.txt', 'start remove_persistent\n', true)
    let persistent_apps = JSON.parse(global('Apps_persistent'));
    // writeFile('Tasker/log/regular_checks.txt', persistent_apps + '\n', true)
    for (i in persistent_apps) {
        performTask('Notification.snooze', parseInt(priority) + 1, persistent_apps[i], 10000000000000);
    }
    logger('end remove_persistent')
    // writeFile('Tasker/log/regular_checks.txt', 'end remove_persistent\n', true)
}
async function roundr() {
    logger('start roundr')
    // writeFile('Tasker/log/regular_checks.txt', 'start roundr\n', true)
    let id_roundr = shell("echo proc/$(pidof mohammad.adib.roundr) | cut -f 2 -d '/'", true);
    // flash(id_roundr);
    if (!id_roundr.match(/[0-9]+/)) {
        loadApp('Roundr', '', true);
        await sleep(100);
        button('back');
    }
    logger('end roundr')
    // writeFile('Tasker/log/regular_checks.txt', 'end roundr\n', true)
}

regular_checks().then(() => {
    logger('\n')
    // writeFile('Tasker/log/regular_checks.txt', '\n', true);
    exit();
});