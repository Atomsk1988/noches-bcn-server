var datalist = angular.module('datalist', ['ngRoute'])
.directive('datalist', function(){
	return {
		restrict:'A',
		//transclude:true,
		templateUrl: 'partials/datalist.html',
		//scope: {
			//ngModel: '=ngModel'
	      	//cols: '=cols'
	 	//},
	    //require: '^admin',
		controller: ['$scope', '$http',  function($scope, $http) {
			
			//$scope.discos = {name:'asd'}
			//console.log($scope);

			/*
			//console.log($scope.originData);
			//$scope.data = dataService.getData($scope.originData);
		    //$scope.d = dataService.getList($scope.originData);
		   	//console.log('data list population', dataService.getList($scope.originData));
			console.log('Datalist:',  $scope);
			$scope.selected = null;//Selected field array id
			$scope.getService = function(){
				return dataService;
			}

			$scope.getSelectedData = function(){
				if($scope.selected!=null)return $scope.data[$scope.selected];
			}
			$scope.getSelectedId = function(){
				return $('.table_highlight').attr('id').substr(6);
				//if(}else{return null};
			}
			$scope.$watch
	    	*/
	    }],
	    link: function(scope, element, attrs){
	    	//carga los datos despues
	    	//var dataServ = scope.getService();
	    	//scope.data = dataServ.getData(scope.originData);
	    	//scope.d = dataServ.getList(scope.originData);
	    }
	}
})/*
.directive('trancludecontainer', function(){
	return {
		restrict:'A',
		scope: {
	      ngModel: '='
	    },
	    controller:['$scope', '$http', function($scope, $http){

	    }]
	}
})*/