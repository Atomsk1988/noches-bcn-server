// public/core.js

var admin = angular.module('admin', ['ngRoute'])
.service('dataService', ['$http', function($http) {

	var offline = false;
	if(offline){
		var url = 'http://localhost:3000/';
	}else{
		var url = 'http://thawing-savannah-4527.herokuapp.com/';

	}
	this.base_data = [];
	this.base_data['discos'] = [];
	var base_data = [];
	$http({
		method: 'GET',
		url: url + 'discos'
	}).success(function(data) {
		base_data['discos'] = data;
		//this.base_data['discos'] = base_data['discos'];
		console.log(base_data);
	});
	/*
	this.getDiscos = function(){
		promise = $http({
			method: 'GET',
			url: url + 'discos'
		}).success(function(data) {
			this.discos = data;
			return {'data':data};
		});
		return promise;
	}*/
	this.insertDisco = function(ob){
		promise = $http({
			method: 'POST',
			url: url + 'discos',
			data:{data:ob.data, image:ob.image}
		}).success(function(msg) {
			console.log('Disco has been inserted')	
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
			console.log('amo a vé2Disco has been updated')	
			//discos = data;
			//return {'data':data};
			return msg.data;
		});
		return promise;
		//Publico un post para actualizar
	}
	/*
	this.getDiscosList = function(){
		console.log(discos)
		return data['discos'];
	}*/
	this.getData = function(origin){
		return base_data[origin];
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
			$scope.data = dataService.getData($scope.originData);
		    $scope.d = dataService.getList($scope.originData);
		   	console.log('data list population', dataService.getList($scope.originData));
			$scope.selected = null;//Selected field array id

			$scope.getSelectedData = function(){
				if($scope.selected!=null)return $scope.data[$scope.selected];
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
		require: '^datalist',
		scope: {
	      ngModel: '='
	    },
		templateUrl: 'partials/ob-editor.html',
		controller:['$scope', '$http', 'dataService', function($scope, $http, dataService){
			$scope.user = {_id:'', name:'', email:'', vip:[]};
			$scope.vip = $scope.user.vip;
			$scope.insert = function(user,action){
				console.log(action, $scope.user);
				if(action=='save'){
					console.log('inserting:', $scope.user);
					dataService.insertDisco({data:$scope.user, image:$scope.user.image}).then(function(res){
						$scope.$parent.d.push({_id:res.data._id, name:res.data.name, email:res.data.email});
						$scope.user._id = res.data._id;
						$('#fileupload').fileupload({
							formData: {id:res.data._id,type:'disco'}
						})
						//$($scope.$element).children().children('img').attr('src', 'uploads/disco/'+scope.$parent.getSelectedData()._id+'.jpg');
					});
				}else if(action=='update'){
					$scope.user.vip = $scope.vip;
					console.log('update', $scope.user);

					dataService.updateDisco({data:$scope.user})
				}
			}
			$scope.reset = function(){
				$scope.user = {_id:'', name:'', email:''};
				$scope.vip =  [];
				$('div[origin="discos"] img').attr('src','');
				$('input').val('');
				$('#fileupload').fileupload({
					formData: {id:$scope.user._id,type:'disco'}
				})
			}
			$scope.setData =function(ob){
				console.log('setdata',this);
				var id=$scope.user._id;
				//console.log(ob);
				//$scope.user = ob;
				$scope.$parent.selected = $scope.$parent.getSelectedId();
				$scope.$apply(function () {
					var newdata = $scope.$parent.getSelectedData();
					$scope.user = newdata; 
					//triigeo change en hidden
					//nono va en el linkin
					console.log($scope);
					$($scope.element).children('input[type="hidden"]').trigger('change');
					$scope.vip = newdata.vip;
			    });
			    $('#fileupload').fileupload({
					formData: {id:id,type:'disco'}
				})
			}
			$scope.reset()
			$scope.log = function(data){
				console.log(data);
			}
		}],
		link:function(scope, element, attrs){
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
					$(element).children().children('input[type="hidden"]').trigger('change');
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
})
.directive('genericOb', function(){
	return{
		restrict:'A',
		require: '^datalist',
		scope: {
	      ngModel: '='
	    },
	    templateUrl: 'partials/genericObEditor.html',
		controller:['$scope', '$http', 'dataService', function($scope, $http, dataService){
			//$scope.vip = [{item:'', price:''}];
			$scope.vip = [{item:'', price:''}];
			$scope.$watch('vip', function(val){
				$scope.$parent.vip = $scope.vip;
				console.log('change', val, $scope.vip, $scope.$parent.vip);
			},true)
			$scope.reset = function(){
				//$scope.user = {_id:'', name:'', email:''};
				$scope.vip = [{item:'', price:''}];
				/*
				$scope.$apply(function(){
					$scope.vip = [{item:'', price:''}];
				})
				*/
			}
			$scope.pushNew = function(){
				$scope.vip.push({item:'', price:''});
			}
			$scope.popItem = function(ind){
				$scope.vip.splice(ind,1);
			}
			$scope.setData = function(){
				$scope.$apply(function(){
					var newdata = $scope.$parent.getSelectedData();
					$scope.vip = newdata.vip;
				});
			}
			$scope.log = function(data){
				console.log(data);
			}
			$scope.reset();
		}],
		link:function(scope, element, attrs){
			$(element).parent().children('table').children('tbody').children('tr').bind('click',  function(e){
				console.log('trololo');
				scope.setData();
			});

			//objectEditorCtrl.user.vip = scope.vip;
			//scope.vip = 
			//console.log($(element).parent().children('input[type="hidden"]'));
			//$(element).parent().children('input[type="hidden"]').bind('change', function(e){
				
				//scope.vip = e.target.ngModel;
				//console.log('link', e, scope, '...');
				//paso el vip del padre al scope
			//})
		}
	}
});