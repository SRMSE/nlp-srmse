/* Main entry file for sentence segmenter
*/
//app definations

var segment_rules=require('./rules');
var corpus=require('../util/corpus/corpus');
var prototypes=require("./util/proto");
var regex=require("../normalization/regexes");
var rules=require("./rules").rules;
prototypes.init();
var app={
	"filter_abbr":function(detected,text,periods,abbr_periods){
		//we have to remove periods from detected data
		for(var key in detected){
			var dic=detected[key];
			for(var key1 in dic){
				var li=dic[key1];
				for(var i=li[0];i<=li[1];i++){
					delete periods[i];
				}
			}
		}
		//removes those periods which are part of abbr
		for (var i = 0; i < abbr_periods.length; i++) {
			//abbr_periods is a tuple
			//period_location,detected abbr,is middle

			//for abbr starting at para start
			//ex   St. Michael's Church is on 5th st. near the light.
			if(abbr_periods[i][0]<5){
				delete periods[abbr_periods[i][0]];
				continue;
			}

			var after_word=app.util.find_next_word(text,abbr_periods[i][0]);
			var before_word=app.util.find_prev_word(text,abbr_periods[i][0]);
			var middle_period=abbr_periods[i][2];			
			for (var key in rules) {
				//console.log(before_word);
				//console.log(after_word);
				if(rules[key](abbr_periods[i],text,corpus,before_word,after_word,middle_period)){
					//delete the period
					console.log('detected'+abbr_periods[i][0]);
					delete periods[abbr_periods[i][0]];
					break;
				}
			};
		
		};

		periods=Object.keys(periods);//converting to list now
		return periods;
	},
	"segmenter":function(text,periods,ques,bullet_splits){
		var temp=[0];
		var start=true;
		var segments=[];
		temp=temp.concat(periods).concat(ques).concat(bullet_splits).sort(app.util.sortNumber);//adding 0 and last index to create pairs of periods
		for (var i = 0; i < temp.length; i++) {
			if(start){
				var ne=parseInt(temp[i]);
				start=false;
			}
			else{
				var ne=parseInt(temp[i])+1;
			}
			
				if(temp[i+1]!==undefined){
					segments.push(text.substring(ne,(parseInt(temp[i+1])+1)));
				}
				else{
					if(ne<=text.length-1){
						segments.push(text.substring(ne,text.length));

					}
				}
			
		};
		return segments;
	},
	"util":{
		"locate_last_words":function(indexes){
			var words=[];
			for (var i = 0; i < indexes.length; i++) {
				var location=indexes[i];
				var charc=text[--location];
				var w="";
				while(charc && charc!==" "){//undefined when begining of para covers spaces also
					w=charc+w;
					charc=text[--location];
				}
				words.push(w);
			};
			return words;
		},
		"sortNumber":function(a,b){
		  return a - b;
		},
		"find_prev_word":function(source,index){
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

		},
		"find_next_word":function(source,index){
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

		},
		"locate_periods":function(source){
			//common method to find punc then divide locations
			  var dic={};
			  var ques=[];
			  var m;

				while(m=regex.store.periods.exec(source)){
					//punc can be . ! ? .. !? etc all combinations
					if(m[0][0].trim()==="."){
						dic[m.index+m[0].length-1]=m[0].trim();
					}
					else if(m[0][0].trim()==="?" || m[0][0].trim()==="!"){
						ques.push(m.index+m[0].length-1);
					}
				
					
					
				}
				//return periods and ques in tuple
				return [dic,ques];
			}

	}



};
function main(dic){
	console.log(dic);
	var periods=app.util.locate_periods(dic.normalize_text);
	var ques=periods[1];
	periods=periods[0];
	console.log(periods);
	var abbr_periods=dic.detect.abbreviations.abbr_periods;
	console.log("abbr_periods "+abbr_periods);
	var filtered_periods=app.filter_abbr(dic.detect,dic.normalize_text,periods,abbr_periods);
	console.log(filtered_periods);
	var segments=app.segmenter(dic.normalize_text,filtered_periods,ques,dic.detect.bullet_split);
	console.log(segments);
	
	console.log(filtered_periods);
	dic["detect"]['segments']=segments;
	return dic;
}
exports.segment=main;
