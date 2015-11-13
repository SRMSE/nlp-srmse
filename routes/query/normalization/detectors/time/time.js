var regex=require('../../regexes');
var app={
	"query":"",
	"get":function(source){
		app.query="";//reset
		var dic={};
		dic["query"]=source;
		console.log(dic["query"]);
		while(m=regex.store.time.exec(dic["query"])){
				//for detecting urls
				console.log(m);
				var t=[];
				if(m[0][0]===" "){
					//fix for regex boundary
					m[0]=m[0].substring(1);
					m.index=m.index+1;
				}

				t.push(m.index);//starting index
				t.push(m.index+m[0].length);//end index
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
