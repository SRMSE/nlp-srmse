

//these rules return true when period has to be removed.That is no segmentation at that point
//keys are the examples taken from golden rules.txt
var rules={
	"My name is Jonas E. Smith":function(tup,text,corpus,word_before_abbr,word_after_abbr){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined && abbr.length===1 && abbr===abbr.toUpperCase()){
			var period_location=tup[0];
			if(word_before_abbr[0]===word_before_abbr[0].toUpperCase() && word_after_abbr[0]===word_after_abbr[0].toUpperCase()){
				return true;
			}


		}
		
		



	},
	"Please turn to p. 55.":function(tup,text,corpus,word_before_abbr,word_after_abbr){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined && abbr.length===1){
			var period_location=tup[0];
			word_after_abbr=word_after_abbr.replace(/./g,'');
			var num=parseInt(word_after_abbr);
			if(word_before_abbr===word_before_abbr.toLowerCase() && num!==NaN){
				return true;
			}


		}
	},
	"Were Jane and co. at the party?":function(tup,text,corpus,word_before_abbr,word_after_abbr){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined && abbr===abbr.toLowerCase()){
			var period_location=tup[0];
			if(word_before_abbr===word_before_abbr.toLowerCase() && word_after_abbr===word_after_abbr.toLowerCase()){
				return true;
			}


		}
	},
	"They closed the deal with Pitt, Briggs & Co. at noon.":function(tup,text,corpus,word_before_abbr,word_after_abbr){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined ){
			var period_location=tup[0];
			if(word_before_abbr===word_before_abbr.toLowerCase() && word_after_abbr===word_after_abbr.toLowerCase() && corpus.corpus.isStopWord(word_after_abbr)){
				return true;
			}


		}
	}

};
exports.rules=rules;