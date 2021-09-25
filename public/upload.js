
$(document).ready(function(){
    
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
	
	//generated client id
    var client_id = "349805278143-c2vi2ruhvv8032fq9558sr111ohbn6pp.apps.googleusercontent.com";
	
	 //url set for the redirection in google console
    const redirect_uri = "http://localhost:3000/upload.html";
	
	 //secret key generated at the time of application creation
    const client_secret = "9uXTygPgsHcmMLH7NsU_Gvhk";
	
	//invoking url for google drive Resource Server
    const scope = "https://www.googleapis.com/auth/drive";
	
	//access token will be created at the time of authentication
    var access_token= "";
	
	  
	//invoking resource server API
    $.ajax({
        type: 'POST',
        url: "https://www.googleapis.com/oauth2/v4/token",
        data: {code:code
            ,redirect_uri:redirect_uri,
            client_secret:client_secret,
        client_id:client_id,
        scope:scope,
        grant_type:"authorization_code"}, //in here we use authorization code as the OAuth grant type out of 4 types
        dataType: "json",
        success: function(resultData) {
           
           //saving data in local storage of JS
           localStorage.setItem("accessToken",resultData.access_token);
           localStorage.setItem("refreshToken",resultData.refreshToken);
           localStorage.setItem("expires_in",resultData.expires_in);
           window.history.pushState({}, document.title, "/" + "upload.html"); //redirecting to same page after uploading a file
                      
        }
  });

    function stripQueryStringAndHashFromPath(url) {
        return url.split("?")[0].split("#")[0];
    }   

    var Upload = function (file) {
        this.file = file;
    };
    
    Upload.prototype.getType = function() {
        localStorage.setItem("type",this.file.type);
        return this.file.type;
    };
    Upload.prototype.getSize = function() {
        localStorage.setItem("size",this.file.size);
        return this.file.size;
    };
    Upload.prototype.getName = function() {
        return this.file.name;
    };
    Upload.prototype.doUpload = function () {
        var that = this;
        var formData = new FormData();
    
        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.getName());
        formData.append("upload_file", true);
    
		//request to uload it to GDrive
        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
                
            },
            url: "https://www.googleapis.com/upload/drive/v2/files",
            data:{
                uploadType:"media"
            },
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            success: function (data) {
                console.log(data);
            },
            error: function (error) {
                console.log(error);
            },
            async: true,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000
        });
    };
    
    Upload.prototype.progressHandling = function (event) {
        var percent = 0;
    };

	//uploading the file
    $("#upload").on("click", function (e) {
        var file = $("#files")[0].files[0];
        var upload = new Upload(file); 
    
        // execute upload
        upload.doUpload();
    });
    
});