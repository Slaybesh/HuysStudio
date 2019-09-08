function fn(str, {a, b, c}) {
  console.log(str, a, b, c)
}

let obj = {a: 0, b: 1, c:2}

let {a, b, c, d} = obj

function default_param(a,b,c,d=null) {
  console.log(a,b ,c, d)
}

default_param(a,b,c,d)