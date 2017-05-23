var Schedulable = function(func, args, self){

	return function(callback){
		func.apply(self, arrayFromObj(args, callback) );
	};


	function arrayFromObj(obj, callback){
		var i = 0;
		var p;
		var arr = [];
		for( p in obj ){

			if( !isCallback(p) ){
				arr[i++] = obj[p];
			}
		}

		return arr;


		function isCallback(p){
			if(p == 'callback'){
				arr[i++] = (function(){

					var args = Array.prototype.slice.call(arguments);
					callback(function(){
						obj.callback.apply(obj, args);
					});
				});
				return true;
			}
			else{
				return false;
			}
		}


	}

};