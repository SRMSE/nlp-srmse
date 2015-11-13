var regex=require('../../regexes');
var app={
	"query":"",
	"break":[],
	"get":function(source){
		var dic={};
		dic["query"]=source;
		dic["break"]=[];
		while(m=regex.store.bullets.exec(dic["query"])){
			//for detecting bullets
					var t=[];
					var ind,l;
					if(m[0][0]===" "){
						ind=m.index+1;
						l=m[0].length-1;
					}
					else{
						ind=m.index;
						l=m[0].length;
					}
					t.push(ind);//starting index
					t.push(ind+l);//end index
					var blanks=m[0].replace(/./g,'#');
					dic["query"]=dic["query"].replace(m[0],blanks);
					dic[m[0].trim()]=t;
					if(ind>1){
						dic["break"].push(ind-1);//to break at bullets.
					}
					
			}
		app.query=dic["query"];
		app["break"]=dic["break"];
		delete dic["break"];
		delete dic["query"];
		return dic;
	},
	"new_query":function(){
		return app.query;
	},
	"getBreak":function(){
		return app["break"];
	}
};
exports.init=app;