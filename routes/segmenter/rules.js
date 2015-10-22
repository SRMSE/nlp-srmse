

//these rules return true when period has to be removed.That is no segmentation at that point
//keys are the examples taken from golden rules.txt
var rules={
	"It is Jr.'s book":function(tup,text,corpus,word_before_abbr,word_after_abbr,middle_dot){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined && abbr.indexOf("'s")>0){
			console.log('1');
			return true;
		}
	},
	"I visited the U.S.A. last year.":function(tup,text,corpus,word_before_abbr,word_after_abbr,middle_dot){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined && abbr===abbr.toUpperCase()){
			var period_location=tup[0];

			if(word_before_abbr===word_before_abbr.toLowerCase() && word_after_abbr===word_after_abbr.toLowerCase() && !corpus.corpus.isInterogative(word_after_abbr)){
				console.log('2');
				return true;
			}


		}
	},
	"I live in the E.U. how about you?":function(tup,text,corpus,word_before_abbr,word_after_abbr,middle_dot){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined && abbr===abbr.toUpperCase()){
			var period_location=tup[0];
			if(word_before_abbr===word_before_abbr.toLowerCase() && word_after_abbr[0]===word_after_abbr[0].toLowerCase() && corpus.corpus.isInterogative(word_after_abbr) && middle_dot){
				console.log('3');
				return true;
			}


		}
	},
	"I live in the E.U. How about you?":function(tup,text,corpus,word_before_abbr,word_after_abbr,middle_dot){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined && abbr===abbr.toUpperCase()){
			var period_location=tup[0];
			if(word_before_abbr===word_before_abbr.toLowerCase() && word_after_abbr[0]===word_after_abbr[0].toUpperCase() && corpus.corpus.isStopWord(word_after_abbr) && middle_dot){
				console.log('4');
				return true;
			}


		}
	},
	"I work for the U.S. Government in Virginia.":function(tup,text,corpus,word_before_abbr,word_after_abbr,middle_dot){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined && abbr===abbr.toUpperCase()){
			var period_location=tup[0];
			if(word_before_abbr===word_before_abbr.toLowerCase() && word_after_abbr[0]===word_after_abbr[0].toUpperCase() && corpus.corpus.isStopWord(word_after_abbr) && middle_dot){
				console.log('4');
				return true;
			}


		}
	},
	"My name is Jonas E. Smith":function(tup,text,corpus,word_before_abbr,word_after_abbr,middle_dot){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined && abbr.length===1 && abbr===abbr.toUpperCase()){
			var period_location=tup[0];
			if(word_before_abbr[0]===word_before_abbr[0].toUpperCase() && word_after_abbr[0]===word_after_abbr[0].toUpperCase()){
				console.log('5');
				return true;
			}


		}
		
		



	},
	"Please turn to p. 55.":function(tup,text,corpus,word_before_abbr,word_after_abbr,middle_dot){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined && abbr.length===1){
			var period_location=tup[0];
			word_after_abbr=word_after_abbr.replace(/./g,'');
			var num=parseInt(word_after_abbr);
			if(word_before_abbr===word_before_abbr.toLowerCase() && num!==NaN){
				console.log('5');
				return true;
			}


		}
	},
	"Were Jane and co. at the party?":function(tup,text,corpus,word_before_abbr,word_after_abbr,middle_dot){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined && abbr===abbr.toLowerCase()){
			var period_location=tup[0];
			if(word_before_abbr===word_before_abbr.toLowerCase() && word_after_abbr===word_after_abbr.toLowerCase()){
				console.log('6');
				return true;
			}


		}
	},
	"They closed the deal with Pitt, Briggs & Co. at noon.":function(tup,text,corpus,word_before_abbr,word_after_abbr,middle_dot){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined ){
			var period_location=tup[0];
			if(word_before_abbr===word_before_abbr.toLowerCase() && word_after_abbr===word_after_abbr.toLowerCase() && corpus.corpus.isStopWord(word_after_abbr) && !corpus.corpus.isInterogative(word_after_abbr)){
				console.log('7');
				return true;
			}


		}
	},
	"At 5 a.m. Mr. Smith went to the bank. ":function(tup,text,corpus,word_before_abbr,word_after_abbr,middle_dot){
		var abbr=tup[1].replace(/\./g,'');
		if(abbr!==undefined ){
			var period_location=tup[0];
			console.log(middle_dot);
			if(word_before_abbr===word_before_abbr.toLowerCase() && word_before_abbr===word_before_abbr.toUpperCase() && word_after_abbr[0]===word_after_abbr[0].toUpperCase() && middle_dot){
				console.log('8');
				return true;
			}


		}
	}

};
exports.rules=rules;