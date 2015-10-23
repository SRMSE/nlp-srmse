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
	}
		
}

exports.init=dic;