var regexes=require('./regexes');
console.log(regexes.store);
var app={
	"init":function(query){
		console.log("from unit "+query);
	}
};
exports.get=app.init;

/*
sample output
{
	"15km":[25,29],
	"15mm":[29,31],
	"query":"i walked ##### and digged ####."
}

*/

