/* Main entry file for sentence segmenter
*/
//app definations
var regex=require('./regexes');
var test_output="";
function test(d){
	test_output=test_output+"<br>"+d;
}
function sentence_main(req,res){
	var app={};//app functions
	test_output="";//clear output on browser

	app.text="";//will store the input given by user
	app.acc={};//stores acc location:String
	app.util={};//stores util functions
	app.rules={}; //will stores rules for various parsing
	app.abbr_periods=[];//buckets used for removing unecessary periods
	app.periods={};
	app.segments=[];
	app.ques=[];
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
				var t=[];
				t.push(m.index+d.index);
				t.push(m[0].trim());
				app.abbr_periods.push(t);//keeping tracks of dots between an abbr
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
	app.util.locate_ques=function(source){
	  var result = [];
	  var find="?";
	  for(i=0;i<source.length; ++i) {
	    // If you want to search case insensitive use 
	    // if (source.substring(i, i + find.length).toLowerCase() == find) {
	    if (source.substring(i, i + find.length) == find) {
	      result.push(i);
	    }
	  }
	  return result;
	};
	app.util.locate_exclamation=function(source){
	  var result = [];
	  var find="!";
	  for(i=0;i<source.length; ++i) {
	    // If you want to search case insensitive use 
	    // if (source.substring(i, i + find.length).toLowerCase() == find) {
	    if (source.substring(i, i + find.length) == find) {
	      result.push(i);
	    }
	  }
	  return result;
	};
	app.util.replace_double_punc=function(source){
	  	var m=regex.store.double_punc;
	  	app.text=source.replace(m,"?");
		
		
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
			if(app.abbr_periods[i][0]<5){
				delete app.periods[app.abbr_periods[i][0]];
				continue;
			}


		
			var temp=app.text[app.abbr_periods[i][0]+1];
			var tempp=app.text[app.abbr_periods[i][0]+2];
			var f=app.abbr_periods[i][1][0];
			var first=app.abbr_periods[i][1];
			
			//to skip things like
			//Let's ask Jane and co. They should know.
			//["Let's ask Jane and co.", "They should know."]
				var one_char_abbr=first.replace(/\./g,'');
			if(temp!==undefined && temp===" " && f===f.toLowerCase() && one_char_abbr.length>1 && tempp!==undefined && tempp===tempp.toUpperCase()){
				continue;
			}
				//but should not 
			
			//I can see Mt. Fuji from here.
			if(temp!==undefined && temp===" " && first===first.toUpperCase() && one_char_abbr.length>1 && tempp!==undefined && tempp===tempp.toUpperCase()){
				continue;
			}
			//Jonas E. Smith
			
			if(temp!==undefined && temp===" " && f===f.toUpperCase()  && tempp!==undefined && tempp===tempp.toUpperCase()){
				delete app.periods[app.abbr_periods[i][0]];
				continue;
			}
			delete app.periods[app.abbr_periods[i][0]];
		};
		app.periods=Object.keys(app.periods);//converting to list now

	};

	app.acceptor=function(prev,next){
		//takes prev and next word of . then decides sentence boundary


	};
	app.segmenter=function(){
		var temp=[0];
		var start=true;
		
		var temp=temp.concat(app.periods.concat(app.ques).concat(app.exclamation)).sort(app.util.sortNumber);//adding 0 and last index to create pairs of periods
		
		for (var i = 0; i < temp.length; i++) {
			if(start){
				var ne=temp[i];//as we added . in begining
				if(temp[i+1]!==undefined){
					app.segments.push(app.text.substr(ne,parseInt(temp[i+1])+1));
				}
				start=false;
			}
			else{
				var ne=parseInt(temp[i])+1;//as we added . in begining
				if(temp[i+1]!==undefined){
					app.segments.push(app.text.substr(ne,parseInt(temp[i+1])+1));
				}
			}
			
		};
	};
	app.util.sortNumber=function(a,b){
	  return a - b;
	};
	function main(req,res){
		console.log(req.query.q);
		app.text=req.query.q;
		app.util.replace_double_punc(app.text);
		test("After normailzation  :  "+app.text);
		app.periods=app.util.locate_periods(app.text);
		app.ques=app.util.locate_ques(app.text);
		app.exclamation=app.util.locate_exclamation(app.text);
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
	main(req,res);
};

exports.sentence_segmenter=sentence_main;