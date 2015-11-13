var app={};
var reg=require("../../regexes");
app.init=function(query){
		var m;
		var flag=0;
		var q=query;
		var li=[];
		var dic={};
		while(m=reg.store.blood_groups.exec(q))
		{
			dic[m[0]]=[m.index,m.index+m[0].length,"Blood Group"];
			var mask=m[0].replace(/./g,'#');
			q=q.replace(m[0],mask);
		}
		while(m=reg.store.punc.exec(q))
		{
			if(m[0].trim()==="GMT+"){
				//ignore time zones
				continue;
			}
			if(q[m.index]===" "){
				//if space is matched
				m.index=m.index+1;
				m[0]=m[0].substring(1);
			}
			dic[m[0]]=[m.index,m.index+m[0].length,"Punctuator"];
			li.push(m);
			var mask=m[0].replace(/./g,'#');
			q=q.replace(m[0],mask);
			flag=1;
		}
		if(flag===1)
		{
				for (var i = 0; i < li.length; i++) {
					if(li[i][3])
					{
						dic[li[i][0]].push("+");
					}
					if(li[i][5])
					{
						dic[li[i][0]].push("@");
					}
					if(li[i][6])
					{
						dic[li[i][0]].push("#");
					}
					if(li[i][7])
					{
						dic[li[i][0]].push('"');
					}
				}
		}
		while(m=reg.store.search_operator.exec(q))
		{
			var j=m[0].split(":")[0];
			dic[m[0]]=[m.index,m.index+m[0].length,"Search Operator",j];
			var mask=m[0].replace(/./g,'#');
			q=q.replace(m[0],mask);
		}
		console.log(q);
		dic["query"]=q;
		return dic;
};
exports.special_search=app;