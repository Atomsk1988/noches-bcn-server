// public/core.js

var admin = angular.module('admin', ['ngRoute'])
.service('dataService', ['$http', function($http) {

	offline = false;
	if(offline){
		var url = 'http://localhost:3000/';
	}else{
		var url = 'http://thawing-savannah-4527.herokuapp.com/main';
		
	}
	var base_data = [];
	base_data['discos'] = null;

	$http({
		method: 'GET',
		url: url + 'discos'
	}).success(function(data) {
		base_data['discos'] = data;
	});
	console.log(base_data['discos'])

	this.getDiscos = function(){
		promise = $http({
			method: 'GET',
			url: url + 'discos'
		}).success(function(data) {
			this.discos = data;
			return {'data':data};
		});
		return promise;
	}
	this.insertDisco = function(ob){
		promise = $http({
			method: 'POST',
			url: url + 'discos',
			data:{data:ob.data, image:ob.image}
		}).success(function(msg) {
			console.log('amo a vé1')	
			//discos = data;
			//return {'data':data};
			return msg.data;
		});
		return promise;
	}
	this.updateDisco = function(ob){
		promise = $http({
			method: 'POST',
			url: url + 'discos',
			data:{data:ob.data}
		}).success(function(msg) {
			console.log('amo a vé2')	
			//discos = data;
			//return {'data':data};
			return msg.data;
		});
		return promise;
		//Publico un post para actualizar
	}
	this.getDiscosList = function(){
		console.log(discos)
		return data['discos'];
	}
	this.getList = function(list){
		//return base_data[list];
		result = [];
		//console.log(list, base_data[list])
		if(list == 'discos'){
			for(var item in base_data[list]){
				result.push({_id:base_data[list][item]._id, email:base_data[list][item].email, name:base_data[list][item].name})
			}
			return result;
		}
	}
	//
}])
.controller('adminController', ['$scope', '$http', 'dataService',  function($scope, $http, data){
	$scope.discos = 'discos';
}])
.directive('datalist', function(){
	return {
		restrict:'A',
		transclude:true,
		templateUrl: 'partials/datalist.html',
		scope: {
	      originData: '=origin'
	    },
		controller: ['$scope', '$http', 'dataService',  function($scope, $http, dataService) {
			//console.log($scope.originData);
		    $scope.d = dataService.getList($scope.originData);
			$scope.selected = null;//Selected field array id

			$scope.getSelectedData = function(){
				if($scope.selected!=null)return $scope.d[$scope.selected];
			}
			$scope.getSelectedId = function(){
				return $('.table_highlight').attr('id').substr(6);
			}
	    }],
	    link: function(scope, element, attrs){

	    }	
	}
})
.directive('objecteditor', function(){
	return{
		restrict:'A',
		//transclude:true,
		require: '^datalist',
		scope: {
	      ngModel: '='
	    },
		templateUrl: 'partials/ob-editor.html',
		controller:['$scope', '$http', 'dataService', function($scope, $http, dataService){
			$scope.user = {_id:'', name:'', email:''};

			$scope.insert = function(user,action){
				console.log(action);
				/*
				if($(element).children().children('input[type=hidden]').attr('val')==''){
					scope.insert();
				}else{
					scope.update();
				}
				*/
				if(action=='save'){
					dataService.insertDisco({data:$scope.user, image:$scope.user.image}).then(function(res){
						$scope.$parent.d.push({_id:res.data._id, name:res.data.name, email:res.data.email});
						$scope.user._id = res.data._id;
						$('#fileupload').fileupload({
							formData: {id:res.data._id,type:'disco'}
						})
						//$($scope.$element).children().children('img').attr('src', 'uploads/disco/'+scope.$parent.getSelectedData()._id+'.jpg');
					});
				}else if(action=='update'){
					dataService.updateDisco({data:$scope.user})
				}
				//Aqui elijo si update o insert y llamo al service
			}
			$scope.update = function(){
				dataService.updateDisco({data:$scope.user, _id:$scope.user._id}).then(function(res){
					//busco el key de _id en array y lo actualizo
					//scope.$parent.d.indexOf(res.data._id)
				});
			}
			$scope.reset = function(){
				$scope.user = {_id:'', name:'', email:''};
				$('div[origin="discos"] img').attr('src','');
				$('input').val('');
				$('#fileupload').fileupload({
					formData: {id:$scope.user._id,type:'disco'}
				})
			};
			$scope.setData =function(ob){
				console.log('setdata');
				//console.log(ob);
				//$scope.user = ob;
				$scope.$parent.selected = $scope.$parent.getSelectedId();
				$scope.$apply(function () {
					$scope.user = $scope.$parent.getSelectedData();
			        //scope.time = element.datepicker('getDate');
			    });
			    $('#fileupload').fileupload({
					formData: {id:$scope.user._id,type:'disco'}
				})
		        console.log($scope.user._id,'u.u');

				console.log($scope.$parent.getSelectedData());
			}
			$scope.reset();
		}],
		link:function(scope, element, attrs, dataListCtrl){
			$(element).parent().children('table').children('tbody').children('tr').bind('click',  function(e){

				if(e.currentTarget==$(element).parent().children('table').children('tbody').children('tr.table_highlight')[0]){
					console.log('equal');
					$(element).parent().children('table').children('tbody').children('tr.table_highlight').removeClass('table_highlight');
					scope.reset();
				}else{
					console.log('not equal');
					$(element).parent().children('table').children('tbody').children('tr.table_highlight').removeClass('table_highlight');
					$(e.currentTarget).addClass('table_highlight');
					scope.setData();
					$(element).children().children('img').attr('src', 'uploads/disco/'+scope.$parent.getSelectedData()._id+'.jpg');
				}
			});


			$('#fileupload').fileupload({
			    url: '/imageUpload',
			    type: 'POST',
			    singleFileUploads: true,
				formData: {id:scope.user._id,type:'disco'},
				done: function(e,data){
					$(e.target).parent().children('img').attr('src','.'+data.result.substr(8));
				}
			});
		}
	}
});
