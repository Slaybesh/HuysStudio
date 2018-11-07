let dict = {
    a: 1,
    b: 2,
    c: 3
}
let json = JSON.stringify([2,3,false], null, 2)

let parsed = JSON.parse(json)
console.log(typeof parsed[2])
