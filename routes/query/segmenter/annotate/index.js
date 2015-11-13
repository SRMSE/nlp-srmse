var mlspotlight = require('dbpedia-spotlight');
var app={
  "init":function(){
      mlspotlight.configEndpoints(
        {
          "english": {
          host:'192.168.103.27',
          path:'/rest/annotate',
          port:'2222',
          confidence:0,
          support:0
          }
        }
      );
  },
  "annotate":function(data,fn){
      mlspotlight.annotate(data,function(output){
        fn(output);
      });
  }
};
exports.dbpedia_annotate=app;
