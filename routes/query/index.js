
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

  res.end();
};

