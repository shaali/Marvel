angular.module('marvellControllers', [])

.controller('CharacterListCtrl', function ($scope, marvelRequest) {
	marvelRequest.charList().then(function(result) {  // this is only run after $http completes
       		//console.log(result);
			var len = result.data.limit; 
			var characters = []; 
			for(var i=0; i< len; i++){
				var character = 
				{
					name: result.data.results[i].name, 
					description: result.data.results[i].description, 
					id: result.data.results[i].id 
				};
				characters.push(character);
			}
			console.log(characters);
			$scope.characters = characters;
       	});
})
	
.controller('CharacterDetailCtrl', function ($scope, marvelRequest, $routeParams) {
	
	var charID = $routeParams.characterID;
	marvelRequest.charDetail(charID).then(function(result) {  
		var coreData = result.data.results[0];
       		var character = 
			{
				name: coreData.name, 
				imgSrc: coreData.thumbnail.path + "." + coreData.thumbnail.extension,
				description: coreData.description, 
				id: coreData.id, 
				comics: coreData.comics.collectionURI, 
				series: coreData.series.collectionURI, 
				stories: coreData.stories.collectionURI 
			}; 
			
			console.log(character);
			$scope.character = character;
       	});
	
	
});