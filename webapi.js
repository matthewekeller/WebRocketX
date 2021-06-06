// Copyright 2021 to WebRocketX under the
// GNU LESSER GENERAL PUBLIC LICENSE Version 2.1
// See license file for more details

function AsyncRequest() {
    this.successCallbackReference = null;
    this.failureCallbackReference = null;
    this.url = null;    
    this.divsToHide = new Array;
    this.divsToShow = new Array;    
    this.parameters = "";
    this.clearBackStack = false;
    this.asyncMode = true;        
}


function Webapi() {
    // workaround for change in meaning of 'this' in the callbacks
    var me = this;
    
    // member variables    
    me.asyncRequest = new AsyncRequest();
       
    me.silentMode = false;
    me.browserBackButtonDriven = false;
       
    // setters
    me.setClearBackStack = setClearBackStack;
    me.setAsyncMode = setAsyncMode;    
    me.setSuccessCallbackReference = setSuccessCallbackReference;
    me.setFailureCallbackReference = setFailureCallbackReference;    
    me.setUrl = setUrl;
    me.addTagIdToHideDuringProgress = addTagIdToHideDuringProgress;
    me.addTagIdToShowDuringProgress = addTagIdToShowDuringProgress;   
    
    me.setSilentMode = setSilentMode;
     
       
    
    function setClearBackStack(clearBackStack) {
        me.asyncRequest.clearBackStack = clearBackStack;
    }
    
    function setAsyncMode(asyncMode) {
        me.asyncRequest.asyncMode = asyncMode;
    }
     
    me.asyncRequest.successCallbackReference = "";
    function setSuccessCallbackReference(successCallbackReference) {        
        me.asyncRequest.successCallbackReference=successCallbackReference;        
    }
    
    me.asyncRequest.failureCallbackReference="";
    function setFailureCallbackReference(failureCallbackReference) {
        me.asyncRequest.failureCallbackReference=failureCallbackReference;
    }        
    
    function setUrl(url) {           
        me.asyncRequest.url=url;
    }
    
    function addTagIdToHideDuringProgress(divToHide) {                
        me.asyncRequest.divsToHide [ me.asyncRequest.divsToHide.length ] = divToHide;
    }
    
    function addTagIdToShowDuringProgress(divToShow) {        
        me.asyncRequest.divsToShow[ me.asyncRequest.divsToShow.length ] = divToShow;
    }        
    
    function setSilentMode(smSetting) {
        me.silentMode = smSetting;
    }         
        
    // private functions
    me.showTagsDuringProgress = showTagsDuringProgress;
    me.hideTagsDuringProgress = hideTagsDuringProgress;    
    me.successfulCallbackWrapper = successfulCallbackWrapper;
    me.failureCallbackWrapper = failureCallbackWrapper;
    me.failureNoMetaCapsule = failureNoMetaCapsule;
    me.displayCommunicationErrorAlert = displayCommunicationErrorAlert;
    me.finishFailure = finishFailure;
    me.changeDisplayForProgress = changeDisplayForProgress;
    me.changeDisplayForFinished = changeDisplayForFinished;    
    me.sendToDesktopContext = sendToDesktopContext;      
    me.signInPageFound = signInPageFound;    
            
    function signInPageFound(responseDOMObject) {
        var signInPageMarker = domUtil.getChildElement(responseDOMObject,"thisIsTheSignInPage");
        if ( (signInPageMarker != null)&&(typeof signInPageURI != "undefined") ) {
            // Session has timed out. Do a full page refresh to go to the sign in page.
            var divForSignInFormSubmit = document.createElement("div");
            divForSignInFormSubmit.innerHTML="<form name='goToSignInPageForm' action='"+signInPageURI+"' style='display:none;' method='post'></form>";
            $("body").append(divForSignInFormSubmit);            
            var signInFormSubmit = domUtil.getChildElement(divForSignInFormSubmit,"goToSignInPageForm");
            signInFormSubmit.submit();                                    
            return true;
        }
        return false;
    }
    
    function showTagsDuringProgress(divIdArray) {
        for( var x=0; x < divIdArray.length; x++ ){
            if(domUtil.getElement(divIdArray[x]) != null ){
                domUtil.showElement(divIdArray[x]);
            }
        }        
    }
    
    function hideTagsDuringProgress(divIdArray) {    
        for( var x=0; x < divIdArray.length; x++ ){
            if(domUtil.getElement(divIdArray[x]) != null ){
                domUtil.hideElement(divIdArray[x]);
            }
        }  
    }        
    
    function successfulCallbackWrapper(responseText) {
        
        // provide an alert for exceptions
        try {
            
            // create object so that architecture of response matches failure
            var responseObject = new Object();
            
            // when testing with local html files they will come back as documents instead of text
            // so convert them
            if (responseText instanceof Document) {
                responseObject.responseText = xmlToString(responseText);
            }
            else {
                responseObject.responseText = responseText;
            }
           
            if (typeof asyncDebugMode != "undefined") {            
                if (asyncDebugMode == true) {                
                    writeAsyncHTMLResponseText(responseObject.responseText);
                }
            }
                        
            // initialize result types            
            var responseDOMObject = null;
            var metaCapsuleObject = null;
             
            responseDOMObject = document.createElement("div");
            responseDOMObject.innerHTML=responseObject.responseText;
            
            metaCapsuleObject = $(responseDOMObject).find(".metaCapsule")[0];
            
            // for static mode always replace the id with the url
            if (staticPage) {
                metaCapsuleObject.id=me.asyncRequest.url;
                // default capsule type if not there
                if (metaCapsuleObject.getAttribute("capsuleType")==null) {
                    metaCapsuleObject.setAttribute("capsuleType","inline");
                }
            }
            
            if ((metaCapsuleObject==undefined)||(metaCapsuleObject==null)) {                                
                // check for session timeout on the server side (see if the sign in screen was returned)
                if (me.signInPageFound(responseDOMObject)) {
                    return;
                }
                me.failureNoMetaCapsule(responseObject);
                me.finishFailure(responseObject);                
                return;
            }
                                                                      
            // error page                              
            if ((metaCapsuleObject.getAttribute("errorPage")!=null)&&(metaCapsuleObject.getAttribute("errorPage").toUpperCase()=="TRUE")) {
                me.sendToDesktopContext(metaCapsuleObject,responseObject.responseText);
                me.finishFailure(responseObject); 
                return;
            }
            
            // clear the backstack if the developer specified it
            if (me.asyncRequest.clearBackStack==true) {
                desktopContext.initialize();                
            }
                
            var incomingCapsuleType = metaCapsuleObject.getAttribute("capsuleType");
            
            var jsonCapsule = (incomingCapsuleType.toUpperCase()=="JSON");
            
            if (!jsonCapsule) {                            
                me.sendToDesktopContext(metaCapsuleObject,responseObject.responseText);
                                        
                // if css styles are to be modified by js then override this js function with one
                // that does something
                applyGlobalJs(metaCapsuleObject);
            }  
                      
            // execute developer defined callback                                   
            if ((me.asyncRequest.successCallbackReference!=null)&&(me.asyncRequest.successCallbackReference!="")&&(metaCapsuleObject.getAttribute("skipCallBack")!="true")) {
                try {
                    var returnObject = metaCapsuleObject;
                    if (jsonCapsule) {
                        returnObject = JSON.parse(metaCapsuleObject.innerHTML);
                    }
                    me.asyncRequest.successCallbackReference(returnObject);
                }
                catch (e) {
                    alert("Exception in successful callback.  URL = " + me.asyncRequest.url);
                    throw(e);
                }                
            }  
                                              
            me.changeDisplayForFinished();           
        }
        catch (e) {
            me.changeDisplayForFinished();
            alert(e.name + ": " + e.message);
            throw(e);
        }
                         
    }
                   
    function sendToDesktopContext(capsuleObject,responseText) {        
        if (capsuleObject!=null) {
            // unconditionally always save original request
            // this allows for dynamic marking of a view for reload             
            $(capsuleObject).data("originalRequest",me.asyncRequest); 
           
            desktopContext.injectNewCapsule(capsuleObject,me.browserBackButtonDriven,responseText);                                   
        }                                                  
    }        
    
    function displayCommunicationErrorAlert(communicationsErrorMessage, responseObject) {                           
                
        // set message
        var communicationErrorMessageObject = domUtil.getElement("communicationErrorMessage");
        
        if (communicationErrorMessageObject==null) {
            alert(communicationsErrorMessage);            
        }
        else {        
            domUtil.setText(communicationErrorMessageObject,communicationsErrorMessage);
            
            var communicationErrorAlertWrapperObject = domUtil.getElement("communicationErrorAlertWrapper");
            
            // make the error alert appear above all other modals
            var modalTargetLevel = desktopContext.calculateNextModalTargetLevel();
            var dialogLayer = domUtil.getChildElement(communicationErrorAlertWrapperObject,"dialogLayer");
            $(dialogLayer).css("z-index",modalTargetLevel);
            domUtil.showElement(communicationErrorAlertWrapperObject);    
        }            
    }
    
    function failureNoMetaCapsule (responseObject) {
        if (me.silentMode) {            
            return false;
        }
        
        var communicationsErrorMessage = "Error: Metacapsule missing. \n Attempted : "+me.asyncRequest.url;        
        me.displayCommunicationErrorAlert(communicationsErrorMessage, responseObject);
    }
                           
    
    // http failures
    function failureCallbackWrapper(responseObject,textStatus) {
        
        // browsers are trying to be too smart with local files
        // if the browser tried to parse it and failed lets just call it successful ;)
        if (textStatus=="parsererror") {
            me.successfulCallbackWrapper(responseObject.responseText);
            return;       
        }
        
        if (me.silentMode) {                      
            return false;
        }
             
        // provide an alert for exceptions
        try {                                                                           
        
            if (textStatus == "timeout") {
                //request was aborted due to timeout
                var timeoutMessage = "Async call timed out.";
                me.displayCommunicationErrorAlert(timeoutMessage, responseObject);                
            }                                             
            
            // all other unknown http error codes
            if((responseObject.status != 200)&&(responseObject.status != 202)) {
                var communicationsErrorMessage = " HTTP error : " + responseObject.status+" : " + responseObject.statusText + "\n Attempted:"+me.asyncRequest.url;                                    
                me.displayCommunicationErrorAlert(communicationsErrorMessage, responseObject);                                                                          
            }
            
            me.finishFailure(responseObject);
        }
        catch (e) {
            me.finishFailure(responseObject);
            alert(e.name + ": " + e.message);
            throw(e);
        }                                   
    }
    
    function finishFailure(responseObject) {
                             
        if (me.asyncRequest.failureCallbackReference!="") {
            try {            
                me.asyncRequest.failureCallbackReference(responseObject);
            }
            catch (e) {
                me.changeDisplayForFinished();
                alert(e.name + ": " + e.message);
                throw(e);
            }
        }
     
        me.changeDisplayForFinished();        
    }
    
    function changeDisplayForProgress() {
        if (me.silentMode) {
            return false;
        }
                                
        var blockInteractionWithPageId = "blockInteractionWithPage";
        var blockInteractionWithPage = domUtil.getElement(blockInteractionWithPageId);
        if (blockInteractionWithPage==null) {
            blockInteractionWithPage = document.createElement("div");
            blockInteractionWithPage.id=blockInteractionWithPageId;                        
            $("body").append(blockInteractionWithPage); 
            $(blockInteractionWithPage).addClass("BlockInteractionWithPage");
        }
    
        // raise above all modals
        var nextModalTargetLevel = desktopContext.calculateNextModalTargetLevel();
        $(blockInteractionWithPage).css("z-index",nextModalTargetLevel+20);
        domUtil.showElement(blockInteractionWithPage);
                    
        hideTagsDuringProgress(me.asyncRequest.divsToHide);
        showTagsDuringProgress(me.asyncRequest.divsToShow);
        
        document.documentElement.style.cursor = "wait";                   
    }
    
    function changeDisplayForFinished() {
        if (me.silentMode) {
            return false;
        }
        // return cursor to pointer
        document.documentElement.style.cursor = "";
                                          
        // change back progress screen
        domUtil.hideElement("blockInteractionWithPage");
        hideTagsDuringProgress(me.asyncRequest.divsToShow);
        showTagsDuringProgress(me.asyncRequest.divsToHide);                                       
    }         
       
    
    // public functions
    me.submitReload = submitReload;    
    me.submitAsync = submitAsync;    
    me.submitAsyncForm = submitAsyncForm;
    me.serializeForm = serializeForm;
    
    function submitReload(capsuleToShow,browserBackButtonDrivenParam) {
        if (browserBackButtonDrivenParam!=undefined) {
            me.browserBackButtonDriven=browserBackButtonDrivenParam;
        }
        var asyncRequestObject = $(capsuleToShow).data("originalRequest");
        if ((asyncRequestObject != null)&&(asyncRequestObject != undefined)) {
            me.asyncRequest = asyncRequestObject;
            me.submitAsync(me.asyncRequest.parameters,true);
        }
    }
            
    // send parameters only  
    function submitAsync(parameters, acceptString) {
        // url  = the action name with no leading slash
        // async =  true or false
        // sendMethod = get or post
        // parameters= AyncParamtersList object or string starting with & or undefined
        // successCallbackReference = name of callback function with no enclosing quotes and no parenthesis
        // failureCallbackReference = same idea as success callback
        
        // check to make sure parameter list type is valid
        if (acceptString==undefined) {
            if (parameters instanceof AsyncParametersList) {
                // type is morphed here
                parameters = parameters.getParameterList();    
            }
            else {
                if (parameters==undefined) {
                    parameters = "";
                }
            }
        }        
        if (me.asyncRequest.url==undefined) {
            alert("Error webapi.submitAsync: url undefined");
            return;
        }        
        if (parameters==undefined) {
            alert("Error webapi.submitAsync: parameters undefined");
            return;
        }                
        if (me.asyncRequest.successCallbackReference==undefined) {
            alert("Error webapi.submitAsync: successCallbackReference undefined");
            return;
        }
        if (me.asyncRequest.failureCallbackReference==undefined) {
            alert("Error webapi.submitAsync: failureCallbackReference undefined");
            return;
        }        
                                                                                                                                
        // store parameters in request object
        me.asyncRequest.parameters = parameters;                      
                                     
        changeDisplayForProgress();
        
        var parameterList=parameters;
        if ( (typeof pageLoadTimeStamp != "undefined")&&(pageLoadTimeStamp!="") ) { 
            parameterList = parameterList+"&pageLoadTimeStamp="+pageLoadTimeStamp;        
        }
        var sendMethod = "post";
        if (staticPage) {
            sendMethod = "get";
        }
       
        // send request
        $.ajax({type:sendMethod,url:me.asyncRequest.url,data:parameterList,async:me.asyncRequest.asyncMode,datatype:'html',error:me.failureCallbackWrapper,success:me.successfulCallbackWrapper});                
    }
            
    // send a form
    // additionalParameters can be optionally sent with leading &
    // It is the developers responsibility to make sure the additional parameter string is encoded.
    // Additional parameters will rarely if ever be user entered, so encoding them is not enforced in the system.
    function submitAsyncForm(formName,additionalParameters) {
        
        var parameterString = me.serializeForm(formName);
                       
        if (additionalParameters != undefined) {
            parameterString = parameterString + additionalParameters;
        }       
        me.submitAsync(parameterString,"true");        
    }
    
    function serializeForm(formName) {
        var formObject = domUtil.verifyElementExists(formName);
        if (formObject==null) {
            throw "Could not serialize form "+formName+".";
        }
        var parameterString = $(formObject).serialize();
        
        // jquery serialize leaves out unchecked boxes so add them
        // fortunately check box values do not need to be url encoded
        var inputs = domUtil.getChildElementsByType(formObject,"input");               
        for( var x = 0; x < inputs.length; x++ ){
            var element = inputs[ x ];
            var elementType = element.type;
            if( elementType == "checkbox" ){
                if (element.checked != true) {                    
                    parameterString = parameterString + "&" + element.name + "=false";
                }
            }                                   
        }
        
        return parameterString;
    }        
    
}

