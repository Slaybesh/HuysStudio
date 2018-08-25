def profile_disengage():
    if time == 22 and wifi.connected():
        disengage()

def profile_wake_up():
    if screen.off():
        wake_up()

def profile_engage():
    if Disengage_until < time.time():
        engage()


def profile_notification_listener():
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

app_list = {
    'app_package': {
        max_dur: Max_dur,
        max_freq: Max_freq,

        dur: 0,
        freq: 0,
        last_used: 0,
        blocked_until: 0, 
    },

    'com.instagram.android': {
        max_dur: 1200,
        max_freq: 10,

        dur: Instagram_dur,
        freq: Instagram_freq,
        last_used: Instagram_last_used,
        blocked_until: Instagram_blocked_until, 
    }
}

{
    "com.whatsapp": [],
    "com.google.android.apps.maps": [],
    "com.google.android.gm": [],
    "com.google.android.apps.inbox": [],
    "com.snapchat.android": [{
        "dur": "Dur_com.snapchat.android",
        "blocked_until": "Blocked_untilcom.snapchat.android",
        "max_dur": 10,
        "last_used": "Last_used_com.snapchat.android",
        "freq": "Freq_com.snapchat.android",
        "max_freq": 5
    }],
    "com.tinder": [{
        "dur": "Dur_com.tinder",
        "blocked_until": "Blocked_untilcom.tinder",
        "max_dur": 20,
        "last_used": "Last_used_com.tinder",
        "freq": "Freq_com.tinder",
        "max_freq": 10
    }],
    "com.google.android.youtube": [{
        "dur": "Dur_com.google.android.youtube",
        "blocked_until": "Blocked_untilcom.google.android.youtube",
        "max_dur": 1800,
        "last_used": "Last_used_com.google.android.youtube",
        "freq": "Freq_com.google.android.youtube",
        "max_freq": 10
    }],
    "com.okcupid.okcupid": [{
        "dur": "Dur_com.okcupid.okcupid",
        "blocked_until": "Blocked_untilcom.okcupid.okcupid",
        "max_dur": "0",
        "last_used": "Last_used_com.okcupid.okcupid",
        "freq": "Freq_com.okcupid.okcupid",
        "max_freq": "0"
    }],
    "com.instagram.android": [{
        "dur": "Dur_com.instagram.android",
        "blocked_until": "Blocked_untilcom.instagram.android",
        "max_dur": 15,
        "last_used": "Last_used_com.instagram.android",
        "freq": "Freq_com.instagram.android",
        "max_freq": 10
    }],
    "com.innogames.foeandroid": [{
        "dur": "Dur_com.innogames.foeandroid",
        "blocked_until": "Blocked_untilcom.innogames.foeandroid",
        "max_dur": "0",
        "last_used": "Last_used_com.innogames.foeandroid",
        "freq": "Freq_com.innogames.foeandroid",
        "max_freq": "0"
    }],
    "com.reddit.frontpage": [{
        "dur": "Dur_com.reddit.frontpage",
        "blocked_until": "Blocked_untilcom.reddit.frontpage",
        "max_dur": 1200,
        "last_used": "Last_used_com.reddit.frontpage",
        "freq": "Freq_com.reddit.frontpage",
        "max_freq": 10
    }]
}
