
/**
 * Module dependencies.
 */

var express = require('express');
var index=require('./routes/index');
var query=require('./routes/query');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});
// Routes
app.get('/', index.index);
//app.get('/sentence_segmenter',routes.sentence_segmenter);
app.get('/query/std',query.index);
app.get('/query/normalize',query.normalize);
app.get('/query/segment',query.segment);
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
