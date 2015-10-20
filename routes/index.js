
/*
 * GET home page.
 */
var sentence_segmenter=require('./sentence_segmenter');
console.log(sentence_segmenter);
exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};
exports.sentence_segmenter=sentence_segmenter.sentence_segmenter;

