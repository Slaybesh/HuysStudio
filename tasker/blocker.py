def app_blocker(args):

    freq += 1

    scene.reset()
    app_ui(args)

    if blocked_until > TIMES or Disengaged:
        close(args, false)
    elif freq > max_freq:
        close(args, true)
    elif TIMES - last_used > max_dur * 3:
        dur = 0
        freq = 0

    while True:
        aipackage = ai.query()
        # print(aipackage)
        if dur > max_dur:
            close(args, true)
        else:
            last_used = TIMES
            app_time_left(args)
            time.sleep(1)
            dur += TIMES - last_used

        if aipackage == (package or systemui or tasker):
            continue


def app_close(args, write):

    go_home()

    if write:
        dur = 0
        freq = 0
        blocked_until = TIMES + max_dur * 3

    index = Blocked_apps.index(package)
    if index != 0:
        Blocked_times[index] = blocked_until
    else:
        Blocked_apps.append(package)
        Blocked_times.append(blocked_until)

    remove_notifications()
    app_show_ui()
    # app.kill(package)


def app_ui(args):
    time_used1 = floor(dur / 60)
    time_used2 = dur % 60
    time_used_min, time_used_sec = pad(time_used1, time_used2)

    if Disengaged_until > TIMES:
        date = VariableConvert(Disengage_until)
    elif Disengaged:
        time = 'tomorrow.'
    elif blocked_until > TIMES:
        date = VariableConvert(blocked_until)

    if date:
        time = 'at ' + date[-1]
    blocked_text = 'Currently blocked. Comeback {}.'.format(time)
    
    if not blocked_text:
        blocked_text = ''

    scene.set_information('{}, Time used: {} min, {} sec, Times opened {}'.format(blocked_text, time_used_min, time_used_sec, freq))
    ui.show()


def remove_notifications():
    if not Disengaged:
        for i in range(len(Blocked_apps)):
            if Blocked_times[i] > TIMES:
                nlqkey = nl.qkey(Blocked_apps[i])
                snooze_time = (Blocked_times[i] - TIMES) * 1000
                for key in nlqkey:
                    nl.snooze(key, snooze_time)
    else:
        if Disengaged_until > TIMES:
            snooze_time = (Disengage_until - TIMES) * 1000
        else:
            snooze_time = 3600 * 1000
        for app in All_notification_packages:
            nlqkey = nl.qkey(app)
            for key in nlqkey:
                nl.snooze(key, snooze_time)


