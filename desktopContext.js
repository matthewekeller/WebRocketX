// Copyright 2021 to WebRocketX under the
// GNU LESSER GENERAL PUBLIC LICENSE Version 2.1
// See license file for more details

// version 1.8  06/25/2022

// hash change event management
var currentHashId = "";
var lastHashId = "";
var currentHistoryIndex = ""
var lastHistoryIndex = "";
var doHashChangeNavigation = true;
var popTheHash = false;
var newHashIdAdded = false;
var staticEntryDisplayedHash = "";

// globals
var navigationEnabled = true;
var desktopContext = null;

$(document).ready(function(){        
    if ((typeof disableNavigation != "undefined")&&(disableNavigation==true)) {
    	navigationEnabled = false;
    }
    
	desktopContext = new DesktopContext();
	
	if (navigationEnabled) {
	    if (typeof staticPage == "undefined") {
	        alert("The staticPage global variable must be set to true or false in the welcome page.");
	        return;
	    }
	    bindHashChange();
	    registerLandingPage();
	}
});

function isStaticEntryPage() {
    //alert("lastHistoryIndex="+lastHistoryIndex); 
    var displayedHash = window.location.hash;
    if (displayedHash.indexOf("?")== -1) {
        return true;
    }    
    if ((displayedHash==staticEntryDisplayedHash)&&(lastHistoryIndex==0)) {
        return true;
    } 
    return false;
}

function registerAndReinjectInlineCapsule(desktopContext,startingTarget,startingCapsule) {
    var startingCapsuleText = startingTarget.innerHTML;                      
    desktopContext.injectNewCapsule(startingCapsule,false,startingCapsuleText);
}

function registerLandingPage() {    
    
    var startingTarget = $(".startingTarget")[0];
    if ((startingTarget!=undefined)&&(startingTarget!=null)) {
        var startingCapsule = $(startingTarget).find(".metaCapsule")[0]
        if ((startingCapsule!=undefined)&&(startingCapsule!=null)) {            
                                   
            if ( staticPage ) {
                //debugger;
                staticEntryDisplayedHash = window.location.hash; // only set here
                
                var displayedHashId = getDisplayedHashID(); 
                if ( (displayedHashId=="") || (displayedHashId==startingCapsule.id) ) {
                    startingCapsule.setAttribute("capsuleType","inline");
                    registerAndReinjectInlineCapsule(desktopContext,startingTarget,startingCapsule);                                                              
                }
                else {
                    getStaticContent(displayedHashId,true);
                }
                                
            }
            else {
                registerAndReinjectInlineCapsule(desktopContext,startingTarget,startingCapsule);
            }            
        }
    }
    
    applyGlobalJs(document.body);
}

function reRegisterLandingPageAtEntryPoint(popTheHashParam) {    
    // we have returned to the landing page before the original registration
    // and we also can go back no further because this code would have not had a chance to execute
    // after the go(-1)
    // so re-register
    var displayedHashIdLocal = getDisplayedHashID();
    if (displayedHashIdLocal=="") {
        //alert("re-register");
        popTheHash=popTheHashParam;
        registerLandingPage();                                
    }   
}

