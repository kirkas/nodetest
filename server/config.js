module.exports = function(){
	
		var production = {
			directory: '/app-build/',
			port:4000,
			db:'production',
			env:'production'
		};
		
		var developement = {
			directory: '/app/',
			port:5000,
			db:'development',
			env:'development'
		};
	
		switch(process.env.NODE_ENV){
				case 'development':
						console.log("server is in developement environmment");
						return developement;

				case 'production':
						console.log("server is in production environmment");
						return production;

				default:
						console.log("no specify environmment (default: development)");
						return developement;
		}
};