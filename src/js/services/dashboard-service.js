(function () {
    'use strict';
    angular.module('RDash').factory('dashboardService', dashboardService);
    dashboardService.$inject = ['$http'];

    function dashboardService($http) {
        return {
            query: query
        };
        //get all logs
        function query() {
            return $http.get('https://api.cebroker.com/v1/cerenewaltransactions/GetLogsRecordData?startdate=05/10/2017&enddate=05/20/2017&state=FL');
        }
    }
})();