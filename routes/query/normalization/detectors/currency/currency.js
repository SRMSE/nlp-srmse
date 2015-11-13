// program identifies currency in the given query and converts it into standard form
var app={};
var reg=require("../../regexes");
app.init=function(query){
		var m="";
		var x="";
		var mask1;
		var re;
		var flag=0;
		var q=query;
		var dic={};
		var money={"₡":"costa rica colon","r$":"brazil real","$":"united states dollar","kr":"denmark krone","r":"south africa rand","₩":"korean won","rp":"indonesia rupiah","€":"european euro","£":"pound","¥":"japanese yen","₹":"indian rupees","rm":"malaysia ringgit","руб":"russian ruble","฿":"thailand baht","rs":"indian rupees","lakhs":"00000","lakh":"00000","million":"000000","billion":"0000000","thousand":"000"};
		var nmoney=["dollars","dollar","pounds","pound","rupees","rupee","baht"];
		var tmoney=["lakhs","lakh","million","billion","thousand"];
		while(m=reg.store.currency.exec(q))
		{
			var re=new RegExp(m[0].replace(/\$/g,'\\$'),'g');;
			var mask=m[0].replace(/./g,'#');
			q=q.replace(re,mask);
			mask1=m[0];
			for (var i = 0; i < nmoney.length; i++) {       // match currency names
				if(m[0].indexOf(nmoney[i])!== -1)
				{	flag=1
					break;
				}
			};
			for (var i = 0; i < tmoney.length; i++) {      // replaces number names like lakhs etc
				if(m[0].indexOf(tmoney[i])!== -1)
				{
					mask1=mask1.replace(" "+tmoney[i],money[tmoney[i].toLowerCase()]);
					break;
				}
			};
			if(flag===0)
			{
				while(mp=reg.store.stform.exec(m[0]))      // match currency symbols
				{
					try{
						cn=money[mp[0].toLowerCase()];
						re1=new RegExp(mp[0].replace(/\$/g,'\\$'),'g');     // special case for $ replacement
						mask1=mask1.replace(re1,'');
						mask1=mask1+" "+cn;
						}catch(e){}
				}
			}
			if(mask1.search(",")!==-1)                     // comma replacement
			{
				while((indx=mask1.search(","))!== -1)
				{
					mask1=mask1.replace(/,/g,'');
				}
			}
			if ((mask1.indexOf(".")==0)||(mask1.indexOf(".")==1))    //remove the . from symbol
			{
				mask1=mask1.replace('.','');
			}
			dic[m[0]]=[m.index,m.index+m[0].length,mask1];
		}			
		dic["query"]=q;	
		return dic;
};
exports.currency=app;