var request=require('request');
var API_ADDRESS="http://localhost:3000";
var colors=require('colors');
var dic={
	"welcome at IIM banglore.Mr. tialk.":["/query/std","dic.detect.segments",["welcome at IIM banglore."," Mr. tialk."]]
};
var success_tests=0;
var done=0;
var total=Object.keys(dic).length;
function isEquivalent(a, b) {
	if (typeof a !== typeof b){
		return false;
	}
	if(typeof a==="number"){
		if(a===b){
			return true;
		}
		else{
			return false;
		}
	}
	else if(typeof a ==="string"){
		if(a===b){
			return true;
		}
		else{
			return false;
		}
	}
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}
var traverse_key=function(obj,key){
	var splits=key.split(".").slice(1);
	for (var i = 0; i < splits.length; i++) {
		obj=obj[splits[i]];
	};

	return obj;
};
function runTest(){
	for(var key in dic){
		var query=key;
		var url=API_ADDRESS+dic[key][0]+"?q="+encodeURI(key);
		verifyTest(url,dic[key][2],dic[key][1],function(success){
			if(success){
				success_tests+=1;
				console.log(("[SUCCESS] "+url).green);
			}
			else{
				console.log(("[FAIL] "+url).red);
			}
			done+=1
			if(done===total){
				console.log(("\n\n[RESULTS] Successfull "+success_tests+" Failed "+(total-success_tests)).yellow);
			}
		});
		
	}
}
var verifyTest=function(url,compare_obj,compare_key,fn){
	request.get(url,function(html,data){
		try{
				var js=JSON.parse(data.body);
				js=traverse_key(js,compare_key);
				console.log(js);
				if(isEquivalent(js,compare_obj)){
					fn(true);
				}
				else{
					fn(false);
				}
		}catch(err){
			console.log(err);
				fn(false);
		}

	});
};
runTest();