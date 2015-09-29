angular.module('marvellControllers', [])

.controller('CharacterListCtrl', function ($scope, marvelRequest) {
	marvelRequest.charList().then(function(result) {  // this is only run after $http completes
       		
			
			
			
       	});
})
	
.controller('CharacterDetailCtrl', function ($scope, marvelRequest) {
	
});