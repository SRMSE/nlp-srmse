/* Main entry file for sentence segmenter
*/
//app definations
var regex=require('./regexes');
var app={};//app functions
var test_output="";
function test(d){
	test_output=test_output+"<br>"+d;
}
function main(req,res){
	console.log(req.query.q);
	app.text=req.query.q;
	app.periods=app.util.locate_periods(app.text);
	app.acc=app.util.locate_acc(app.text);
	test("found abbr  :"+JSON.stringify(app.acc));
	test("total periods found :"+JSON.stringify(app.periods));
	app.filter_abbr();
	test("final abbr periods   :"+JSON.stringify(app.periods));
	app.segmenter();
	test(JSON.stringify(app.segments));
	res.send(test_output);
	res.end();
};
function sentence_main(req,res){
	test_output="";//clear output on browser

	app.text="";//will store the input given by user
	app.acc={};//stores acc location:String
	app.util={};//stores util functions
	app.rules={}; //will stores rules for various parsing
	app.abbr_periods=[];//buckets used for removing unecessary periods
	app.periods={};
	app.segments=[];

	app.util.locate_acc=function(source){
		var dic={};
		//acronyms are short hand from starting char of each words
		//can be U.S.A or USA
		var m;
		while(m=regex.store.acc.exec(source)){
			dic[m.index]=m[0].trim();
			var d;
			var ree=/\./g;
			while(d=ree.exec(m[0].trim())){
				app.abbr_periods.push(m.index+d.index);//keeping tracks of dots between an abbr
			}
			
		}
		return dic;
	};


	app.util.locate_periods=function(source){
	  var result = {};
	  var find=".";
	  for(i=0;i<source.length; ++i) {
	    // If you want to search case insensitive use 
	    // if (source.substring(i, i + find.length).toLowerCase() == find) {
	    if (source.substring(i, i + find.length) == find) {
	      result[i]="";
	    }
	  }
	  return result;
	};


	app.util.locate_last_words=function(indexes){
	var words=[];
	for (var i = 0; i < indexes.length; i++) {
		var location=indexes[i];
		var charc=app.text[--location];
		var w="";
		while(charc && charc!==" "){//undefined when begining of para covers spaces also
			w=charc+w;
			charc=app.text[--location];
		}
		words.push(w);
	};
	return words;


	};

	app.filter_abbr=function(){
		//removes those periods which are part of abbr
		for (var i = 0; i < app.abbr_periods.length; i++) {
			//for abbr starting at para start
			//ex   St. Michael's Church is on 5th st. near the light.
			if(app.abbr_periods[i]<5){
				delete app.periods[app.abbr_periods[i]];
				continue;
			}


			//to skip things like
			//Let's ask Jane and co. They should know.
			//["Let's ask Jane and co.", "They should know."]

			//but should not 

			//
			//I can see Mt. Fuji from here.
			var first=app.text[app.abbr_periods[i]];
			var temp=app.text[app.abbr_periods[i]+1];
			var tempp=app.text[app.abbr_periods[i]+2];
			if(temp!==undefined && temp===" " && first===first.toLowerCase() && tempp!==undefined && tempp===tempp.toUpperCase()){
				continue;
			}
			delete app.periods[app.abbr_periods[i]];
		};
		app.periods=Object.keys(app.periods);//converting to list now

	};

	app.acceptor=function(prev,next){
		//takes prev and next word of . then decides sentence boundary


	};
	app.segmenter=function(){
		var start=true;
		for (var i = 0; i < app.periods.length; i++) {
			if(start){
				app.segments.push(app.text.substr(0,app.periods[i]));
				if(app.periods.length===1){
					app.segments.push(app.text.substr((parseInt(app.periods[i])+1),app.text.length-1));
				}
				start=false;
			}
			else{
				var inc=app.periods[i+1];
				console.log(i);
				console.log(inc);
				if(inc!==undefined){
					app.segments.push(app.text.substr(app.periods[i],inc));
				}
				else{
					app.segments.push(app.text.substr(app.periods[i],app.text.length-1));
				}
				
			}
			
		};
	};

	main(req,res);
};

exports.sentence_segmenter=sentence_main;