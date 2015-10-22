var app={};
var reg=require("./regexes");
app.init=function(query){
		var m;
		var q=query;
		var dic={};
		var li=[];
		var startin=[];
		var endin=[];
		while(m=reg.store.num_date_format.exec(q))
		{
				dic[m[0]]=[m.index,m.index+m[0].length]
				var re=new RegExp(m[0],'g');
				var mask=m[0].replace(/./g,'#');
				q=q.replace(re,mask);
		}
		while(m=reg.store.constant_num_date_format.exec(q))
		{
				dic[m[0]]=[m.index,m.index+m[0].length]
				var re=new RegExp(m[0],'g');
				var mask=m[0].replace(/./g,'#');
				q=q.replace(re,mask);
		}
		while(m=reg.store.reverse_date_format.exec(q))
		{
				dic[m[0]]=[m.index,m.index+m[0].length]
				var re=new RegExp(m[0],'g');
				var mask=m[0].replace(/./g,'#');
				q=q.replace(re,mask);
		}
		while(m=reg.store.mmdd_date_format.exec(q))
		{
				dic[m[0]]=[m.index,m.index+m[0].length]
				var re=new RegExp(m[0],'g');
				var mask=m[0].replace(/./g,'#');
				q=q.replace(re,mask);
		}
		console.log(dic);
		return dic;
};
exports.date=app;
