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
	"4":function(li,reg,dic){
		for (var i = 0; i < li.length; i++) {
			if(li[i][1] && li[i][2] && li[i][3])
			{
				cod=li[i][1]+"/"+li[i][2]+"/"+li[i][3];
				dic[li[i][0]].push(cod);
			}
			if(li[i][4] && li[i][5] && li[i][6])
			{
				cod="0"+li[i][4]+"/"+li[i][5]+"/"+li[i][6];
				dic[li[i][0]].push(cod);
			}
			if(li[i][7] && li[i][8] && li[i][9])
			{
				cod=li[i][9]+"/"+li[i][8]+"/"+li[i][7];
				dic[li[i][0]].push(cod);
			}
			if(li[i][10] && li[i][11] && li[i][12])
			{
				cod="0"+li[i][12]+"/"+li[i][11]+"/"+li[i][10];
				dic[li[i][0]].push(cod);
			}
			if(li[i][13] && li[i][14])
			{
				cod="01/"+li[i][13]+"/"+li[i][14];
				dic[li[i][0]].push(cod);
			}
			if(li[i][15] && li[i][16] && li[i][17])
			{
				cod=li[i][15]+"/"+li[i][16]+"/"+li[i][17];
				dic[li[i][0]].push(cod);
			}
			if(li[i][18] && li[i][19] && li[i][20])
			{
				cod="0"+li[i][15]+"/"+li[i][16]+"/"+li[i][17];
				dic[li[i][0]].push(cod);
			}
			if(li[i][21])
			{
				cod="01/01/"+li[i][21];
				dic[li[i][0]].push(cod);
			}
			if(li[i][22] && li[i][23])
			{
				cod="01/"+li[i][22]+"/"+li[i][23];
				dic[li[i][0]].push(cod);
			}
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