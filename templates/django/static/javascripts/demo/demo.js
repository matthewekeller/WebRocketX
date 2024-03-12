function json(){
    var successfulCallback = function(json) {
        alert("I am parsing the json that just came back.  Go look at last async reponse, lower left hand corner.  Getting the following: json.name, json.cars[1].models[1] = "+json.name+", "+json.cars[1].models[1])                                             
    }
        
    var webapi = new Webapi();
    webapi.setSuccessCallbackReference(successfulCallback);    
    webapi.setUrl("json_go/");
    var asyncParametersList = new AsyncParametersList();
    
    var userObject = new Object();
    userObject.userId = 200;
    var jsonParam = JSON.stringify(userObject);
    asyncParametersList.addParameter("jsonParam",jsonParam);
    webapi.submitAsync(asyncParametersList);    
}

function test1(){
    var successfulCallback = function(innerHTMLObject) {                        
        domUtil.setText("test1Input","Set by developer defined callback.");              
    }
        
    var webapi = new Webapi();
    webapi.setSuccessCallbackReference(successfulCallback);    
    webapi.setUrl("test1_go/");
    webapi.submitAsync();    
}

function slowtest1(){
    var webapi = new Webapi();
    webapi.setUrl("slowtest1_go/");
    webapi.submitAsync();    
}


function test2(){       
    var webapi = new Webapi();    
    webapi.setUrl("test2_go/");
    webapi.submitAsync();    
}


function test2Onload() {
    var test2Input = domUtil.getElement("test2Input");
    //$(test2Input).datepicker();
    domUtil.setText("test2Input","Set by page onload."); 
}

function test3(){       
    var webapi = new Webapi();    
    webapi.setUrl("test3_go/");
    webapi.submitAsync();    
}

function test3Back(){
    dtBack();
    domUtil.setText("test2Input","Altered by back from test 3.");
}  

function test4(){       
    var webapi = new Webapi();    
    webapi.setUrl("test4_go/");
    webapi.submitAsync();    
}

function test5(){       
    var webapi = new Webapi();    
    webapi.setUrl("test5_go/");
    webapi.submitAsync();    
}

function newStartingPoint(){
    dtInit();       
    var webapi = new Webapi();    
    webapi.setUrl("newStartingPoint_go/");
    webapi.submitAsync();    
}

function getSignInPage(){       
    var webapi = new Webapi();    
    webapi.setUrl("testSignInPage.go");
    webapi.submitAsync();    
}

function submitTestForm(){       
    var webapi = new Webapi();    
    webapi.setUrl("test3_go/");
    webapi.submitAsyncForm("testForm");    
}

function submitCustomParam(){       
    var webapi = new Webapi();    
    webapi.setUrl("test3_go/");
    
    var asyncParametersList = new AsyncParametersList();
    asyncParametersList.addParameter("firstName","Joe");
    asyncParametersList.addParameter("lastName","Johnson");
    webapi.submitAsync(asyncParametersList);       
}

function restoreResponse(){       
    restoreAsyncResponse("test3");
}

function modal10(){       
    var successfulCallback = function(innerHTMLObject) {                        
        $(innerHTMLObject).find(".BDT_Dialog_Decoration").draggable({ appendTo: "body" });                 
    }
        
    var webapi = new Webapi();
    webapi.setSuccessCallbackReference(successfulCallback);    
    webapi.setUrl("modal10_go/");
    webapi.submitAsync();    
}


function modal20(){       
    var successfulCallback = function(innerHTMLObject) {                        
        $(innerHTMLObject).find(".BDT_Dialog_Decoration").draggable({ appendTo: "body" });                 
    }
        
    var webapi = new Webapi();
    webapi.setSuccessCallbackReference(successfulCallback);   
    webapi.setUrl("modal20_go/");
    webapi.submitAsync();    
}

function generate404(){       
    var webapi = new Webapi();    
    webapi.setUrl("xxx.go");
    webapi.submitAsync("");    
}

function noMeta(){       
    var webapi = new Webapi();    
    webapi.setUrl("noMeta_go/");
    webapi.submitAsync("");    
}

function noURL(){       
    var webapi = new Webapi();    
    webapi.setUrl("noURL_go/");
    webapi.submitAsync("");    
}

function serverSideError(){
    var successfulCallback = function(innerHTMLObject) {                        
        alert("this should not be called");                 
    }
           
    var webapi = new Webapi();
    webapi.setSuccessCallbackReference(successfulCallback);    
    webapi.setUrl("serverSideError_go/");
    webapi.submitAsync("");    
}

function serverSideErrorTypeDataAndJsOnload(){
    var successfulCallback = function(innerHTMLObject) {                        
        alert("this should not be called");                 
    }
           
    var webapi = new Webapi();
    webapi.setSuccessCallbackReference(successfulCallback);    
    webapi.setUrl("serverSideErrorTypeDataAndJsOnload_go/");
    webapi.submitAsync("");    
}

function showServerSideErrorUpTop(capsule) {
    var errorSpan = domUtil.getElement("errorSpan");
    var errorMessageElement = domUtil.getChildElement(capsule,"errorDescription");    
    var errorMessage = domUtil.getText(errorMessageElement);  
    domUtil.setText(errorSpan,errorMessage); 
}

// called on every navigation by the webRocketX framework
// Override this function to do something custom
// Very handy for clearing any leftover server side error messages if you are putting them
// at the top of the page.
function dtNavigationCallback() {
    var errorSpan = domUtil.getElement("errorSpan");
    domUtil.setText(errorSpan,""); 
}