function bindHashChange() {    
    $(window).bind( "hashchange", function() {
	    //debugger;             
	    var displayedHashId = getDisplayedHashID();
	    var displayedHistoryIndex = getDisplayedHistoryIndex();
	    
	    try {                
	        dtNavigationCallback();               
	    }
	    catch (e) {
	        // fail silently, don't let developer mistakes bring down the whole framework
	    } 
	                               
	    if (newHashIdAdded) {
	        // hash change is caused by new injection
	        
	        lastHashId = currentHashId;
	        lastHistoryIndex = currentHistoryIndex;
	        
	        currentHashId = displayedHashId;
	        currentHistoryIndex = displayedHistoryIndex;
	        
	        newHashIdAdded = false;
	    }
	    else {
	    
	        if (doHashChangeNavigation) {
	            if (staticPage) {
	                //debugger;
	                lastHashId = currentHashId;
	                lastHistoryIndex = currentHistoryIndex;
	        
	                currentHashId = displayedHashId;
	                currentHistoryIndex = displayedHistoryIndex;
	                
	                if (isStaticEntryPage()) {
	                    doHashChangeNavigation=false;
	                    window.history.go(-1);
	                    
	                    // we have returned to the landing page before the original registration
	                    // and we also can go back no further because this code would have not had a chance to execute
	                    // after the go(-1)
	                    // so re-register
	                    registerLandingPage();
	                    return;                     
	                }                                              
	                desktopContext.setCapsuleByHashDepth(displayedHistoryIndex);                         
	                          
	            } // staticPage
	            // dynamic page                    
	            else {
	                var historyStack = desktopContext.getDeskTopHistory();
	                var topStackId = historyStack[historyStack.length-1].id;   
	                if (popTheHash==true) {                
	                    lastHashId = currentHashId;
	                    currentHashId = displayedHashId; 
	                    if (topStackId==displayedHashId) {                    
	                        popTheHash=false;
	                        return;                               
	                    }
	                    else {
	                        window.history.go(-1);
	                        return;
	                    }            
	                }
	                else {                           
	                    // a back or forward button browser button was pressed 
	                    // debugger;                                              
	                    if (historyStack.length > 0) {
	                        var previousStackId = desktopContext.getPreviousStackId();
	                                                                                                                    
	                        if (previousStackId==displayedHashId) {
	                            // a back button was pressed
	                            lastHashId = currentHashId;
	                            currentHashId = displayedHashId;                                                                                                        
	                            desktopContext.back(true);
	                            return;                                                                                           
	                        }
	                        else {
	                            // debugger;  
	                            // this is the browser forward button or a back after a menu selection (including an init)
	                            if (lastHashId==displayedHashId) {                                                                                                      
	                                // this is a browser forward button so roll back so that no pop is made
	                                doHashChangeNavigation=false;
	                                window.history.go(-1);
	                                
	                                // we have returned to the landing page before the original registration
	                                // and we also can go back no further because this code would have not had a chance to execute
	                                // after the go(-1)
	                                // so re-register
	                                reRegisterLandingPageAtEntryPoint(popTheHash);
	                                                            
	                                return;    
	                            }                        
	                            else {                            
	                                // just keep on going back until we step out of the capsulework
	                                popTheHash=true;
	                                window.history.go(-1);
	                                
	                                // we have returned to the landing page before the original registration
	                                // and we also can go back no further because this code would have not had a chance to execute
	                                // after the go(-1)
	                                // so re-register
	                                reRegisterLandingPageAtEntryPoint(false); // conditionally modifies popTheHash
	                                                            
	                                return;
	                            }                                            
	                        }
	                    } // something in the history stack                                           
	                } // a back or forward button browser button was pressed 
	            } // dynamic Page                
	        } // doHashChangeNavigation
	    } // new hash id not added
	              
	    doHashChangeNavigation = true;             
	});
	
} // bindHashChange


function getDisplayedHistoryIndex() {
    var displayedHash = window.location.hash;
    var indexStart = displayedHash.lastIndexOf("?d=");
    var historyIndex = 0;
    if (indexStart != -1) {
        historyIndex = displayedHash.substring(indexStart+3);
    }    
    return historyIndex;
}


function getDisplayedHashID() {
    var displayedHash = window.location.hash;
    var displayedHashId =  displayedHash.replace("#nav=","");
    if (staticPage) {
        var paramStartLocation = displayedHashId.indexOf("?");
        if (paramStartLocation != -1) {
            displayedHashId = displayedHashId.substring(0,paramStartLocation);
        }
    }    
    return displayedHashId;    
}

