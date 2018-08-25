def disengage():
    if time == 22 and wifi.connected():
        disengage()

def wake_up():
    if screen.off():
        wake_up()

def after_wake_up():
    if disengage_until < time.time():
        engage()

def notification_listener():
    for app in app_list:
        remove_notifications()


def bad_app():
    args = {
        max_dur: 1200,
        reset_time: max_dur * 3,
        max_freq: 10,
        app_package: 'com.instagram.android',

        app_dur: Instagram_dur,
        app_freq: Instagram_freq,
        app_last_used: Instagram_last_used,
        app_blocked_until: Instagram_blocked_until,
    }
    app_blocker(args)