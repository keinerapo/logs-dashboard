(function () {
    'use strict';
    angular.module('RDash').controller('DashboardController', DashboardController);
    DashboardController.$inject = ['dashboardService', 'DTOptionsBuilder'];

    function DashboardController(dashboardService, DTOptionsBuilder) {
        var vm = this;
        vm.dtOptions = DTOptionsBuilder.newOptions().withOption('order', [7, 'desc']).withOption('lengthMenu', [20, 30, 50, 100]);
        vm.logs = [];
        vm.params = {};
        vm.dateoptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: new Date(1900, 1, 1),
            startingDay: 1
        };
        vm.popup = {
            opened: false
        };
        vm.popup2 = {
            opened: false
        };
        vm.open = open;
        vm.open2 = open2;
        vm.setEndDateOptions = setEndDateOptions;
        vm.searchLogs = searchLogs;


        //Init
        activate();

        function activate() {
            var today = getDay(null);
            vm.params.startdate = today;
            vm.params.enddate = today;
            vm.params.state = '';
            dashboardService.index(vm.params).then(function (response) {
                vm.logs = response.data;
                calStatistics();
            });
        }

        function getDay(date) {
            if (date === null || date === undefined) {
                var today = new Date();
            } else {
                var today = new Date(date);
            }
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
            return today;
        }

        function open() {
            vm.popup.opened = true;
        }

        function open2() {
            vm.popup2.opened = true;
        }

        function setEndDateOptions() {
            vm.dateOptions2 = {
                formatYear: 'yy',
                maxDate: new Date(),
                minDate: new Date(vm.startdate),
                startingDay: 1
            };
        }

        function searchLogs() {
            vm.logs = [];
            vm.params.startdate = getDay(vm.startdate);
            vm.params.enddate = getDay(vm.enddate);
            if (vm.state === null || vm.state === undefined) {
                vm.params.state = '';
            } else {
                vm.params.state = vm.state;
            }
            console.log(vm.params);
            dashboardService.index(vm.params).then(function (response) {
                vm.logs = response.data;
                calStatistics();
            });
        }

        function calStatistics() {
            var t = 0;
            var sum = 0;
            angular.forEach(vm.logs,function(value,key){
                var start = moment(value.dt_Start_Log);
                var end = moment(value.dt_end_log);
                var dif = end.diff(start);
                console.log(dif);
                sum = sum + dif;
                t = t +1;
            });
            vm.t_average_resp = sum/t;
            console.log(vm.t_average_resp);
        }
    }
})();