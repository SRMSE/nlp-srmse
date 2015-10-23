var app={};
var reg=require("./regexes");
app.init=function(query){
		var m;
		var q=query;
		var dic={};
		while(m=reg.store.currency.exec(q))
		{
			dic[m[0]]=[m.index,m.index+m[0].length];
			var re=new RegExp(m[0],'g');
			var mask=m[0].replace(/./g,'#');
			q=q.replace(re,mask);
		}
		dic["query"]=q;
		return dic;
};
exports.currency=app;