function DesktopContext(){
    
    var thisInstance = this;
               
    //public vars
    thisInstance.activeCapsule = null;
    
    //private vars
    var attributeArray = new Array();
    var deskTopHistoryArray = new Array();
    
    // methods
    thisInstance.getDeskTopHistory = getDeskTopHistory;
    thisInstance.setAttribute=setAttribute;
    thisInstance.getAttribute=getAttribute;        
    
    thisInstance.initialize = initialize;        
    
    thisInstance.idPresentInHistory = idPresentInHistory;
    thisInstance.getDeskTopHistoryObject = getDeskTopHistoryObject;
    thisInstance.latestCapsuleIsTracked = latestCapsuleIsTracked;
    thisInstance.calculateNextModalTargetLevel = calculateNextModalTargetLevel;
    thisInstance.generateModalTarget = generateModalTarget;
    
    thisInstance.setCapsuleInTarget = setCapsuleInTarget;
    thisInstance.addCapsuleToPage = addCapsuleToPage;        
    thisInstance.injectCapsule = injectCapsule;
    thisInstance.injectNewCapsule = injectNewCapsule;
    thisInstance.setCapsuleById = setCapsuleById;
    thisInstance.setCapsuleByHashDepth = setCapsuleByHashDepth;
    thisInstance.getPreviousStackId = getPreviousStackId;
    thisInstance.back = back;    
    thisInstance.processJsOnload = processJsOnload;
    thisInstance.setPageTitle = setPageTitle;
    thisInstance.safeRemoveAllChildElements = safeRemoveAllChildElements;
    
    function safeRemoveAllChildElements(targetObject) {
    	// use remove first child, which contains a direct DOM call, then remove all children using a jquery based call
        // the reason to do this is because jquery destroys all data attributes and events when executing empty, even when
        // the entire dom object has other references
        domUtil.removeFirstChildElement(targetObject);
        domUtil.removeAllChildElements(targetObject);
    }
    
    function getDeskTopHistory() {
        return deskTopHistoryArray;
    } 
            
    function setAttribute(id,object) {
        attributeArray.put(id,object);
    }
    
    function getAttribute(id) {
        return attributeArray.get(id);
    }                        
        
    function initialize() {
        if (staticPage) {
            alert("initialize() not supported for static pages.");
            return;
        };
        
        // truncate history down to the welcome page               
        while (deskTopHistoryArray.length>1){
            var deskTopHistoryObject = deskTopHistoryArray.pop();
            thisInstance.safeRemoveAllChildElements(deskTopHistoryObject.getAttribute("targetId"));          
        }
        
        attributeArray = new Array();        
        
        currentHashId = "";
        lastHashId = "";
        doHashChangeNavigation = true;
        newHashIdAdded = false;
        popTheHash=true;
        window.history.go(-1);
    }
    
    function idPresentInHistory(id) {
        for(var i=0; i < deskTopHistoryArray.length; i++) {
            if (deskTopHistoryArray[i].id == id)  {
                return true;
            }
        }
        return false;
    }
    
    function getDeskTopHistoryObject(id) {
        for(var i=0; i < deskTopHistoryArray.length; i++) {
            var historyObject = deskTopHistoryArray[i];
            if (historyObject.id == id)  {
                return historyObject;
            }
        }
        return null;
    }
    
    // The timing of the calling of this function will affect its outcome
    function latestCapsuleIsTracked() {       
        var currentCapsuleId = thisInstance.activeCapsule.id;
        var idOnTopOfHistoryStack = deskTopHistoryArray[deskTopHistoryArray.length-1].id;
                
        if (currentCapsuleId==idOnTopOfHistoryStack) {
            return true;
        }
        return false;
    } 
    
    function calculateNextModalTargetLevel() {
        // find most recent modal object
        var mostRecentModalHistoryObject = null;
        for(var i=0; i < deskTopHistoryArray.length; i++) {
            var historyObject = deskTopHistoryArray[i];
            if (historyObject.getAttribute("capsuleType").toUpperCase()=="MODAL")  {
                mostRecentModalHistoryObject = historyObject;
            }
        }
        
        // calculate next modal target level
        var modalTargetLevel = 10;
        if (typeof modalTargetSpacing != "undefined") {
            modalTargetLevel = modalTargetSpacing;             
        } 
        if (mostRecentModalHistoryObject != null) {
            modalTargetLevel = parseInt(mostRecentModalHistoryObject.getAttribute("modalTargetLevel")) + modalTargetLevel;
        }
        
        return modalTargetLevel;
    }
    
    function generateModalTarget() {
        //debugger;
        var modalTargetLevel = thisInstance.calculateNextModalTargetLevel();
        
        // add new div to body if not already existing
        var modalTargetId = "modalTarget"+modalTargetLevel;
        var modelTargetDiv = domUtil.getElement(modalTargetId);
        if (modelTargetDiv==null) {
            var newDiv = document.createElement("div");
            newDiv.id=modalTargetId;
            $("body").append(newDiv);
        }
                       
        // return info.
        var modalTargetInfo = new Object();
        modalTargetInfo.targetId = modalTargetId;
        modalTargetInfo.targetLevel = modalTargetLevel;
        return modalTargetInfo;
    }
    
    function setCapsuleInTarget(capsuleObject) {
        var targetId  = capsuleObject.getAttribute("targetId");
        var targetObject = domUtil.getElement(targetId);
        
        // use remove first child, which contains a direct DOM call, then remove all children using a jquery based call
        // the reason to do this is because jquery destroys all data attributes when executing empty, even when
        // the entire dom object has other references
        thisInstance.safeRemoveAllChildElements(targetObject);
        domUtil.appendChildElement(targetObject,capsuleObject);
    }
   
    function addCapsuleToPage(incomingCapsuleObject) {
        // add capsule and history
        if ( (incomingCapsuleObject.getAttribute("trackPage") == null) || (incomingCapsuleObject.getAttribute("trackPage") == "") || (incomingCapsuleObject.getAttribute("trackPage").toUpperCase() == "TRUE") ) {                                                  
            deskTopHistoryArray.push(incomingCapsuleObject);
            
            // uncomment for debugging
            /*
            var qsummary = "";
            for(var qi=0; qi < deskTopHistoryArray.length; qi++) {
                var qcomponent = deskTopHistoryArray[qi];
                qsummary = qsummary + "|" +qi+"="+qcomponent.id;
            }
            alert(qsummary);
            */
        }                                                                       
                          
        thisInstance.setCapsuleInTarget(incomingCapsuleObject);
        
        thisInstance.activeCapsule = incomingCapsuleObject;               
        
        thisInstance.setPageTitle(incomingCapsuleObject)               
    }
    
    function setPageTitle(capsuleObject) {
        if ((capsuleObject.getAttribute("windowTitle") != null) && (capsuleObject.getAttribute("windowTitle") != "")) {
            document.title = capsuleObject.getAttribute("windowTitle");
        }     
    }
     
    function injectCapsule(incomingCapsuleObject,browserBackButtonDriven,context) {
        var incomingCapsuleId = incomingCapsuleObject.id;    
        var incomingCapsuleType = incomingCapsuleObject.getAttribute("capsuleType");
        var incomingTargetId  = incomingCapsuleObject.getAttribute("targetId");
                
        if ((incomingCapsuleId==null)||(incomingCapsuleId=="")) {
            alert("Capsule id is required.");
            return;
        }
        
        if ((incomingCapsuleType==null)||(incomingCapsuleType=="")) {
            alert("Capsule type is required.");
            return;
        }
        
        if (incomingCapsuleType.toUpperCase()=="INLINE") {
            if ((incomingTargetId==null)||(incomingTargetId=="")) {
                alert("Target id is required for inline capsule types.");
                return;
            }
        }
                
        if (incomingCapsuleType.toUpperCase()=="MODAL") {
            if (staticPage) {
                alert("Modal not currently supported for static pages.");
                return;
            }
            
            var modalTargetInfo = thisInstance.generateModalTarget();                     
            incomingCapsuleObject.setAttribute("targetId",modalTargetInfo.targetId);
            incomingTargetId = modalTargetInfo.targetId;
            incomingCapsuleObject.setAttribute("modalTargetLevel",modalTargetInfo.targetLevel);
            var dialogLayer = domUtil.getChildElement(incomingCapsuleObject,"dialogLayer");
            $(dialogLayer).css("z-index",modalTargetInfo.targetLevel);
        }
          
        // the only time we come in here for a static page is to inject a new capsule 
        if (staticPage) {
                     
            // sometimes this is left over in the browser memory when moving
            // forward with static pages,  so make sure it is false upon the first injection         
            popTheHash=false;
                                              
            // trim history to current depth
            var historyIndex = getDisplayedHistoryIndex();
            var backSize = parseInt(historyIndex)+1;
            while (deskTopHistoryArray.length>backSize){                
                var deskTopHistoryObject = deskTopHistoryArray.pop();                       
                thisInstance.safeRemoveAllChildElements(deskTopHistoryObject.getAttribute("targetId"));
            }                                    
            
            thisInstance.addCapsuleToPage(incomingCapsuleObject) ; 
            window.scrollTo(0,0);
            
            currentHistoryIndex = deskTopHistoryArray.length-1;
            
            var newWindowLocation = "#nav=" + incomingCapsuleId +"?d="+currentHistoryIndex;
            var currentWindowLocation = window.location.hash;
            
            // in cases the window location doesn't actually change so newHashIdAdded variable 
            // setting can be left over which will cause logic problems down the road
            // therefore, only set this variable to avoid doing something on the hash change event if the hash is actually changing
            // debugger;
            if (newWindowLocation!=currentWindowLocation) {
                newHashIdAdded = true;
            }
            
            window.location = newWindowLocation;
        }
        // dynamic page
        else {
            var idInHistory = thisInstance.idPresentInHistory(incomingCapsuleId);
                        
            // Update hash with capsule id
            // Only update if not going back
            if ( !idInHistory ) {
                newHashIdAdded = true;                                                            
                window.location = "#nav=" + incomingCapsuleId;                                                 
            }                      
            else {
                // Remove everything in history since last visit
                // including removing the incoming page id if context is a fresh injection 
            	// do not remove incoming page id if we are just re-adding it because it will strip the events from the nodes
                var foundId = false;      
                while (!foundId){
                    var deskTopHistoryObject = deskTopHistoryArray.pop();
                    if (deskTopHistoryObject.id==incomingCapsuleId) {
                        foundId = true;
                    } 
                    if ((!foundId)||(context=="injectNewCapsule")) {
                    	thisInstance.safeRemoveAllChildElements(deskTopHistoryObject.getAttribute("targetId"));
                    }
                }
            }
            
            thisInstance.addCapsuleToPage(incomingCapsuleObject);
            
            // don't pop the hash if the browser back button was the source of this pop
            if (!browserBackButtonDriven) {
                // possibly pop the hash if this existed previously in history       
                if ( idInHistory ) {
                    // do not pop the hash if this was a replacement at the top of the hash
                    if (incomingCapsuleId!=currentHashId) {
                        popTheHash = true;
                        window.history.go(-1); 
                    }
                }
            }                                        
        } // dynamic page
                                          
    }
    
    function injectNewCapsule(capsuleObject,browserBackButtonDriven,responseText) {
        if ((capsuleObject.getAttribute("saveResponse")!=null)&&(capsuleObject.getAttribute("saveResponse").toUpperCase() == "TRUE")) {
            $(capsuleObject).data("responseText",responseText);                        
        }
                
        // If we come into here as data it means that we don't want to auto inject 
        // but we still might want to process the jsOnload.
        // In fact this is the mechanism for writing an error to the page header
        // or do any other type of system wide custom server side error handling.
        if (capsuleObject.getAttribute("capsuleType").toUpperCase() != "DATA") {          
            thisInstance.injectCapsule(capsuleObject,browserBackButtonDriven,"injectNewCapsule");
        }
        thisInstance.processJsOnload(capsuleObject);        
    }
        
    function setCapsuleById(capsuleId,browserBackButtonDriven) { 
        var capsuleToShow = thisInstance.getDeskTopHistoryObject(capsuleId);        
        if (capsuleToShow != null) {
            var activeCapsule = thisInstance.activeCapsule;
            
            var reloadPage = (capsuleToShow.getAttribute("reloadPage") != null) && (capsuleToShow.getAttribute("reloadPage").toUpperCase() == "TRUE");
            var skipReloadPageOnPrevious = (activeCapsule.getAttribute("skipReloadPageOnPrevious") != null) && (activeCapsule.getAttribute("skipReloadPageOnPrevious").toUpperCase() == "TRUE");
            
            if (reloadPage && !skipReloadPageOnPrevious ) {                
                   
                var asyncRequestObject = $(capsuleToShow).data("originalRequest");                                                            
                                                            
                //make new ajax call                    
                var webapi = new Webapi();                    
                webapi.submitReload(capsuleToShow,browserBackButtonDriven);
                
            } else {                
                thisInstance.injectCapsule(capsuleToShow,browserBackButtonDriven,"setCapsuleById");
            }
        } else {
            //handle appropriately
            alert("setCapsuleById called with invalid id: " + capsuleId);
        }
    } 
    
    function setCapsuleByHashDepth(displayedHistoryIndex) {
        var capsuleObject = deskTopHistoryArray[displayedHistoryIndex]; 
        // is the user monkeys with the hash just return from where we came from
        if (capsuleObject == undefined) {
            doHashChangeNavigation=false;
            window.history.go(-1);
            return;
        }             
        thisInstance.setCapsuleInTarget(capsuleObject); 
        thisInstance.setPageTitle(capsuleObject);                         
    }       
    
    function getPreviousStackId() {
        var previousStackId = "";                             
        if (deskTopHistoryArray.length > 1) {
            previousStackId = deskTopHistoryArray[deskTopHistoryArray.length - 2].id;
        }
        else {
            // We have some untracted pages between our current capsule (possibly including current) and the base of the stack,
            // or we are already at the base.            
            // Just get the base of the stack.
            previousStackId = deskTopHistoryArray[0].id;
        }
        return previousStackId;
    }
    
    // Do not call this back directly, it should be called through the browser back button
    // hash change event or through webapiBack
    function back(browserBackButtonDriven) {
        // clear communication error
        $('#communicationErrorAlertWrapper').hide();
        
        if (staticPage) {
            window.history.go(-1);
        }
        else {                    
            var previousStackId = thisInstance.getPreviousStackId();
                
            // will be popped in injectCapsule for cases where latest capsule is tracked 
            // and not a result of browser back button
            thisInstance.setCapsuleById(previousStackId,browserBackButtonDriven);  
        }                                                           
    }
            
    function processJsOnload(capsule) {
        
        // capsule onload
        var onloadMethod = capsule.getAttribute("jsOnload");
        if ( (onloadMethod!=null) && (onloadMethod!="") ) {
            try {                
                var onloadFunctionWrapped = Function("capsule",onloadMethod);
                onloadFunctionWrapped(capsule);                
            }
            catch (e) {
                alert("Javascript onload failed.  Method="+onloadMethod+" Error message="+e.message);
            }
        }                                                                     
    }                                
}

// simplified methods for developer use -----------------------------

function dtBack() {
	desktopContext.back(false);    
}

function dtInit() {
    if (staticPage) {
        alert("dtInit() not supported for static pages.");
        return;
    }
    desktopContext.initialize();    
}

function dtSetCapsuleById(viewId) {
    if (staticPage) {
        alert("dtSetCapsuleById() not supported for static pages.");
        return;
    };
    desktopContext.setCapsuleById(viewId);   
}

function dtNavigationCallback() {
    // provided to the developer so that they can add custom behavior that happens
    // every time a navigation occurs
    // very convient for clearing server side error in the title
    // by default does nothing, override this functionality with custom logic
    // by defining the js logic for it in a file included after the desktopContext.js file
}