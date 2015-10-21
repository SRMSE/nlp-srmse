function find_prev_word(source,index){
	var str="";
	var first=true;//to skip first space found
	for (var i = index; i >= 0; i--) {
		//skip till first space found
		if(source[i]===undefined){
			break;
		}
		if(source[i]!==undefined && source[i]!==" " && first){
			continue;
		}
		else if(!first){

		}
		else{
			first=false;
			continue;
		}
		if(source[i]!==undefined && source[i]===" " && !first){
			break;
		}
		str=source[i]+str;
	};
	return str;

}
function find_next_word(source,index){
var str="";
	var first=true;//to skip first space found
	for (var i = index; index<source.length; i++) {
		//skip till first space found
		if(source[i]===undefined){
			break;
		}
		if(source[i]!==undefined && source[i]!==" " && first){
			continue;
		}
		else if(!first){

		}
		else{
			first=false;
			continue;
		}
		if(source[i]!==undefined && source[i]===" " && !first){
			break;
		}
		str=str+source[i];
	};
	return str;

}

//these rules return true when period has to be removed.That is no segmentation at that point
//keys are the examples taken from golden rules.txt
var rules={
	"My name is Jonas E. Smith":function(tup,text,corpus){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined && abbr.length===1 && abbr===abbr.toUpperCase()){
			var period_location=tup[0];
			var word_before_abbr=find_prev_word(text,period_location);
			var word_after_abbr=find_next_word(text,period_location);
			console.log(abbr);
			console.log(period_location);
			console.log(word_before_abbr);
			console.log(word_after_abbr);
			if(word_before_abbr[0]===word_before_abbr[0].toUpperCase() && word_after_abbr[0]===word_after_abbr[0].toUpperCase()){
				return true;
			}


		}
		
		



	},
	"Please turn to p. 55.":function(tup,text,corpus){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined && abbr.length===1){
			var period_location=tup[0];
			var word_before_abbr=find_prev_word(text,period_location);
			var word_after_abbr=find_next_word(text,period_location).replace(/./g,'');
			var num=parseInt(word_after_abbr);
			console.log(abbr);
			console.log(period_location);
			console.log(word_before_abbr);
			console.log(word_after_abbr);
			if(word_before_abbr===word_before_abbr.toLowerCase() && num!==NaN){
				return true;
			}


		}
	},
	"Were Jane and co. at the party?":function(tup,text,corpus){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined && abbr===abbr.toLowerCase()){
			var period_location=tup[0];
			var word_before_abbr=find_prev_word(text,period_location);
			var word_after_abbr=find_next_word(text,period_location);
			console.log(abbr);
			console.log(period_location);
			console.log(word_before_abbr);
			console.log(word_after_abbr);
			if(word_before_abbr===word_before_abbr.toLowerCase() && word_after_abbr===word_after_abbr.toLowerCase()){
				return true;
			}


		}
	},
	"They closed the deal with Pitt, Briggs & Co. at noon.":function(tup,text,corpus){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined ){
			var period_location=tup[0];
			var word_before_abbr=find_prev_word(text,period_location);
			var word_after_abbr=find_next_word(text,period_location);
			console.log(abbr);
			console.log(period_location);
			console.log(word_before_abbr);
			console.log(word_after_abbr);
			if(word_before_abbr===word_before_abbr.toLowerCase() && word_after_abbr===word_after_abbr.toLowerCase() && corpus.corpus.isStopWord(word_after_abbr)){
				return true;
			}


		}
	}

};
exports.rules=rules;