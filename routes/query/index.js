
/*
 * GET /query
 */
var normalization=require("./normalization/normalize");
var segmenter=require("./segmenter/sentence_segmenter");
exports.index=function(req, res){
  var source=req.query.q;

  //normalization of text
  var dic=normalization.normalize(source);

  //segmentation into sentences
  dic=segmenter.segment(dic);
  res.write(JSON.stringify(dic));
  res.end();
};
exports.segment=function(req,res){
	var source=req.query.q;
	var d=normalization.normalize(source);
	dic=segmenter.segment(dic);
	res.write(JSON.stringify(dic));
	res.end();
};
exports.normalize=function(req,res){
	var source=req.query.q;
	var d=normalization.normalize(source);
	res.write(JSON.stringify(d));
	res.end();
};

