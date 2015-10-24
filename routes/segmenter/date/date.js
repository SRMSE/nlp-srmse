var app={};
var reg=require("./regexes");
var convert=require("./convert");
app.init=function(query){
		var m;
		var q=query;
		var dic={};
		var li=[];
		var startin=[];
		var endin=[];
		var flag=0;
		var cod;
		while(m=reg.store.word_month_date_format.exec(q))
		{
				dic[m[0]]=[m.index,m.index+m[0].length]
				li.push(m)
				console.log(m);
				var re=new RegExp(m[0],'g');
				var mask=m[0].replace(/./g,'#');
				q=q.replace(re,mask);
				flag=1;
		}
		try{
			dic=convert.init[flag](li,reg,dic);
			li=[];
		}
		catch(e){
		}	
		while(m=reg.store.word_month_without_year.exec(q))
		{
				dic[m[0]]=[m.index,m.index+m[0].length]
				li.push(m);
				var re=new RegExp(m[0],'g');
				var mask=m[0].replace(/./g,'#');
				q=q.replace(re,mask);
				flag=2;
		}
		try{
			dic=convert.init[flag](li,reg,dic);
			li=[];
		}
		catch(e){
		}
		while(m=reg.store.reverse_date_format.exec(q))
		{
				dic[m[0]]=[m.index,m.index+m[0].length]
				li.push(m);
				var re=new RegExp(m[0],'g');
				var mask=m[0].replace(/./g,'#');
				q=q.replace(re,mask);
				flag=5;
		}
		try{
			dic=convert.init[flag](li,reg,dic);
			li=[];
		}
		catch(e){
		}
		while(m=reg.store.num_date_format.exec(q))
		{
				dic[m[0]]=[m.index,m.index+m[0].length]
				li.push(m);
				//console.log(m);
				var re=new RegExp(m[0],'g');
				var mask=m[0].replace(/./g,'#');
				q=q.replace(re,mask);
				flag=3;
		}
		while(m=reg.store.constant_num_date_format.exec(q))
		{
				dic[m[0]]=[m.index,m.index+m[0].length]
				li.push(m);
				var re=new RegExp(m[0],'g');
				var mask=m[0].replace(/./g,'#');
				q=q.replace(re,mask);
				flag=4;
		}
		try{
			dic=convert.init[flag](li,reg,dic);
			li=[];
		}
		catch(e){
		}
		while(m=reg.store.mmdd_date_format.exec(q))
		{
				dic[m[0]]=[m.index,m.index+m[0].length]
				li.push(m);
				var re=new RegExp(m[0],'g');
				var mask=m[0].replace(/./g,'#');
				q=q.replace(re,mask);
				flag=6;
		}
		try{
			dic=convert.init[flag](li,reg,dic);
			li=[];
		}
		catch(e){
		}
		dic["query"]=q;
		return dic;
};
exports.date=app;
