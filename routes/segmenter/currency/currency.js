// program identifies currency in the given query and converts it into standard form
var app={};
var reg=require("./regexes");
app.init=function(query){
		var m="";
		var x="";
		var mask1;
		var re;
		var flag=0;
		var q=query;
		var dic={};
		var money={"₡":"costa rica colon","r$":"brazil real","$":"united states dollar","kr":"denmark krone","r":"south africa rand","₩":"korean won","rp":"indonesia rupiah","€":"european euro","£":"pound","¥":"japanese yen","₹":"indian rupees","rm":"malaysia ringgit","руб":"russian ruble","฿":"thailand baht"};
		var nmoney=["dollars","dollar","pounds","pound","rupees","rupee","baht"];
		while(m=reg.store.currency.exec(q))
		{
			var re=new RegExp(m[0],'g');
			var mask=m[0].replace(/./g,'#');
			q=q.replace(re,mask);
			for (var i = 0; i < nmoney.length; i++) {       // match currency names
				if(m[0].indexOf(nmoney[i])!== -1)
				{	mask1=m[0];
					flag=1
					break;
				}
			};
			if(flag===0)
			{
				while(mp=reg.store.stform.exec(m[0]))      // match currency symbols
				{
					try{
						cn=money[mp[0]];
						re1=new RegExp(mp[0].replace(/\$/g,'\\$'),'g');     // special case for $ replacement
						mask1=m[0].replace(re1,'');
						mask1=mask1+" "+cn;
						}catch(e){}
				}
			}
			if(mask1.search(",")!==-1)                     // comma replacement
			{
				while((indx=mask1.search(","))!== -1)
				{
					mask1=mask1.replace(',','');
				}
			}
			dic[m[0]]=[m.index,m.index+m[0].length,mask1];
		}			
		dic["query"]=q;	
		return dic;
};
exports.currency=app;