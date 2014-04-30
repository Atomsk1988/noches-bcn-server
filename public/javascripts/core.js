// public/core.js

var admin = angular.module('admin', ['ngRoute'])
.controller('adminController', ['$scope', '$http',   function($scope, $http){
	var offline = false;
	if(offline){
		var url = 'http://localhost:3000/';
	}else{
		var url = 'http://thawing-savannah-4527.herokuapp.com/';
	}
	$scope.data = [];
	$scope.data['discos'] = [];
	$scope.data['parties'] = [];
	$scope.list = [];
	$scope.list['discos'] = [];
	$scope.list['parties'] = [];
	$scope.selected_disco = 'nan';
	$scope.selected_party = 'nan';

	$scope.select_disco = function(ind){
		if($scope.selected_disco==ind){$scope.selected_disco='nan'}else{$scope.selected_disco=ind};
	}
	$scope.select_party = function(item){
		//$scope.data['fiestas'].indexOf({_id:ind});
		//console.log('llll', $scope.data['parties'].indexOf(item));
		var ind = $scope.data['parties'].indexOf(item);
		if($scope.selected_party==ind){$scope.selected_party='nan'}else{$scope.selected_party=ind};
	}
	$scope.setLists = function(list){
		$scope.list['discos'] = [];
		for(k in $scope.data['discos']){
			var ob = {_id:$scope.data['discos'][k]._id, name:$scope.data['discos'][k].name, email:$scope.data['discos'][k].email};
			$scope.list['discos'].push(ob);
		}	
	}
	$scope.getParties = function(){
		$http({
			method: 'GET',
			url: url + 'parties'
		}).success(function(data) {
			$scope.data['parties'] = data;
			$scope.setLists('discos');	
		});
	}
	$scope.getDiscos = function(){
		$http({
			method: 'GET',
			url: url + 'discos'
		}).success(function(data) {
			$scope.data['discos'] = data;
			$scope.setLists('discos');
		});
	}
	$scope.setItem = function(list, item){
		console.log(list, item);
		$http({
			method: 'POST',
			url: url + list,
			data:{data:item}
		}).success(function(data) {
			console.log('datasave result',data);
			if(data!=null){
				$scope.data[list].splice(-1,0,data);
			}
		});	
	}
	$scope.deleteItem = function(list, item){
		console.log(url + list+'/:'+item._id);
		$http({
			method: 'DELETE',
			url: url + list+'/:'+item._id,
		}).success(function(res) {
			var index = $scope.data[list].indexOf(item);
			console.log('datasave deletion result',index,item);
			//if(data!=null){

			$scope.data[list].splice(index,1);
				
			//}
		});	
	}
	$scope.$watch('data["discos"]', function(newVal) {
		console.log(newVal,$('#datalist table tbody tr').length,'ooOOoo');
		if($('#datalist table tbody tr').length<$scope.data['discos'].length){
			$scope.setLists('discos');
			console.log($('#datalist table tbody tr:last-child'));
			//$('#datalist table tbody tr:last-child').trigger('click');
		}else{
			$scope.setLists('discos');
		}
	});
	$scope.$watch('data["parties"]', function(newVal) {
		console.log(newVal);
		$scope.setLists('parties');
	});

	$scope.getDiscos();
	$scope.getParties();
}])
.controller('datalistController', ['$scope', '$http', '$filter', function($scope, $http, $filter){
	$scope.cols=['_id','name','email'];
	$scope.isInColsList = function(header){
		for(k in $scope.cols){
			if(header==$scope.cols[k])return true;
		}
		return false;
	}
	$scope.$watch('selected_disco', function(newVal) {
		console.log($scope.data['parties'], $scope.selected_disco,true);
		//$filter('filter')($scope.data['parties'], $scope.selected_disco,true);
	});
}])
.controller('objectEditorCtrl', ['$scope', '$http', function($scope, $http){
	//$scope.image_name = $scope.selectedItem._id+'.jpg';

	$scope.$watch('selected_disco', function(newVal) {
		console.log('nv', newVal);
		if(newVal!=null && newVal!='nan'){
			$scope.image_name = $scope.data['discos'][newVal]._id+'.jpg';
			$('#fileupload_disco').fileupload('option', 'formData', {id:$scope.data['discos'][$scope.selected_disco]._id,type:'disco'})
		}else{
			$scope.image_name = 'no_image.jpg';
		}
	});
	$('#disco_img').bind('click',function(e){
		$(e.target).parent().children('input[type="file"]').trigger('click');
	})
	$('#fileupload_disco').fileupload({
	    url: '/imageUpload',
	    type: 'POST',
	    singleFileUploads: true,
		done: function(e,data){
			$(e.target).parent().children('img').attr('src','.'+data.result.substr(8));
		}
	});
	$scope.addData = function(list){
		console.log('trololo');
		//$scope.data['discos'].push({_id:'', name:'no_name'});
		$scope.setItem(list, {_id:''});
	}
	$scope.popData = function(list){
		$scope.deleteItem(list, $scope.data[list][$scope.selected_disco]);
	}
	$scope.saveData = function(list){
		$scope.setItem(list, $scope.data[list][$scope.selected_disco]);
	}
}])
.controller('partieslistController', ['$scope', '$http', '$filter',  function($scope, $http, $filter){
	//$scope.image_name = $scope.selectedItem._id+'.jpg';
	$scope.cols=['disco_id','name','date'];
	$scope.viewlist = []

	$scope.isInColsList = function(header){
		for(k in $scope.cols){
			if(header==$scope.cols[k])return true;
		}
		return false;
	}
	/*$scope.$watch('selected_disco', function(newVal) {
		if(newVal!=null  && newVal!='nan'){
			console.log('refiltering');	
			//$filter('filter')($scope.data['parties'], {disco_id:$scope.data['discos'][newVal]._id}, true);
			//
		}
	});*/
}])
.controller('partiesObController', ['$scope', '$http', function($scope, $http){
	//$scope.image_name = $scope.selectedItem._id+'.jpg';
	$scope.main.active.tab = 'info';

	$scope.$watch('selected_disco', function(newVal) {
		console.log('nv', newVal);
		if(newVal!=null && newVal!='nan'){
			$scope.image_name = $scope.data['discos'][newVal]._id+'.jpg';
			
		}else{
			$scope.image_name = 'no_image.jpg';
		}
	});
	$scope.$watch('selected_party', function(newVal) {
		if(newVal!=null && newVal!='nan'){
				//$scope.data['parties'][newVal].disco_id = $scope.data['discos'][$scope.selected_disco]._id;
				console.log('Disco id', newVal,$scope.data['discos'][$scope.selected_disco]._id);
		}
	});

	$scope.addData = function(list){
		console.log('trololo');
		//$scope.data['discos'].push({_id:'', name:'no_name'});
		$scope.setItem(list, {_id:'', disco_id:$scope.data['discos'][$scope.selected_disco]._id});
	}
	$scope.popData = function(list){
		$scope.deleteItem(list, $scope.data[list][$scope.selected_disco]);
	}
	$scope.saveData = function(list){
		//console.log(list,$scope.selected_disco, $scope.data[list][$scope.selected_party]);
		$scope.setItem('parties', $scope.data[list][$scope.selected_party]);
	}
}])