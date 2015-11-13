var regex=require('../../regexes');
var app={
	"query":"",
	"get":function(source){
		app.query="";//reset
		var dic={};
		dic["query"]=source;
		//have to complete
		app.query=dic["query"];
		delete dic["query"];
		return dic;
	},
	"new_query":function(){
		return app.query;
	}
};
exports.init=app;