function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function onPress() {
    // await sleep(200)
    if (math_input == math_result) {
        hideScene('app')
    } else {

        elemVisibility('app', 'Math Input', false, 200)
        elemText('app', 'Math Input', 'repl', '');
        elemBorder('app', 'Math Input', 2, 'ff0000')
        elemVisibility('app', 'Math Input', true, 200)
        await sleep(1000)
        elemVisibility('app', 'Math Input', false, 200)
        elemBorder('app', 'Math Input', 0, '000000')
        elemVisibility('app', 'Math Input', true, 0)
        performTask('Scene Focus', parseInt(priority) + 1, 'app', 'Math Input')
    }
    exit()
}

var math_input;
var math_result;
onPress()