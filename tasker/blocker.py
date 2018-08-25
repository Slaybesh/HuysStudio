def app_blocker(args):

    app_freq += 1

    if app_block_time > time.time() or Disengaged:
        app_close(false, max_dur, app_package, app_dur, app_freq, app_blocked_until)
    elif app_freq > max_freq:
        app_close(true, max_dur, app_package, app_dur, app_freq, app_blocked_until)
    elif app_last_used > reset_time:
        app_reset_vars(app_dur, app_freq)

    while in_app():
        if app_dur > max_dur:
            app_close(true, max_dur, app_package, app_dur, app_freq, app_blocked_until)
        else:
            app_last_used = time.time()
            time.sleep(5)
            app_time += time.time() - app_last_used


def app_ui(app_dur, app_freq):
    ui.set_information(app_dur, app_freq)
    ui.show()


def app_close(write, reset_time, app_package, app_dur, app_freq, app_blocked_until):

    app_show_ui(app_dur, app_freq)
    app_reset_vars(app_dur, app_freq)
    app.kill(app_package)
    if write:
        app_blocked_until = time.time() + reset_time
    remove_notifications(app_package, app_blocked_until - time.time())


def app_reset_vars(app_dur, app_freq):
    app_dur = 0
    app_freq = 0


def remove_notifications(app_list, duration):
    apps = nlqkey(app_list)
    for app in apps:
        nlqsnooze(app, duration)

