def disengage():
    screen.change_colors(weird)
    remove_notifications(app_list, 10860) # 3h

    wake_up(on)
    after_wake_up(off)
    auto_turn_off_wifi(on)

    wifi.off()
    mobile_data.off()
    Disengaged = True

def wake_up():
    time_start = time.time()
    while screen.off():
        time.sleep(5)

    time_screen_off = time.time() - time_start

    if time_screen_off > 10800: # 3h
        Disengage_until = time.time() + 10800 # 3h
        after_wake_up(on)

def engage():
    screen.change_colors(normal)

    wake_up(off)
    auto_turn_off_wifi(off)

    wifi.on()
    mobile_data.on()
    Disengaged = False
