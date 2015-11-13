var regex=require('../../regexes');
var app={
	"query":"",
	"get":function(source){
		app.query="";//reset
		var dic={};
		dic["query"]=source;
		while(m=regex.store.digits.exec(dic["query"])){
					//for detecting digits
					var t=[];
					var ind,l;
					ind=m.index;
					l=m[0].length;
					t.push(ind);//starting index
					t.push(ind+l);//end index
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
