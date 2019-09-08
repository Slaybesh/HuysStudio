import time

import cv2
import numpy as np

import __init__
from Sandbox.python.templates.decorators import timer
from Sandbox.python.templates.huys_logging import Logging


logging = Logging('cv2_tools', 'debug', filter_str='', create_file=False)


# region display
def show_img(name, img):
    cv2.imshow(name, cv2.cvtColor(img, cv2.COLOR_BGR2RGB))


def wait_img(wait=0):
    cv2.waitKey(wait)
    cv2.destroyAllWindows()


# endregion

# region manipulation
def cut_img(img, template, loc):
    """ cuts input image to size of template
    input: 
        img: larger image to cut
        template: smaller image to get size from
        loc: location in pixels on image where template is supposed to be

    return: template from image
     """
    height, width, _ = template.shape
    return img[loc[1]:loc[1] + height, loc[0]:loc[0] + width]
# endregion

# region information
def get_template_loc(screen, template):
    """ 
    input: screen, the big img
    input2: template, the smaller img

    output: prob, loc 
    """
    logger = logging.get_logger('get_template_loc')

    result = cv2.matchTemplate(screen, template, cv2.TM_CCOEFF_NORMED)
    _, prob, _, loc = cv2.minMaxLoc(result)

    logger.debug(f'normal prob: {prob}')

    return prob, loc

def masker(img):

    lower_boundry = np.array([[0, 0, 0]])
    upper_boundry = np.array([[255, 255, 255]])
    thresholded = cv2.inRange(img, lower_boundry, upper_boundry)
    # copy thresholded for paint bucket operation
    img_flood = thresholded.copy()
    # cv2.imshow('1', thresholded)

    h, w = thresholded.shape[:2]

    cv2.floodFill(img_flood, np.zeros((h+2, w+2), np.uint8), (0,0), 255)
    # cv2.imshow('2', img_flood)

    img_inv = cv2.bitwise_not(img_flood)
    # cv2.imshow('3', img_inv)
    # img_masked = thresholded | img_inv

    # cv2.imshow('4', img_masked)
    return img_inv

def test_canny_vid(img):

    import pyautogui
    while True:
        x, y = pyautogui.position()

        positionStr = f'edge: {str(x).ljust(10)}thresh: {str(y).ljust(10)}'
        print(positionStr, end='')
        print('\b' * len(positionStr), end='', flush=True)

        canny_img = cv2.Canny(img, x, y)

        show_img('1', canny_img)

        cv2.waitKey(1)

        time.sleep(0.01)

    input()
    cv2.destroyAllWindows()


if __name__ == '__main__':
    img = cv2.imread(r'C:\Users\Huy\Documents\GitHub\FoE_bot\image.png')
    # img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    test_canny_vid(img)
