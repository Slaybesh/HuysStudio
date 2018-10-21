var par1 = {
    title: 'test title',
    text: 'test text',
    icon: 'android.resource://net.dinglisch.android.taskerm/drawable/mw_action_android',
    priority:3
}


var title = par1.title;
var text = par1.text;
var icon = par1.icon;
var priority = par1.priority;
flash(title)


function remove_notifications() {
    var snooze_time;
    let Snooze_time = parseInt(global('Snooze_time'));
    let TIMES = parseInt(global('TIMES'));
    let Disengaged_until = parseInt(global('Disengaged_until'));
    let Disengaged = (global('Disengaged') === 'true');

    if (Disengaged || Snooze_time > TIMES) {
        if (Disengaged_until > TIMES) {
            snooze_time = (Disengaged_until + 60 - TIMES) * 1000;
        } else if (Disengaged) {
            snooze_time = 1800 * 1000;
        } else {
            snooze_time = (Snooze_time + 5 - TIMES) * 1000;
        }

        let packages = global('All_notification_packages').split(',');
        for (const i in packages) {
            let app = packages[i];
            performTask('remove_notification', priority, app, snooze_time);
        }
    } else if (!Disengaged) {
        let Blocked_apps = global('Blocked_apps');
        let Blocked_times = global('Blocked_times')
        for (i in Blocked_apps) {
            if (Blocked_times[i] > TIMES) {
                let app = Blocked_apps[i];
                performTask('remove_notification', priority, app, snooze_time)
            }
        }
    }
}

