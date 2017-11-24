(function () {
    'use strict';
    angular.module('RDash').controller('DashboardController', DashboardController);
    DashboardController.$inject = ['NgTableParams'];

    function DashboardController(NgTableParams) {
        var vm = this;

        //Init
        activate();
        

        function activate() {
        }
    }
})();