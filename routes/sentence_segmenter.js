/* Main entry file for sentence segmenter
*/
var app={};
app.text="";//will store the input given by user
app.sentence_main=function(req,res){
	console.log(req.query.q);
	app.text=req.query.q;
	res.send(req.query.q);
	res.end();

};
app.rules={}; //will stores rules for various parsing
exports.sentence_segmenter=app.sentence_main;