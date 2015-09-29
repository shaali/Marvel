marvellApp.factory('marvelRequest', function($http) {
	var publicKey = "4802a3b9f729e0b1711fc5f7cba2c714";
	var privateKey = "978b55c3f6be4629f628114b7799bd33f0f29cbd";
	
	var baseUrl = "https://gateway.marvel.com:443/v1/public/";
	var charList = function() {
		var myUrl = baseUrl + "characters/?" + addApiHash();
		return $http.get(myUrl).then(function(result){
			var data = result.data;
        	console.log(data);
			return data;
        });
    };
	var charDetail = function(characterId) {
		var myUrl = baseUrl + "characters/" + characterId + "?" + addApiHash();
		return $http.get(myUrl).then(function(result){
			var data = result.data;
        	console.log(data);
			return data;
        });
    };
	
	var addApiHash = function(){
		var timeStamp = Math.floor(Date.now() / 1000);
		return "ts="+ timeStamp +"&apikey=" + publicKey + "&hash=" + CryptoJS.MD5(timeStamp+privateKey+publicKey);
	}
    return { charList: charList, charDetail: charDetail };
});