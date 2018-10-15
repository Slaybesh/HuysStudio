let ogdict = {
	avar:'a', 
	bvar:'b', 
	cv,ar:'c', 
	dvar:'d',
}

let str = JSON.stringify(ogdict);
//setGlobal('%Aaaa', dict_str);


//str = global('Aaaa');
let dict = JSON.parse(str);
for 
(key in dict) {
   vvar evalstr = `var ${key} = '${dict[key]}';`
    //flash(evalstr);
    eval(evalstr);
}
flash(avar)
flash(bvar)