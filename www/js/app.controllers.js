var app = angular.module("controllers", ['bellasharing.services']);

app.controller("decorationDetailCtrl", function($state, $scope, bStorage, $window) {
	
	$scope.selected = {};

	$scope.loadSelected = function() {
		$scope.selected = $state.params.selected;
	}

	$scope.goHome = function() {
		$state.go('home.decoracoes');
	}

	$scope.html = function(textHtml) {
		let parser = new DOMParser();
		return parser.parseFromString(textHtml, 'text/html');
	}

	$scope.addFavourite = function(posting) {
		saveFavouriteLocalStorage(posting);
		alert("A decoração " + posting.title + " foi salvo com sucesso à sua lista de favoritos!");
	}

	$scope.removeFavourite = function(posting) {
		removeFavouriteLocalStorage(posting);
		alert("A decoração " + posting.title + " foi removido da sua lista de favoritos!");
	}

	$scope.isFavourited = function(posting) {
		var favourites = bStorage.get('favouritePostings');
		var result = favourites.filter(function(currPosting) {
			return (posting.reference === currPosting.reference);
		});
		return result > '0';
	}

	function saveFavouriteLocalStorage(posting) {
		var favourites = bStorage.get('favouritePostings');
		favourites.push(posting);
		var json = JSON.stringify(favourites);
		bStorage.update('favouritePostings', json);
	}

	function removeFavouriteLocalStorage(posting) {
		var favourites = bStorage.get('favouritePostings');
		var newPostings = favourites.filter(function(currPosting) {
			return posting.reference != currPosting.reference;
		});
		var json = JSON.stringify(newPostings);
		bStorage.update('favouritePostings', json);
	}

	$scope.share = function(selected) {
		var photoUrl = selected.path;
		$window.photoSharing.share(photoUrl, function() {
			alert("A decoração " + selected.title + " foi compartilhada com sucesso!");
		}, function() {
			alert("Erro ao compartilhar decoração!");
		});
	}
});

app.controller("decoracoesCtrl", function($state, $http, $scope, bPostings, bCategories, bStorage) {

	// Scope variables
	$scope.postings = [];
	$scope.fullPostings = [];
	$scope.favourites = [];
	$scope.categories = [];


	$scope.loadPostings = function() {

		bPostings.list(50, function(data) {
			console.log("postings length:  " + data.length);
			$scope.fullPostings = data;
			$scope.postings = $scope.fullPostings;
		});

		bCategories.list(function(data) {
			$scope.categories = $scope.categories.concat(data);
		});
	}

	$scope.getPostingsByCategory = function(category) {
		return $scope.postings.filter(function(posting) {
			return (posting.category == category);
		});
	}

	$scope.hasSome = function(category) {
		var result = $scope.postings.filter(function(posting) {
			return (posting.category == category);
		});
		return result.length > '0';
	}

	$scope.open = function(posting) {
		$state.go('detalhes', {'selected': posting});
	}

	$scope.searchByName = function(name) {
		$scope.postings = $scope.fullPostings.filter(function(p) {
			return p.title.toLowerCase().indexOf(name.toLowerCase()) === 0;
		});
	}

	function requestPostings(offset, callback) {
		var full = baseUrl + postingsResource + offset;
		console.log(full);
		$http.get(full).then(function(result) {
			callback(result.data);
		},
		function(result) {
			return null;
		});
	}

	$scope.loadFavourites = function() {
		$scope.favourites = bStorage.get('favouritePostings');
	}

	$scope.goToFavourites = function() {
		$state.go('home.favoritos');
	}
});