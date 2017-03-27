'use strict';

angular.module('BusinessInfoFinder',[])
    .controller('SearchController', SearchController)
    .factory('CompanyInformationFactory', CompanyInformationFactory);

    SearchController.$inject = ['$scope', '$http', 'CompanyInformationFactory'];
    CompanyInformationFactory.$inject = ['$http'];

    function SearchController($scope, $http, CompanyInformationFactory){
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
            }else {
                CompanyInformationFactory.searchCompany($scope.searchBy).then(function (data){
                    // console.log(data);
                    $scope.numberOfMatches = data.length;
                    if($scope.numberOfMatches == 0){
                        $scope.error = "SORRY! We cannot find any Information in the database";
                    }else if($scope.numberOfMatches == 1){
                        $scope.singleMatch = data[0];
                    }else{
                        $scope.multipleMatch = data;
                    }
                });
            }
           
        }

        $scope.hideAlert = function() {
            $scope.error = "";
            $scope.numberOfMatches = "";
        }

        $scope.searchThisCompany = function(bId) {
            // console.log(bId);
            $scope.searchBy.name = "";
            $scope.searchBy.bId = bId;
            $scope.searchCompanyInfo();
        }
    }

    function CompanyInformationFactory($http) {
        this.searchCompany = function (option){
            return $http.post('/api/companyinfo/', option).then(function(response){
                return response.data;
            });
        }
        return this;
    }