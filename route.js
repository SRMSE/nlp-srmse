var paths={
	"index":function(req, res){
	  res.render('index', { title: 'Express' })
	},
	"query":function(req,res){

	},
	"sentence_segmenter":function(req,res){
		var sentence_segmenter=require('./routes/sentence_segmenter');
		sentence_segmenter.sentence_segmenter(req,res);
	}
};