// supporting external static functions -----------------------------------------------


function AsyncParametersList() {
    var parameterList = "";
    
    this.addParameter = addParameter;
    this.getParameterList = getParameterList;
    this.setParameterList = setParameterList;
    this.addParameterList = addParameterList;
    
    function addParameter(parameterName,parameterValue) {
        parameterList = parameterList + "&"+parameterName+"="+encodeURIComponent(parameterValue);            
    }
    
    function addParameterList(parameterListAdded) {
        parameterList = parameterList + parameterListAdded;            
    }
    
    function getParameterList() {
        return parameterList;
    }
    
    // should normally not be used to add parameters, because it does not encode them
    // only to be used to copy parameters from a different parameter list object
    function setParameterList(paramList) {
        parameterList=paramList;
    }
}


function restoreAsyncResponse(capsuleId) {
    // restore original view of this block
    var capsuleObject = domUtil.getElement(capsuleId);
    var responseText = $(capsuleObject).data("responseText");
    
    if (responseText==null) {
        alert("restoreAsyncResponse method found no reponse text.");
        return;
    }        
    
    var webapi = new Webapi();
    var originalRequest = $(capsuleObject).data("originalRequest");
    webapi.setSuccessCallbackReference(originalRequest.successCallbackReference);
    webapi.successfulCallbackWrapper(responseText);    
}

