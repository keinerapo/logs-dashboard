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
        vm.t_average_resp = 0.0;


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
            cal_t_average();
            generate_graph_per_days();
        }

        function cal_t_average() {
            var t = 0;
            var sum = 0;
            angular.forEach(vm.logs, function (value, key) {
                var start = moment(value.dt_Start_Log);
                var end = moment(value.dt_end_log);
                var dif = end.diff(start);
                sum = sum + dif;
                t = t + 1;
            });
            vm.t_average_resp = sum / t;
        }

        function generate_graph_per_days() {
            vm.options = {
                chart: {
                    type: 'lineChart',
                    height: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 40,
                        left: 55
                    },
                    x: function (d) {
                        return d.x;
                    },
                    y: function (d) {
                        return d.y;
                    },
                    useInteractiveGuideline: true,
                    xAxis: {
                        axisLabel: 'Days (DD)'
                    },
                    yAxis: {
                        axisLabel: 'Average Response Time (ART)',
                        tickFormat: function (d) {
                            return d3.format('.02f')(d);
                        },
                        axisLabelDistance: -10
                    }
                },
                title: {
                    enable: true,
                    text: 'Average Response Time per Day'
                }
            };

            vm.data = generate_data();
            console.log(vm.data);
        }

        function generate_data() {
            var data = [];
            var day = new Date(vm.logs[0].dt_Start_Log);
            day = day.getDay();
            var t = 0;
            var sum = 0;
            angular.forEach(vm.logs, function (value, key) {
                var new_day = new Date(value.dt_Start_Log);
                console.log(day + ' - ' + new_day);
                new_day = new_day.getDay();
                console.log(day + ' - ' + new_day);
                if (day !== new_day) {
                    data.push({
                        x: day,
                        y: sum / t
                    })
                    day = new_day;
                    t = 0;
                    sum = 0;
                }
                var start = moment(value.dt_Start_Log);
                var end = moment(value.dt_end_log);
                var dif = end.diff(start);
                sum = sum + dif;
                t = t + 1;
            });
            return [
                {
                    values: data, //values - represents the array of {x,y} data points
                    key: 'Average Response Time per Day', //key  - the name of the series.
                    color: '#ff7f0e'
                }
                    ];
        }
    }
})();
