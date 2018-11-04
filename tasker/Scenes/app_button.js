function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function onPress() {
    await sleep(250)
    if (math_input == math_result) {
        hideScene('app')
    } else {
        elemText('app', 'Math Input', 'repl', '');
        elemVisibility('app', 'Math Input', false, 0)
        elemBorder('app', 'Math Input', 1, 'ff0000')
        elemVisibility('app', 'Math Input', true, 300)
        await sleep(500)
        elemVisibility('app', 'Math Input', false, 300)
        elemBorder('app', 'Math Input', 1, '000000')
        elemVisibility('app', 'Math Input', true, 0)
    }
}

var math_input;
var math_result;
onPress()