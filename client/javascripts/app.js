'use strict';
console.log("JavaScript is loaded");
angular.module('BusinessInfoFinder',[])
    .controller('SearchController',['$scope','$http', function($scope,$http){
        $scope.searchBy = {
            name: "",
            bId: ""
        };
        $scope.error = "";
        $scope.numberOfMatches = null;

        $scope.searchCompanyInfo = function(){
            $scope.error = "";
            $scope.singleMatch = "";
            $scope.multipleMatch = "";
            $scope.numberOfMatches = null;
            if($scope.searchBy.name == "" && $scope.searchBy.bId == ""){
                $scope.error = "Error: You must fill in 'ONE' of the Input Options in order to Search successfully";
            }else{
                $http.post('http://localhost:3000/api/companyinfo',{
                    name: $scope.searchBy.name,
                    bId: $scope.searchBy.bId
                }).then(function(response){
                    console.log(response.data);
                    $scope.numberOfMatches = response.data.length;
                    if($scope.numberOfMatches == 0){
                        $scope.error = "SORRY! We cannot find any Information in the database";
                    }else if($scope.numberOfMatches == 1){
                        $scope.singleMatch = response.data[0];
                    }else{
                        $scope.multipleMatch = response.data;
                    }
                });
            }
           
        }

        $scope.hideAlert = function() {
            $scope.error = "";
            $scope.numberOfMatches = "";
        }
        $scope.searchThisCompany = function(bId) {
            console.log(bId);
            $scope.searchBy.name = "";
            $scope.searchBy.bId = bId;
            $scope.searchCompanyInfo();
        }
    }])
    .factory('', ['$http', function($http){
        this.search
    }]);