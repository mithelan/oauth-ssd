$(document).ready(function(){
     
     var clientId = "401119320452-0uiamn21n6eqc7hsv1v5u519ietba4mo.apps.googleusercontent.com";
	 
     var redirect_uri = "http://localhost:3000/upload.html";
	 
     var scope = "https://www.googleapis.com/auth/drive";
	 
     var url = "";

     $("#login").click(function(){
        signInToGoogleAccount(clientId,redirect_uri,scope,url);
     });

     function signInToGoogleAccount(clientId,redirect_uri,scope,url){
        url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="+redirect_uri
        +"&prompt=consent&response_type=code&client_id="+clientId+"&scope="+scope
        +"&access_type=offline";
        window.location = url;
     }
});

