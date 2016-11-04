System.register(["@angular/router", "./error.component"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, error_component_1, routes, ErrorRouting;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (error_component_1_1) {
                error_component_1 = error_component_1_1;
            }
        ],
        execute: function () {
            exports_1("routes", routes = [
                { path: 'error', component: error_component_1.ErrorComponent, pathMatch: "full" }
            ]);
            exports_1("ErrorRouting", ErrorRouting = router_1.RouterModule.forChild(routes));
        }
    };
});
//# sourceMappingURL=error.routing.js.map