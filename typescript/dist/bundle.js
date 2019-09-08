System.register("module", [], function (exports_1, context_1) {
    "use strict";
    var a;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            a = 'Hello World!';
            exports_1("a", a);
        }
    };
});
System.register("main", ["module"], function (exports_2, context_2) {
    "use strict";
    var module_1;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (module_1_1) {
                module_1 = module_1_1;
            }
        ],
        execute: function () {
            console.log(module_1.a);
        }
    };
});
