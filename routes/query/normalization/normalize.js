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

		//regex to replace things like google.At   to google. At
		while(m=regex.store.word_joined_by_period.exec(source)){
			source=source.replace(m[0],m[0].split('.').join('. '));
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
		
		test("found abbr  :"+JSON.stringify(detector.abbreviations));
		test("found bullets  :"+JSON.stringify(detector.bullets));
		test("found emails :"+JSON.stringify(detector.email));
		test("found urls :"+JSON.stringify(detector.url));
		test("found digits :"+JSON.stringify(detector.digits));
		test("found dates :"+JSON.stringify(detector.date));
		test("found currency :"+JSON.stringify(detector.currency));
		test("found time :"+JSON.stringify(detector.time));
		test("found special :"+JSON.stringify(detector.special_search));
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