function writeAsyncHTMLResponseText(responseText) {
    var asyncDebugDivContainerId = "asyncDebugDivContainer";
    var asyncDebugDivContainer = domUtil.getElement(asyncDebugDivContainerId);
    if (asyncDebugDivContainer==null) {
        asyncDebugDivContainer = document.createElement("div");
        asyncDebugDivContainer.id=asyncDebugDivContainerId;
        
        var debugDivHTML =            "<div id='asyncDebugDiv' class='AsyncDebugDiv' style='position:relative;'>";
        debugDivHTML = debugDivHTML + "<table>";
        debugDivHTML = debugDivHTML + "<tr>";
        debugDivHTML = debugDivHTML + "<td>";
        debugDivHTML = debugDivHTML + "<a href='#' onclick='showHideAsyncHTMLResponseText(); return false;'>View/Hide Last Async Response Text</a>";
        debugDivHTML = debugDivHTML + "</td>";
        debugDivHTML = debugDivHTML + "</tr>";
        debugDivHTML = debugDivHTML + "<tr>";
        debugDivHTML = debugDivHTML + "<td>";
        debugDivHTML = debugDivHTML + "<textarea id='asyncDebugResponseTextArea' style='display:none;' wrap='off' readonly='true' ></textarea>";
        debugDivHTML = debugDivHTML + "</td>";
        debugDivHTML = debugDivHTML + "</tr>";
        debugDivHTML = debugDivHTML + "</table>";
        debugDivHTML = debugDivHTML + "</div>";                
        
        asyncDebugDivContainer.innerHTML=debugDivHTML;
        
        $("body").append(asyncDebugDivContainer);
    }
    
    // raise above all modals
    var nextModalTargetLevel = desktopContext.calculateNextModalTargetLevel();
    var asyncDebugDiv = domUtil.getChildElement(asyncDebugDivContainer,"asyncDebugDiv");
    $(asyncDebugDiv).css("z-index",nextModalTargetLevel+10);
    
    // set text
    var asyncDebugResponseTextArea = domUtil.getChildElement(asyncDebugDivContainer,"asyncDebugResponseTextArea");        
    domUtil.setText(asyncDebugResponseTextArea,responseText);                  
}

