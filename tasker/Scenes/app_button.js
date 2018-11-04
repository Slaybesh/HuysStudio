function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function onPress() {
    // await sleep(200)
    if (math_input == math_result) {
        hideScene('app')
    } else {

        elemVisibility('app', 'Math Input', false, 200)
        elemText('app', 'Math Input', 'repl', '');
        elemBorder('app', 'Math Input', 1, 'ff0000')
        elemVisibility('app', 'Math Input', true, 200)
        await sleep(1000)
        elemVisibility('app', 'Math Input', false, 200)
        elemBorder('app', 'Math Input', 1, '000000')
        elemVisibility('app', 'Math Input', true, 0)
    }
    exit()
}

var math_input;
var math_result;
onPress()