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
    let glob_snooze_time = parseInt(global('Snooze_time'));
    let glob_times = parseInt(global('TIMES'));
    let glob_disengaged_until = global('Disengaged_until');
    if (global('Disengaged') == 'true' || glob_snooze_time > glob_times) {
        if ( glob_disengaged_until > glob_time ) {
            var snooze_time 
        }
    }
}