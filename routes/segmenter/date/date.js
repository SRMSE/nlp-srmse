var app={};
var reg=require("./regexes");
app.init=function(query){
		var m;
		var dic={};
		var li=[];
		var startin=[];
		var endin=[];
		while(m=reg.store.num_date_format.exec(query))
		{
			dic[m[0]]=[m.index,m.index+m[0].length]
		}
		console.log(dic);
		return dic
};
exports.date=app;
