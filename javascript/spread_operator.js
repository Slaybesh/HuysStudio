let numbers = [];

function spreader(script, ...args){
  console.log(script);
  console.log(args);
}

spreader('script', [1, 2, 3], 4, 5);