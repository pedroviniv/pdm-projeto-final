var app = angular.module('bellasharing.services', []);

app.service('bCategories', function($http) {
	var baseUrl = 'http://1v00r02n.service.ag-simplesebellas.appspot.com/query/nozip';
	var categoriesResource = '/categories';

	this.list = function(successCallback) {
		requestCategories(function(data) {
			successCallback(data);
		});
	}

	function requestCategories(callback) {
		var full = baseUrl + categoriesResource;
		console.log("URL: " + full);
		$http.get(full).then(function(result) {
			callback(result.data);
		},
		function(result) {
			return null;
		});
	}
});

app.service('bPostings', function($http) {

	var baseUrl = 'http://1v00r02n.service.ag-simplesebellas.appspot.com/query/nozip';
	var postingsResource = '/postings/';
	var itemsPerRequest = 20;

	this.list = function(limit, successCallback) {

		var result = [];
		var size = Math.ceil(limit/itemsPerRequest);

		var venqueuer = new Venqueuer();
		venqueuer.createQueue("postingsRequests", function() {
			successCallback(result);
			console.log("postingsRequests ended!");
		});
		
		for(let i = 0; i < size; i++) {
			let offset = i*itemsPerRequest;
			venqueuer.enqueue("postingsRequests", requestPostings, {

				offset: offset,
				callback: function(data) {
					let itemsLeftQty = 20;
					let finalResultQty = offset + itemsPerRequest;
					if(finalResultQty > limit) {
						itemsLeftQty = limit - offset;
					}
					result = result.concat(data.slice(0,itemsLeftQty));
				}
			});
		}

		venqueuer.trigger("postingsRequests");
	}

	function requestPostings(offset, callback) {
		var full = baseUrl + postingsResource + offset;
		console.log("URL: " + full);
		$http.get(full).then(function(result) {
			callback(result.data);
		},
		function(result) {
			return null;
		});
	}

});

app.service('bStorage', function() {

	this.get = function(storageItemName) {
		var storage = window.localStorage;
		var items = storage.getItem(storageItemName);
		if(!items) return [];
		return JSON.parse(items);
	}

	this.update = function(storageItemName, newJsonContent) {
		var storage = window.localStorage;
		storage.setItem(storageItemName, newJsonContent);
	}

});