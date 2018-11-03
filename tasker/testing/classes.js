let arr = [1,2,3,4]

class MyClass {
    constructor(arr) {
        this.arr = arr;
    }

    printarr() {
        console.log(this.arr[0])
    }
    
}

let newClass = new MyClass(arr);

newClass.printarr()