function showHideAsyncHTMLResponseText() {
    var asyncHTMLResponseTextDiv = domUtil.getElement("asyncDebugResponseTextArea");
    
    if (domUtil.elementVisible(asyncHTMLResponseTextDiv)) {
        domUtil.hideElement(asyncHTMLResponseTextDiv);             
    }
    else {
        domUtil.showElement(asyncHTMLResponseTextDiv);  
    }            
}

function xmlToString(xmlData) {
    var xmlString;
    //IE
    if (window.ActiveXObject){
        xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else{
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
} 

function getURLFileName(pathname) {
    //var pathname = window.location.pathname;    
    return pathname.substring(pathname.lastIndexOf("/")+1,pathname.length);
}  

function getStaticContent(fileName,automatedNavigation) {
    if (!staticPage) {
        alert("getStaticContent() can only be used in a static page application.");
        return;
    }
       
    if (currentHashId==fileName) {
        return false;
    }
    
    // this handles the situation where the user started in another website
    // then entered into 
    // our website through a static entry page
    // then went back to the other website
    // then came forward again into our website (depth is wrong at this point because it is the entry page with no event)
    // then navigated in our website
    // going automatically forward corrects the index on the entry page upon the first navigation
    // this has to be done "late" because there is no event when the user came forward back into our site
    if (!automatedNavigation) {       
        if (isStaticEntryPage()) {            
            newHashIdAdded=true;            
            window.history.go(1);
        }
    }
     
    var webapi = new Webapi();
    webapi.setUrl(fileName);
    webapi.submitAsync();
    return false;
}   

function applyGlobalJs(parentObject){
    // does nothing, override this functionality with custom logic
    // by defining the js logic for it in a file included after the webapi.js file
}