dic={
	"1":function(li,reg,dic){
		for (var i = 0; i < li.length; i++) {
			if(!li[i][1])
				{
					var p=reg.store.months[li[i][2].toLowerCase()];
					var dd=li[i][4].replace(/-|\.|\s|,|\//g,"");
					if(li[i][5].length===2){
						li[i][5]=li[i][4]+li[i][5];
						dd="01";
					}
					if(dd.length===1){
						dd="0"+dd;
					}
					cod=dd+"/"+p+"/"+li[i][5];
					dic[li[i][0]].push(cod);
				}
			else
			{
				var a=li[i][1].trim().replace(/-|\.|\s|,|\/|th|st|rd|nd/gi,"");
				if(a.length===1){
					a="0"+a;
				}	
				var p=reg.store.months[li[i][2].toLowerCase()];
				if(li[i][4]){
					y=li[i][4]+li[i][5];
				}
				else{
					y=li[i][5];
				}
				cod=a+"/"+p+"/"+y;
				dic[li[i][0]].push(cod);
			}

		}
		return dic;
	},
	"2":function(li,reg,dic){
		for (var i = 0; i < li.length; i++) {
			if(li[i][25])
			{
				var p=reg.store.months[li[i][27].toLowerCase()];
				var d=li[i][22];
				if(d.length===1){
					d="0"+d;
				}
			}
			else
			{
				var p=reg.store.months[li[i][20].toLowerCase()];
				var d=li[i][16];
				if(d.length===1){
					d="0"+d;
				}
			}
			cod=d+"/"+p+"/"+"-1-1-1-1";
			dic[li[i][0]].push(cod);
		}
		return dic;
	},
	"6":function(li,reg,dic){
		for (var i = 0; i < li.length; i++) {
			if(li[i][1])
			{
				var cod=li[i][1]+"/"+li[i][3]+"/-1-1-1-1";
				dic[li[i][0]].push(cod);
			}
			else
			{
				var cod=li[i][6]+"/"+li[i][4]+"/-1-1-1-1";
				dic[li[i][0]].push(cod);
			}
		}
		return dic;
	}

}

exports.init=dic;