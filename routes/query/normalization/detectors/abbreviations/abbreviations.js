var regex=require('../../regexes');
var corpus=require('../../../util/corpus/corpus').corpus;
var app={
	"query":"",
	"get":function(source){
		var dic={};
		dic["query"]=source;
		dic["abbr_periods"]=[];
		while(m=regex.store.acc.exec(dic["query"])){
			if((m[0][m[0].trim().length-1]==="." && m[0].match(/\./g).length===1) && corpus.isStopWord(m[0].replace(/\./g,""))){
				//finding cases like you. I etc
				continue;
			}
			
			if(m[0][0]===" "){
				//javascript regexes do no support look behinds
				//need to change regex for regexes starting with space
				//will see later
				m.index=m.index+1;
				m[0]=m[0].substring(1);
			}
		
			dic[m.index]=m[0].trim();
			
			var temp=m[0].trim();
			var blanks=temp.replace(/./g,"#");
			dic["query"]=dic["query"].replace(temp,blanks);

			var d;
			var ree=/\./g;
			while(d=ree.exec(m[0].trim())){
				
				var t=[];
				var ind;
				if(m[0][0]===" "){
					//javascript regexes do no support look behinds
					//need to change regex for regexes starting with space
					//will see later
					t.push(m.index+d.index+1);
					ind=m.index+d.index+1;
				}
				else{
					t.push(m.index+d.index);
					ind=m.index+d.index;
				}
				t.push(m[0].trim());
				if(dic["query"][ind-1]===" " || dic["query"][ind+1]===" " || dic["query"][ind-1]===undefined || dic["query"][ind+1]===undefined){
					//end period
					t.push(false);
				}
				else{
					t.push(true);
				}
				dic["abbr_periods"].push(t);//keeping tracks of dots between an abbr
			}
			
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
		