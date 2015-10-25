/* Main entry file for sentence segmenter
*/
//app definations
var regex=require('./regexes');
var segment_rules=require('./segmenter/rules');
var corpus=require('./corpus/corpus');
var date=require('./segmenter/date/date');
var currency=require('./segmenter/currency/currency');
var word_segmenter=require('./segmenter/word_segment/index');
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
	app.rules=segment_rules.rules;
	app.abbr_periods=[];//buckets used for removing unecessary periods
	app.periods={};
	app.segments=[];
	app.ques=[];
	app.emails={};
	app.urls={};
	app.domains={};
	app.modified_text_to_search_periods="";
	app.dates={};
	app.currency={};
	app.bullets={};
	var date_output={};
	var currency_output={};
	app.util.locate_acc=function(source){
		var dic={};
		//acronyms are short hand from starting char of each words
		//can be U.S.A or USA
		currency_output=currency.currency.init(source);
		app.modified_text_to_search_periods=currency_output['query'];
		delete currency_output['query'];
		app.currency=currency_output;
		test('Found currency :'+JSON.stringify(app.currency));


		date_output=date.date.init(source);
		app.modified_text_to_search_periods=date_output['query'];
		delete date_output['query'];
		app.dates=date_output;
		test('Found dates :'+JSON.stringify(app.dates));
		var m1;

		while(m1=regex.store.domains.exec(app.modified_text_to_search_periods)){
			//for detecting domain names
			//replace domain names to blank in this search to avoid getting their periods
			if(m1[0][0]!=="/"){
					var t=[];
					t.push(m1.index);//starting index
					t.push(m1.index+m1[0].length);//end index
					var blanks=m1[0].replace(/./g,'#');
					app.modified_text_to_search_periods=app.modified_text_to_search_periods.replace(m1[0],blanks);
					app.domains[m1[0].trim()]=t;
			}
		}

		while(m=regex.store.email.exec(app.modified_text_to_search_periods)){
				//for detecting emails
				//replace emails to blank in this search to avoid getting their periods
				var t=[];
				t.push(m.index);//starting index
				t.push(m.index+m[0].length);//end index
				var blanks=m[0].replace(/./g,'#');
				app.modified_text_to_search_periods=app.modified_text_to_search_periods.replace(m[0],blanks);
				app.emails[m[0].trim()]=t;
				continue;
			}
		while(m=regex.store.url.exec(app.modified_text_to_search_periods)){
				//for detecting urls
				m[0]=m[0].rtrim();
				if(m[0].substr(m[0].length-1)==="."){
					m[0]=m[0].substr(0,m[0].length-1);
				}  //if ends in dot remove dot may be sb
				var t=[];
				t.push(m.index);//starting index
				t.push(m.index+m[0].length);//end index
				var blanks=m[0].replace(/./g,'#');
				app.modified_text_to_search_periods=app.modified_text_to_search_periods.replace(m[0],blanks);
				app.urls[m[0].trim()]=t;
				continue;
		}
		while(m=regex.store.quoted.exec(app.modified_text_to_search_periods)){
				//for detecting urls
				m[0]=m[0].rtrim();
				if(m[0].substr(m[0].length-1)==="."){
					m[0]=m[0].substr(0,m[0].length-1);
				}  //if ends in dot remove dot may be sb
				var t=[];
				t.push(m.index);//starting index
				t.push(m.index+m[0].length);//end index
				var blanks=m[0].replace(/./g,'#');
				app.modified_text_to_search_periods=app.modified_text_to_search_periods.replace(m[0],blanks);
				app.urls[m[0].trim()]=t;
				continue;
		}
		var temp_for_bullets=app.modified_text_to_search_periods;
		while(m=regex.store.acc.exec(app.modified_text_to_search_periods)){

			
			if(m[0][0]===" "){
				//javascript regexes do no support look behinds
				//need to change regex for regexes starting with space
				//will see later
				dic[m.index+1]=m[0].trim();
			}
			else{
				dic[m.index]=m[0].trim();
			}
			var temp=m[0];
			var blanks=temp.replace(/./g,"#");
			temp_for_bullets=temp_for_bullets.replace(temp,blanks);

			var d;
			var ree=/\./g;
			while(d=ree.exec(m[0].trim())){
				var t=[];
				var ind;
				if(m[0][0]===" "){
					//javascript regexes do no support look behinds
					//need to change regex for regexes starting with space
					//will see later
					t.push(m.index+d.index+1);
					ind=m.index+d.index+1;
				}
				else{
					t.push(m.index+d.index);
					ind=m.index+d.index;
				}
				t.push(m[0].trim());
				if(app.text[ind-1]===" " || app.text[ind+1]===" " || app.text[ind-1]===undefined || app.text[ind+1]===undefined){
					//end period
					t.push(false);
				}
				else{
					t.push(true);
				}
				app.abbr_periods.push(t);//keeping tracks of dots between an abbr
			}
			
		}
		//bullets after abbr 
		console.log(temp_for_bullets);
			while(m=regex.store.bullets.exec(temp_for_bullets)){
				//for detecting bullets
				console.log(m);
				var t=[];
				var ind,l;
				if(m[0][0]===" "){
					ind=m.index+1;
					l=m[0].length-1;
				}
				else{
					ind=m.index;
					l=m[0].length;
				}
				t.push(ind);//starting index
				t.push(ind+l);//end index
				var blanks=m[0].replace(/./g,'#');
				app.modified_text_to_search_periods=app.modified_text_to_search_periods.replace(m[0],blanks);
				app.bullets[m[0].trim()]=t;
				if(ind>1){
					app.ques.push(ind-1);//to break at bullets.
				}
				
			}
		return dic;
	};


	app.util.locate_periods=function(source){

		//common method to find punc then divide locations
	  var dic={};
	  var m;
		while(m=regex.store.periods.exec(source)){
			//punc can be . ! ? .. !? etc all combinations
			if(m[0][0].trim()==="." && app.text[m.index+1]!==")"){//  .) should not be considered
				dic[m.index+m[0].length-1]=m[0].trim();
			}
			else if(m[0][0].trim()==="?" || m[0][0].trim()==="!" && app.text[m.index+1]!==")"){
				app.ques.push(m.index+m[0].length-1);
			}
		
			
			
		}
		return dic;
	};
	app.util.normalize=function(source){
		//will replace things like & to and viz. to which is etc.
		source.replace(/(\s){2,}|(\n)+|(\r)+|(\t)+/g," ");
		source.replace(/&/g,'and');
		var m;
		//regex to replace things like google.At   to google. At
		while(m=regex.store.word_joined_by_period.exec(source)){
			source=source.replace(m[0],m[0].split('.').join('. '));
		}
		console.log(source);
		return source;
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
			//app.abbr_periods is a tuple
			//period_location,detected abbr

			//for abbr starting at para start
			//ex   St. Michael's Church is on 5th st. near the light.
			if(app.abbr_periods[i][0]<5){
				delete app.periods[app.abbr_periods[i][0]];
				continue;
			}

			
			for (var key in app.rules) {
				var after_word=app.util.find_next_word(app.text,app.abbr_periods[i][0]);
				var before_word=app.util.find_prev_word(app.text,app.abbr_periods[i][0]);
				var middle_period=app.abbr_periods[i][2];
				console.log(before_word);
				console.log(after_word);
				if(app.rules[key](app.abbr_periods[i],app.text,corpus,before_word,after_word,middle_period)){
					//delete the period
					console.log('detected');
					delete app.periods[app.abbr_periods[i][0]];
					break;
				}
			};
		
		};

		app.periods=Object.keys(app.periods);//converting to list now

	};

	app.acceptor=function(prev,next){
		//takes prev and next word of . then decides sentence boundary


	};
	app.segmenter=function(){
		var temp=[0];
		var start=true;
		temp=temp.concat(app.periods).concat(app.ques).sort(app.util.sortNumber);//adding 0 and last index to create pairs of periods
		for (var i = 0; i < temp.length; i++) {
			if(start){
				var ne=parseInt(temp[i]);
				start=false;
			}
			else{
				var ne=parseInt(temp[i])+1;
			}
			
				if(temp[i+1]!==undefined){
					app.segments.push(app.text.substring(ne,(parseInt(temp[i+1])+1)));
				}
				else{
					if(ne<=app.text.length-1){
						app.segments.push(app.text.substring(ne,app.text.length));

					}
				}
			
		};
	};
	app.util.sortNumber=function(a,b){
	  return a - b;
	};
	app.util.find_prev_word=function(source,index){
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

	};
	app.util.find_next_word=function(source,index){
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

	};
	function main(req,res){
		console.log(req.query.q);
		//console.log(word_segmenter.segment.execute(req.query.q)); //uncomment to see word segmenter but cannot pass entire
		app.text=req.query.q;
		app.original_text=app.text;
		test("original_text:  "+app.original_text);
		app.text=app.util.normalize(app.text);
		test("After normailzation  :  "+app.text);
		app.modified_text_to_search_periods=app.text;
		app.acc=app.util.locate_acc(app.text);
		app.periods=app.util.locate_periods(app.modified_text_to_search_periods);
		test("found abbr  :"+JSON.stringify(app.acc));
		test("found bullets  :"+JSON.stringify(app.bullets));
		test("found emails :"+JSON.stringify(app.emails));
		test("found urls :"+JSON.stringify(app.urls));
		test("found domains :"+JSON.stringify(app.domains));
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
String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}
exports.sentence_segmenter=sentence_main;
