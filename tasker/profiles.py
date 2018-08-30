def profile_disengage():
    if time == 22 and wifi.connected():
        disengage()

def profile_wake_up():
    if screen.off:
        wake_up()

def profile_engage():
    if Disengage_until < time.time():
        engage()


def notification_blocker():
    for app in App_list:
        remove_notifications()


def profile_bad_app():
    
    args = {
        max_dur: 1200,
        reset_time: max_dur * 3,
        max_freq: 10,
        package: 'com.instagram.android',

        dur: Instagram_dur,
        freq: Instagram_freq,
        last_used: Instagram_last_used,
        blocked_until: Instagram_blocked_until,
    }
    app_blocker(args)
