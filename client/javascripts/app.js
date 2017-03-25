'use strict';
console.log("JavaScript is loaded");
angular.module('BusinessInfoFinder',[])
    .controller('SearchController',['$scope','$http', function($scope,$http){
        $scope.searchByName = "";
        $scope.searchById = "";
        $scope.searchCompanyInfo = function(){
            if($scope.searchByName == "" && $scope.searchById == ""){
                $scope.data = "Please fill One of the Input options";
            }else{
                $http.post('http://localhost:2000/api/companyinfo',{
                    name: $scope.searchByName,
                    bId: $scope.searchById
                }).then(function(response){
                    console.log(response.data);
                    if(response.data.length == 0){
                        $scope.data = "Sorry! No Information is found";
                    }else{
                        $scope.data = response.data;
                    }
                });
            }
           
        }
    }]);