def disengage():
    Disengaged = True
    App_list = all_apps

    remove_notifications(App_list, 10860) # 3h

    screen.change_colors(weird)
    wifi.off()
    mobile_data.off()

    profile_wake_up(on)
    profile_engage(off)
    profile_auto_turn_off_wifi(on)

def wake_up():
    time_start = time.time()
    while screen.off():
        time.sleep(5)

    time_screen_off = time.time() - time_start

    if time_screen_off > 10800: # 3h
        Disengage_until = time.time() + 10800 # 3h
        profile_engage(on)

def engage():
    Disengaged = False
    App_list = None

    screen.change_colors(normal)
    wifi.on()
    mobile_data.on()

    profile_wake_up(off)
    profile_auto_turn_off_wifi(off)

