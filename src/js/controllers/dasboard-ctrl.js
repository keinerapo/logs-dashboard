(function () {
    'use strict';
    angular.module('RDash').controller('DashboardController', DashboardController);
    DashboardController.$inject = ['dashboardService'];

    function DashboardController(dashboardService) {
        var vm = this;
        
        //Init
        activate();
        
        function activate() {
            dashboardService.query().then(function(response){
                vm.logs = response;
                console.log(vm.logs);
            });
        }
    }
})();