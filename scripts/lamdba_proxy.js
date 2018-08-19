exports.handler = (event, context, callback) => {
   
    console.log(JSON.stringify(event));
    
    router(event,(err,response)=>{
        
        if(err == null){

            callback(null, {"statusCode":200,
              headers: {
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true },
                "body":JSON.stringify(response)});
        }else{
            
            callback(err, null);
        }
        
    });

};

function router(event,callback){
    console.log("Inside Router");
    var payload = JSON.parse(event.body);
    if(event.path == "/query"){
      if(event.httpMethod == "POST"){
            console.log("/query POST");
            if(payload){
                console.log("Query exists");
                 callback(null,responseFormator(event,200,result,false,"Success results",null));
            else{
                callback(null,responseFormator(event,400,{},true,"there is no body or payload",null));
            }
      }

    }//end of query handler
}

function responseFormator(event, statusCode, payload, isError, message, key){
      var response;
      
        if(event.httpMethod=='POST'){
          response={
            method:event.httpMethod,
            status:statusCode,
            file_reference:key,
            error:isError,
            message:message,
            results:payload
          };
        
      }
  
    return response;
  }
