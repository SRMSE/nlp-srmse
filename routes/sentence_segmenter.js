/* Main entry file for sentence segmenter
*/
//app definations
var regex=require('./regexes');
var app={};//app functions
function main(req,res){
	console.log(req.query.q);
	app.text=req.query.q;
	app.periods=app.util.locate_periods(app.text);
	app.acc=app.util.locate_acc(app.text);
	console.log(app.acc);
	console.log(app.periods);
	app.filter_abbr();
	console.log(app.periods);
	res.send(app.periods);
	res.end();
};
function sentence_main(req,res){


	app.text="";//will store the input given by user
	app.acc={};//stores acc location:String
	app.util={};//stores util functions
	app.rules={}; //will stores rules for various parsing
	app.abbr_periods=[];//buckets used for removing unecessary periods
	app.periods={};

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
				app.abbr_periods.push(m.index+d.index);
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
			delete app.periods[app.abbr_periods[i]];
		};
		app.periods=Object.keys(app.periods);//converting to list now

	};

	app.acceptor=function(prev,next){
		//takes prev and next word of . then decides sentence boundary


	};

	main(req,res);
};

exports.sentence_segmenter=sentence_main;