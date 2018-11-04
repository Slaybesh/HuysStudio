class Element {
    constructor(scene, elem) {
        this.scene = scene
        this.elem = elem
    }
    hide(speed) {
        elemVisibility(this.scene, this.elem, false, speed)
    }
    show(speed) {ew
        elemVisibility(this.scene, this.elem, true, speed)
    }
    border(color, size) {
        elemBorder(this.scene, this.elem, size, color)
    }
    text(text, mode='repl') {
        elemText(this.scene, this.elem, mode, text)
    }
    focus(element) {
        performTask('Scene Focus', parseInt(priority) + 1, this.scene, element)
    }

    on(color, speed) {
        this.hide(0)
        this.border(color, 2)
        this.show(speed)
    }

    off(color, speed) {
        anim.hide(speed)
        anim.border(color, 0)
        anim.show(0)
    }
}

let anim = new Element('Test Scene', 'Rectangle1')

function anim1() {

    anim.on('ff0000', 200)
    await sleep(200)
    anim.off('000000', 200)
}

function anim2() {

    anim.on('ff0000', 200)
    await sleep(100)
    anim.off('000000', 200)
}

function anim3() {

    anim.on('ff0000', 300)
    await sleep(100)
    anim.off('000000', 100)
}

function anim4() {

    anim.on('ff0000', 100)
    await sleep(100)
    anim.off('000000', 300)
}

var par1;
eval(par1 + '()')