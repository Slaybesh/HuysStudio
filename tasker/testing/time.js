function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}

Date.prototype.getFullHours = function () {
    if (this.getHours() < 10) {
        return '0' + this.getHours();
    }
    return this.getHours();
};
Date.prototype.getFullMinutes = function () {
    if (this.getMinutes() < 10) {
        return '0' + this.getMinutes();
    }
    return this.getMinutes();
};
Date.prototype.getFullSeconds = function () {
    if (this.getSeconds() < 10) {
        return '0' + this.getSeconds();
    }
    return this.getSeconds();
};
Date.prototype.getFullMilliseconds = function () {
    if (this.getMilliseconds() < 10) {
        return '00' + this.getMilliseconds();
    } else if (this.getMilliseconds() < 100) {
        return '0' + this.getMilliseconds();
    }
    return this.getMilliseconds();
};

function time() {
    var date = new Date(); 
    var datetime = "Last Sync: " + date.getDate() + "/"
                    + (date.getMonth()+1)  + "/" 
                    + date.getFullYear() + " @ "  
                    + date.getFullHours() + ":"  
                    + date.getFullMinutes() + ":" 
                    + date.getFullSeconds() + ":" 
                    + date.getFullMilliseconds();

    console.log(datetime)
}

async function func() {
    for (i in [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]) {
        time()
        await sleep(10)
    }
}
func()