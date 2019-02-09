import time

import cv2
import numpy as np
from matplotlib import pyplot as plt

import __init__
from huys_code.python.templates.decorators import timer
from huys_code.python.templates.huys_logging_simple import Logging


logging = Logging('cv2_tools', 'debug', filter_str='', create_file=False)


#region display
def show_img(name, img):
    cv2.imshow(name, cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

def wait_img(wait=0):
    cv2.waitKey(wait)
    cv2.destroyAllWindows()



#endregion

#region manipulation
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
#endregion

#region information

def get_template_loc(screen, template):
    """ 
    input: screen, the big img
    input2: template, the smaller img
        
    output: prob, loc 
    """
    logger = logging.get_logger('get_template_loc')

    result = cv2.matchTemplate(screen, template, cv2.TM_CCOEFF_NORMED)
    _, prob, _, loc  = cv2.minMaxLoc(result)

    logger.debug(f'normal prob: {prob}')


    
    result = cv2.matchTemplate(screen, template, cv2.TM_CCOEFF_NORMED)
    _, prob, _, loc  = cv2.minMaxLoc(result)
    

    return prob, loc


def test_canny_plt(img):
    edges1 = cv2.Canny(img, 100, 200)
    edges2 = cv2.Canny(img, 0, 0)
    edges3 = cv2.Canny(img, 1000, 1000)
    edges4 = cv2.Canny(img, 200, 100)

    plt.subplot(311)
    plt.imshow(img, cmap = 'gray')
    plt.title('Original Image')
    plt.xticks([])
    plt.yticks([])

    plt.subplot(321)
    plt.imshow(edges1, cmap = 'gray')
    plt.title('Edge Image1')
    plt.xticks([])
    plt.yticks([])

    plt.subplot(322)
    plt.imshow(edges2, cmap = 'gray')
    plt.title('Edge Image2')
    plt.xticks([])
    plt.yticks([])

    plt.subplot(323)
    plt.imshow(edges3, cmap = 'gray')
    plt.title('Edge Image3')
    plt.xticks([])
    plt.yticks([])

    plt.subplot(324)
    plt.imshow(edges4, cmap = 'gray')
    plt.title('Edge Image4')
    plt.xticks([])
    plt.yticks([])

    plt.show()

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