(function () {
    'use strict';
    angular.module('RDash').factory('dashboardService', dashboardService);
    dashboardService.$inject = ['$http'];

    function dashboardService($http) {
        return {
            index: index
        };
        //get all logs
        function index(params) {
            return $http.get('https://api.cebroker.com/v1/cerenewaltransactions/GetLogsRecordData?startdate=' + params.startdate+ '&enddate=' + params.enddate + '&state=' + params.state);
        }
    }
})();