var GlobalVar = {
    limit: 10,
    offset: 0,
    endOfChars: 0,
    totalPages: 0
};


angular.module('marvellControllers', [])
    .controller('CharacterListCtrl', function($scope, marvelRequest, $window, $routeParams) {
		$scope.message = "";
        var navCount = $routeParams.navigate;
        if (navCount != undefined) {
            navCount = navCount.replace(':', '');
            navCount = parseInt(navCount);
            if ((!isNaN(navCount))) {
                var newOffset = navCount - 1;
                if (newOffset === 0) {
                    $window.GlobalVar.offset = 0;
                } else {
                    if ($window.GlobalVar.offset >= $window.GlobalVar.endOfChars) {
                        //do nothing
                    } else {
                        $window.GlobalVar.offset = newOffset * $window.GlobalVar.limit;
                    }
                }
            }
        }
        console.log($window.GlobalVar.offset);
        console.log($window.GlobalVar.limit);

        marvelRequest.charList($window.GlobalVar.offset, $window.GlobalVar.limit).then(function(result) {

            if (result == undefined) {
				$scope.message = "Marvell is Not responding";
            } else {
                $window.GlobalVar.endOfChars = result.data.total;

                $window.GlobalVar.totalPages = result.data.total % $window.GlobalVar.limit;

                var id = [];

                for (var i = 1; i <= $window.GlobalVar.totalPages; i++) {
                    id.push(i);
                }

                $scope.total = id;

                var len = result.data.limit;
                var characters = [];
                for (var i = 0; i < len; i++) {
                    var character = {
                        name: result.data.results[i].name,
                        description: result.data.results[i].description,
                        id: result.data.results[i].id
                    };
                    characters.push(character);
                }
                console.log(characters);
                $scope.characters = characters;
            }
        }, function(error) {
            console.error('uh oh: ', error); // 'uh oh: something bad happened’
        });
    })

.controller('CharacterDetailCtrl', function($scope, marvelRequest, $routeParams) {

    var charID = $routeParams.characterID;
    marvelRequest.charDetail(charID).then(function(result) {
        var coreData = result.data.results[0];
        var character = {
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


})