def profile_disengage():
    if time == 22 and wifi_connected():
        disengage()

def profile_wake_up():
    if screen_off():
        wake_up()

def profile_engage():
    if Disengage_until < time_time():
        engage()


def profile_notification_listener():
    for app in App_list:
        remove_notifications()


def profile_bad_app():
    args = {
        max_dur: 1200,
        reset_time: max_dur * 3,
        max_freq: 10,
        package: 'com_instagram_android',

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

    'com_instagram_android': {
        max_dur: 1200,
        max_freq: 10,

        dur: Instagram_dur,
        freq: Instagram_freq,
        last_used: Instagram_last_used,
        blocked_until: Instagram_blocked_until, 
    }
}

{
    "com_snapchat_android": [{
        "dur": "Dur_com_snapchat_android",
        "blocked_until": "Blocked_until_com_snapchat_android",
        "max_dur": 10,
        "last_used": "Last_used_com_snapchat_android",
        "freq": "Freq_com_snapchat_android",
        "max_freq": 5
    }],
    "com_tinder": [{
        "dur": "Dur_com_tinder",
        "blocked_until": "Blocked_until_com_tinder",
        "max_dur": 20,
        "last_used": "Last_used_com_tinder",
        "freq": "Freq_com_tinder",
        "max_freq": 10
    }],
    "com_google_android_youtube": [{
        "dur": "Dur_com_google_android_youtube",
        "blocked_until": "Blocked_until_com_google_android_youtube",
        "max_dur": 1800,
        "last_used": "Last_used_com_google_android_youtube",
        "freq": "Freq_com_google_android_youtube",
        "max_freq": 10
    }],
    "com_okcupid_okcupid": [{
        "dur": "Dur_com_okcupid_okcupid",
        "blocked_until": "Blocked_until_com_okcupid_okcupid",
        "max_dur": 20,
        "last_used": "Last_used_com_okcupid_okcupid",
        "freq": "Freq_com_okcupid_okcupid",
        "max_freq": 10
    }],
    "com_instagram_android": [{
        "dur": "Dur_com_instagram_android",
        "blocked_until": "Blocked_until_com_instagram_android",
        "max_dur": 15,
        "last_used": "Last_used_com_instagram_android",
        "freq": "Freq_com_instagram_android",
        "max_freq": 10
    }],
    "com_innogames_foeandroid": [{
        "dur": "Dur_com_innogames_foeandroid",
        "blocked_until": "Blocked_until_com_innogames_foeandroid",
        "max_dur": 20,
        "last_used": "Last_used_com_innogames_foeandroid",
        "freq": "Freq_com_innogames_foeandroid",
        "max_freq": 10
    }],
    "com_reddit_frontpage": [{
        "dur": "Dur_com_reddit_frontpage",
        "blocked_until": "Blocked_until_com_reddit_frontpage",
        "max_dur": 1200,
        "last_used": "Last_used_com_reddit_frontpage",
        "freq": "Freq_com_reddit_frontpage",
        "max_freq": 10
    }]
}
