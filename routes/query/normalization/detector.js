var special_search=require('./detectors/special_search/special_search');
var date=require('./detectors/date/date');
var time=require('./detectors/time/time').init;
var currency=require('./detectors/currency/currency');
var units=require('./detectors/units/units').init;
var email=require('./detectors/email/email').init;
var digits=require('./detectors/digits/digits').init;
var url=require('./detectors/url/url').init;
var quoted=require('./detectors/quoted/quoted').init;
var abbreviations=require('./detectors/abbreviations/abbreviations').init;
var bullets=require('./detectors/bullets/bullets').init;
var regex=require('./regexes');
var app={
	"new_text":"",
	"emails":{},
	"special_search":{},
	"unit":{},
	"currency":{},
	"date":{},
	"digits":{},
	"email":{},
	"url":{},
	"quoted":{},
	"abbreviations":{},
	"bullets":{},
	"time":{},
	"bullet_split":[],
	"detect":function(source){
		var dic={};
		var m1;
		//special search output

		var special_search_output=special_search.special_search.init(source);
		app.new_text=special_search_output['query'];
		delete special_search_output['query'];
		app["special_search"]=special_search_output;
		//unit search output
		app["unit"]=units.get(app.new_text);
		app.new_text=units.new_query();

		//currency search output

		var currency_output=currency.currency.init(app.new_text);
		app.new_text=currency_output['query'];
		delete currency_output['query'];
		app["currency"]=currency_output;
		
		//time
		app.time=time.get(app.new_text);
		app.new_text=time.new_query();

		//date search output

		var date_output=date.date.init(app.new_text);
		app.new_text=date_output['query'];
		delete date_output['query'];
		app["date"]=date_output;



		//for emails
		app.email=email.get(app.new_text);
		app.new_text=email.new_query();

		//for urls
		app.url=url.get(app.new_text);
		app.new_text=url.new_query();

		//for quoted text
		app.quoted=quoted.get(app.new_text);
		app.new_text=quoted.new_query();

		//for abbreviations
		app.abbreviations=abbreviations.get(app.new_text);
		app.new_text=abbreviations.new_query();
		
		//for bullets
		app.bullets=bullets.get(app.new_text);
		app.new_text=bullets.new_query();
		app.bullet_split=bullets.getBreak();

		//for digits
		app.digits=digits.get(app.new_text);
		app.new_text=digits.new_query();


		


		return app.new_text;
	},


};
exports.init=app;
		