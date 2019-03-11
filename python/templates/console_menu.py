# Import the necessary packages
import consolemenu
import consolemenu.items as cm_items

# Create the menu
menu = consolemenu.ConsoleMenu("Title", "Subtitle")

# Create some cm_items

# MenuItem is the base class for all cm_items, it doesn't do anything when selected
menu_item = cm_items.MenuItem("Menu Item")
function_item = cm_items.FunctionItem("Call a Python function", input, ["Enter an input "])
command_item = cm_items.CommandItem("Run a console command",  "touch hello.txt")

# A SelectionMenu constructs a menu from a list of strings
selection_menu = consolemenu.SelectionMenu(["item1", "item2", "item3"], 'title', 'subtitle', 
                                           False, prologue_text='asdf', epilogue_text='ariuh')

# A SubmenuItem lets you add a menu (the selection_menu above, for example)
# as a submenu of another menu



sub_menu = consolemenu.ConsoleMenu("submenu", "Subtitle")


sub_add_item = cm_items.FunctionItem("add item", lambda: sub_menu.append_item(menu_item))
sub_rem_item = cm_items.FunctionItem("remove item", lambda: sub_menu.remove_item(menu_item))

sub_menu.append_item(sub_add_item)
sub_menu.append_item(sub_rem_item)


submenu_item = cm_items.SubmenuItem("Submenu item", sub_menu, menu)

# Once we're done creating them, we just add the cm_items to the menu
menu.append_item(menu_item)
menu.append_item(function_item)
menu.append_item(command_item)
menu.append_item(submenu_item)

# Finally, we call show to show the menu and allow the user to interact

menu.show()