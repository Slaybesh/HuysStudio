function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

async function wait() {
    sleep(1000)
}

wait()