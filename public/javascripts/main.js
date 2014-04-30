/*
$('#fileupload').fileupload({
    url: '/imageUpload',
    type: 'POST',
    singleFileUploads: true,
	formData: {id:$scope.data['discos'][$scope.selected_disco]._id,type:'disco'},
	done: function(e,data){
		$(e.target).parent().children('img').attr('src','.'+data.result.substr(8));
	}
});

*/