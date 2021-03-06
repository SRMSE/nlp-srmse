var regex=require('../../regexes');
var app={
	"query":"",
	"get":function(source){
		var dic={};
		dic["query"]=source;
		while(m=regex.store.email.exec(dic["query"])){
					//for detecting emails
					//replace emails to blank in this search to avoid getting their periods
					var t=[];
					t.push(m.index);//starting index
					t.push(m.index+(m[0].length-1));//end index
					var blanks=m[0].replace(/./g,'#');
					dic["query"]=dic["query"].replace(m[0],blanks);
					dic[m[0].trim()]=t;
				}
		app.query=dic["query"];
		delete dic["query"];
		return dic;
	},
	"new_query":function(){
		return app.query;
	}
};
exports.init=app;