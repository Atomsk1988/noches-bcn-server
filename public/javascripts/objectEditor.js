var objectEditor = angular.module('objecteditor', ['ngRoute'])
.directive('objecteditor', function(){
	return{
		restrict:'A',
		//replace:'true',
		templateUrl: 'partials/ob-editor.html',
		//require: '^datalist',
		/*scope: {
	      originData: '=origin'
	    },*/
		controller:['$scope', '$http', function($scope, $http){
			/*
			$scope.user = {_id:'', name:'', email:''};
			$scope.selected = null;
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
				console.log($scope);
				$scope.$apply(function () {
					console.log($scope.$parent)
					//$scope.$parent.selected = $scope.$parent.getSelectedId();
					var newdata = $scope.getSelectedData();
					$scope.user = newdata; 
					$scope.vip = newdata.vip;
			    });
				$($scope.element).children('input[type="hidden"]').trigger('change');
			    $('#fileupload').fileupload({
					formData: {id:id,type:'disco'}
				})
			}
			$scope.getSelectedData = function(){
				var dataob =  dataService.getData('discos',$scope.$parent.selected);
				return dataob;
			}
			$scope.reset()
			$scope.log = function(data){
				console.log(data);
			}
			$scope.updateData = function(){
				console.log('change');
				dataService.setData('discos',   $scope.selected);
			}
			$scope.setSelected = function(id){
				$scope.$apply(function () {
					$scope.selected = id;
				});
			}
			$scope.$watch('selected', function(newVal) {
				if(newVal!=null)$scope.user =  dataService.getData($scope.originData, $scope.selected);
			});
			$scope.$watch('user', function(newUser) {
				console.log($scope.user);
				if(newUser._id !=''){
					console.log('change!', newUser, $scope.user);
					//dataService.setData('disco', $scope.$parent.selected);
				}
			});
			*/
		}],
		link:function(scope, element, attrs){
			/*
			rootScope = element.parent().parent().scope();
			root = $(element).parent().parent()[0];
			var tbody = $(root).children('table').children('tbody')[0];
			
			console.log('ObEditor link', scope, scope.$parent)
			$(tbody).on('click',  function(e){
				tbody1 = $(e.target).parent().parent();
				//console.log(tbody1);
				$(tbody1).children('tr.table_highlight').removeClass('table_highlight');
			
				if(e.currentTarget==$(tbody1).children('tr.table_highlight')[0]){
					scope.reset();
				}else{
					$(e.target).parent().addClass('table_highlight');
					//data = scope.getSelectedData()
					//scope.setSelected($('.table_highlight').attr('id').substr(6));
					scope.setSelected($('.table_highlight').attr('id').substr(6));

					//scope.setData(data);
					$(element).children().children('input[type="hidden"]').trigger('change');
					$(element).children().children('img').attr('src', 'uploads/disco/'+data._id+'.jpg');
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
			*/
		}
	}
})