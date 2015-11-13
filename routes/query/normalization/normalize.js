var regex=require('./regexes');
var detector=require('./detector').init;
function test(d){
	console.log(d+"\n");
}
var app={
	"text":"",
	"original_text":"",
	"filter":function(source){
		source=source.replace(/(\s){2,}|(\n)+|(\r)+|(\t)+/g," ");
		//console.log(source);
		return source;
	},
	"expand":function(source){
		//will replace things like & to and viz. to which is etc.
		source=source.replace(/&/g,'and');
		source=source.replace(/viz(\.|)/g,'which is');
		var m;
		//replacing errant \n like tilak\nayush\n into new lines (periods)
		while(m=regex.store.newline_list.exec(source)){
					m[0]=m[0].trim();
					source=source.replace(m[0],m[0].replace(/\\n/g,' . '));
					
					
		}
		//regex to replace things like google.At   to google. At
		while(m=regex.store.word_joined_by_period.exec(source)){
			m[0]=m[0].trim();
			if(m[0][0]===m[0][0].toLowerCase()){
				//it should be google.At not Google.At
				source=source.replace(m[0],m[0].split('.').join('. '));
			}
			
		}
		return source;
	},
	"normalize":function(source){
		app.reset();
		app.text=source;
		app.original_text=app.text;

		test("original_text:  "+app.original_text);

		app.text=app.filter(app.text);
		app.text=app.expand(app.text);

		test("After normalization  :  "+app.text);

		//starting detecting tokens in text

		app.new_text=detector.detect(app.text);


		//annotate.dbpedia_annotate.annotate(app.text,function(output){
			//console.log(output.response.Resources);
		//})
		
		test("found abbr  :"+detector.abbreviations);
		test("found bullets  :"+detector.bullets);
		test("found emails :"+detector.email);
		test("found urls :"+detector.url);
		test("found digits :"+detector.digits);
		test("found dates :"+detector.date);
		test("found currency :"+detector.currency);
		test("found time :"+detector.time);
		test("found special :"+detector.special_search);
		dic={};
		dic["original_text"]=app.original_text;
		dic["normalize_text"]=app.text;
		dic["detect"]=detector;
		return dic;
	},
	"reset":function(){
		//clears the app dic for next req
		app.text="";
		app.original_text="";
	}
};


exports.normalize=app.normalize;