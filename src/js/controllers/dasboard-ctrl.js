(function () {
    'use strict';
    angular.module('RDash').controller('DashboardController', DashboardController);
    DashboardController.$inject = ['dashboardService'];

    function DashboardController(dashboardService) {
        var vm = this;
        vm.logs = {};
        vm.params = {};

        //Init
        activate();

        function activate() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            today = mm + '/' + dd + '/' + yyyy;
            console.log(today);
            vm.params.startdate = today;
            vm.params.enddate = today;
            vm.params.state = '';
            dashboardService.index(vm.params).then(function (response) {
                console.log(response);
                vm.logs = response.data;
            });
        }
    }
})();
