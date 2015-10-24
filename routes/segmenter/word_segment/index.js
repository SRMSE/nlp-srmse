var word_segmenter={
	"OneGramDist":function(filename){
		var rl = require('readline').createInterface({
			  input: require('fs').createReadStream(filename),
			  terminal: false
		});
		rl.on('line', function (line) {
         	var t=line.split('\t');
         	var word=t[0].trim();
         	var count=parseInt(t[1].trim());
         	word_segmenter.self[word] = count;
         	word_segmenter.self.gramCount += word_segmenter.self[word];
		});
	},
	"OneGramDistObj":function(key){
			var k=word_segmenter.self[key];
			if(k){
				return k / word_segmenter.self.gramCount;
			}
			else{
	         	return (1/(word_segmenter.self.gramCount*Math.pow(10,(key.length-2))));
			}
		
		

	},
	"wordSeqFitness":function(words){
		var sum=0;
		for (var i = 0; i < words.length; i++) {
			//console.log(this.OneGramDistObj(words[i]));
			var g=this.OneGramDistObj(words[i]);
			var t=this.log10(g);
			sum+=t;
		};
		return sum;
	},
	"log10":function(num){
		return Math.log(num) / Math.LN10;
	},
	"segment":function(word){
	   if(!word){
		   	return [];
	   } 
	   word = word.toLowerCase() // change to lower case
	   var splits=this.splitPairs(word);
	   var ans=[];
	   for (var i = 0; i < splits.length; i++) {
		   	var f=[splits[i][0]];
		   	var l=splits[i][1];
		   	var seek=this.cache[l];
		   	if(seek){
		   		var y=seek;
		   	}
		   	else{
		   		var y=this.segment(l);
		   		this.cache[l]=y;
		   	}
		   	
		   	//console.log(f.concat(y));
		   	ans.push(f.concat(y));
	   };
	   var m;
	   var first=true;
	   var index;
	   for (var i = 0; i < ans.length; i++) {
	   	
	   		if(first){
	   			m=this.wordSeqFitness(ans[i]);
	   			index=i;
	   			first=false;
	   			//console.log(ans[i],m);
	   			continue;
	   		}
	   		var a=this.wordSeqFitness(ans[i]);
	   		//console.log(ans[i],a);
	   		if(m!==undefined && a>m){
	   			m=a;
	   			index=i;
	   		}
	   };
	   return ans[index];
	},
	"splitPairs":function(word){
		if (typeof(maxLen)==='undefined'){
			var maxLen = 20;	
		} 
		var max=Math.max(word.length,maxLen);
		var ans=[];
		for (var i =0; i < max; i++) {
			ans.push([word.substr(0,i+1),word.substr(i+1)]);
		}
		//process.stdout.write(JSON.stringify(ans));
		return ans;
	},
	"segmentWithProb":function(word){
   		var segmented = this.segment(word);
   		//console.log(segmented);
   		return [this.wordSeqFitness(segmented), segmented]
	},
	"self":{
		"gramCount":0
	},
	"cache":{

	}

};
word_segmenter.OneGramDist('./routes/segmenter/word_segment/one-grams.txt');
function execute(data){
	return word_segmenter.segmentWithProb(data);
}
exports.segment=execute;