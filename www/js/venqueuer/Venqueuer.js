var Venqueuer = function(){

	var queues = {};

	this.createQueue = function(name, complete){
		queues[name] = new Enqueuer(complete);
	};

	this.enqueue = function(name, func, args){

		var schedulable;

		if(queues[name] !== undefined){
			
			var self = null;
			if(args.self){
				self = args.self;
			}

			if(!args.callback){
				args.callback = function(){};
			}

			schedulable = new Schedulable(func, args, self );
			
			queues[name].enqueue( schedulable );

		}
		else{
			throw {err:"The queue named " + name + " doesn't exist!"};
		}

	};


	this.trigger = function(name){

		if(queues[name] !== undefined){
			queues[name].start();
		}
		else{
			throw {err:"The queue named " + name + " doesn't exist!"};
		}

	};


};