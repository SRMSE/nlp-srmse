
/*
 * GET home page.
 */
exports.index = function(req, res){
   res.sendfile(global_path+'/public/index.html');
};


