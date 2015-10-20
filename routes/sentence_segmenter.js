/* Main entry file for sentence segmenter
*/
//app definations
var regex=require('./regexes');
var app={};//app functions
function main(req,res){
	console.log(req.query.q);
	app.text=req.query.q;
	var ind=app.util.locate_periods(app.text);
	app.util.locate_acc(app.text);
	res.send(ind);
	res.end();
};
function sentence_main(req,res){


	app.text="";//will store the input given by user
	app.acc={};//stores acc string:location
	app.util={};//stores util functions
	app.rules={}; //will stores rules for various parsing
	app.regexes={};//regex store


	app.util.locate_acc=function(source){
		//acronyms are short hand from starting char of each words
		//can be U.S.A or USA
		var m;
		while(m=regex.store.acc.exec(source)){
			app.acc[m[0].trim()]=m.index;
		}
		console.log(app.acc);

	};


	app.util.locate_periods=function(source){
	  var result = [];
	  var find=".";
	  for(i=0;i<source.length; ++i) {
	    // If you want to search case insensitive use 
	    // if (source.substring(i, i + find.length).toLowerCase() == find) {
	    if (source.substring(i, i + find.length) == find) {
	      result.push(i);
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

	main(req,res);
};

exports.sentence_segmenter=sentence_main;