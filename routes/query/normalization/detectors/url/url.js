var regex=require('../../regexes');
var app={
	"query":"",
	"get":function(source){
		app.query="";//reset
		var dic={};
		dic["query"]=source;
		while(m=regex.store.url.exec(dic["query"])){
				//for detecting urls
				if(m[0][m[0].length-1]==="."){
					//if url ends in dot
					m[0]=m[0].substring(0,m[0].length-1);
				}
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
