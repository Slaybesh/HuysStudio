def app_blocker():

    app_package = nlq.package()
    args_json = json.read(app_package)
    args = json.read(args_json)

    if app_dur and app_freq:       
        app_freq += 1

        if app_blocked_until > TIMES or Disengaged:
            app_close(false, app_package)
        elif app_freq > max_freq:
            app_close(true, app_package)
        elif TIMES - app_last_used > max_dur * 3:
            app_dur = 0
            app_freq = 0

        while in_app():
            if app_dur > max_dur:
                app_close(true, app_package)
            else:
                app_last_used = TIMES
                time.sleep(5)
                app_dur += TIMES - app_last_used


def app_ui(app_dur, app_freq):
    ui.set_information(app_dur, app_freq)
    ui.show()


def app_close(write, app_package):

    args_json = json.read(app_package)
    args = json.read(args_json)

    app_show_ui(app_dur, app_freq)
    # app.kill(app_package)
    if write:
        app_dur = 0
        app_freq = 0
        app_blocked_until = TIMES + max_dur * 3

    App_list[app_package] = app_blocked_until
    remove_notifications()


def app_reset_vars(app_dur, app_freq):
    app_dur = 0
    app_freq = 0


def remove_notifications():
    if Disengaged:
        if Disengaged_until > TIMES:
            snooze_time = (Disengage_until - TIMES) * 1000
        else:
            snooze_time = 3600 * 1000

    for app in App_list:
        key = nlqkey(app[0])
        if not snooze_time:
            snooze_time = (app[1] - TIMES) * 1000
            if snooze_time < 0: snooze_time = 0
        nlqsnooze(key, snooze_time)

