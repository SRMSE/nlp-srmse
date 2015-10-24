dic={
	"1":function(li,reg,dic){
		for (var i = 0; i < li.length; i++) {
			if(!li[i][1])
				{
					if(!li[i][6])
					{
						var p=reg.store.months[li[i][2].toLowerCase()];	
						var dd=li[i][5].replace(/-|\.|\s|,|\//g,"");
						cod=dd+"/"+p+"/-1-1-1-1";
						dic[li[i][0]].push(cod);
					}
					else
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
			if(li[i][1] && li[i][2] && li[i][3])
			{
				var p=reg.store.months[li[i][3].toLowerCase()];
				var d=li[i][1];
			}
			if(li[i][10] && li[i][11] && li[i][12])
			{
				var p=reg.store.months[li[i][12].toLowerCase()];
				var d="0"+li[i][10];
				
			}
			if(li[i][5] && li[i][6] && li[i][7] && li[i][8])
			{
				var p=reg.store.months[li[i][8].toLowerCase()];
				var d=li[i][5];
			}
			if(li[i][14] && li[i][15] && li[i][16] && li[i][17])
			{
				var p=reg.store.months[li[i][17].toLowerCase()];
				var d="0"+li[i][14];
			}
			cod=d+"/"+p+"/"+"-1-1-1-1";
			dic[li[i][0]].push(cod);
		}
		return dic;
	},
	"3":function(li,reg,dic){
		for (var i = 0; i < li.length; i++) {
			if(li[i][4])
			{
				var a=li[i][0];
				a=a.split(li[i][4]);
				if(a[0].length===1){
					a[0]="0"+a[0];
				}
				if(a[1].length===1){
					a[1]="0"+a[1];
				}
				cod=a[0]+"/"+a[1]+"/"+a[2];
				dic[li[i][0]].push(cod);
			}
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
	"5":function(li,reg,dic){
		for (var i = 0; i < li.length; i++){
			if(li[i][1] && li[i][2] && li[i][3] && li[i][4] && li[i][5])
			{
				cod=li[i][5]+"/"+li[i][3]+"/"+li[i][1];
				dic[li[i][0]].push(cod);
			}
			if(li[i][6] && li[i][7] && li[i][8] && li[i][9] && li[i][10])
			{
				cod="0"+li[i][10]+"/"+li[i][8]+"/"+li[i][6];
				dic[li[i][0]].push(cod);
			}
			if(li[i][11] && li[i][12] && li[i][13] && li[i][14] && li[i][15])
			{
				cod=li[i][15]+"/0"+li[i][13]+"/"+li[i][11];
				dic[li[i][0]].push(cod);
			}
			if(li[i][16] && li[i][17] && li[i][18] && li[i][19] && li[i][20])
			{
				cod="0"+li[i][20]+"/0"+li[i][18]+"/"+li[i][16];
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