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


var snooze_time;
function remove_notifications() {
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

        let packages = global('All_notification_packages')
        for (const i in packages) {
            flash(packages[i]);
        }
            
    }
}

function flash(input) {console.log(input)}

var arr = [0,1,2,3]
flash(arr)
for (const i in arr) {
    flash(arr[i]);
}