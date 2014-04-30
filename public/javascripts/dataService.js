var dataService = angular.module('dataService', ['ngRoute'])
.service('dataService', ['$http',  function($http) {

	var offline = true;
	if(offline){
		var url = 'http://localhost:3000/';
	}else{
		var url = 'http://thawing-savannah-4527.herokuapp.com/';

	}
	//this.base_data = [];
	//this.base_data['discos'] = [];
	//var base_data = [];
	//base_data['discos'] = [];
	//base_data['parties'] = [];
	this.getDiscosServ = function(){
		promise = $http({
			method: 'GET',
			url: url + 'discos'
		}).success(function(data) {
			this.discos = data;
			return {'data':data};
		});
		return promise;
	}
	/*
	function setData(data){
		console.log('fuu')
		this.base_data = data;
		console.log(this.base_data);

	}
	*/
	//console.log(base_data);
	
	/*
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
	*/
	/*
	this.getDiscosList = function(){
		console.log(discos)
		return data['discos'];
	}*/
	/*
	this.getData = function(origin, ind){
		console.log(base_data,'3');
		
		//this.getDbdata();
		//console.log('recall');
		if(ind!=null){
			data = base_data[origin][ind];
		}else{
			data = base_data[origin];
		}
		//console.log(base_data);
		data = base_data['discos'];//just for test pruposes
		return data;
	}
	*/
	/*
	this.change_detected = false;
	this.needUpdate = function(){
		if(this.change_detected){return true}else{return false};
	}
	this.setData = function(origin, ind){
		//$scope.$apply(function () {
			base_data[origin][ind];
			change_detected = true;
			console.log('lho');
		//});
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
	*/
	//
}])