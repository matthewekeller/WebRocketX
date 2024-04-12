// Copyright 2023 to WebRocketX under the


// GNU LESSER GENERAL PUBLIC LICENSE Version 2.1
// See license file for more details

// version 1.10.1  07/16/2023

// hash change event management

var currentHashId = "";
var lastHashId = "";
var lastHashBackwardId = "";
var currentHistoryIndex = ""
var lastHistoryIndex = "";
var doHashChangeNavigation = true;
var popTheHash = false;
var popTheHashCallback = null;
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

function clearUntrackedModalsAndErrors(currentHashId) {
	// when user calls this directly to close an untracked modal
	// they should not supply the currentHashId
	// because this will clear the current modal since undefined will not be equal to top stack id
	
	// close all untracked modals that are not the current view
	var untrackedModalsArray = desktopContext.getUntrackedModalsArray();
	if (untrackedModalsArray.length>0) {
		var topStackId = untrackedModalsArray[untrackedModalsArray.length-1].id;
		if (topStackId!=currentHashId) {
			while (untrackedModalsArray.length>0){				
		        var untrackedModalCapsule = untrackedModalsArray.pop();
		        if (untrackedModalCapsule.id!=undefined) {
		        	const element = document.getElementById(untrackedModalCapsule.id);
		        	element.remove();
		        }		                  
		    }
		}
	}
    
	// clear communication error
	$('#communicationErrorAlertWrapper').hide();	
}

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
        	currentHashId = startingCapsule.id;                       
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
    // and we also can go back no further because this code would not have had a chance to execute
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
	    
	    clearUntrackedModalsAndErrors(displayedHashId);
	    
	    try {                
	        dtNavigationCallback();               
	    }
	    catch (e) {
	        // fail silently, don't let developer mistakes bring down the whole framework
	    } 
	                               
	    if (newHashIdAdded) {
	        // hash change is caused by new injection
	        
	        lastHashId = currentHashId;
	        lastHashBackwardId = "";
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
	            	//debugger;
	                var historyStack = desktopContext.getDeskTopHistory();
	                var topStackId = historyStack[historyStack.length-1].id;   
	                if (popTheHash==true) {                
	                    lastHashId = currentHashId;
	                    lastHashBackwardId = currentHashId;
	                    currentHashId = displayedHashId; 
	                    if (topStackId==displayedHashId) {                    
	                        popTheHash=false;
	                        // used to call something after initialize
	                        if (popTheHashCallback!=null) {
	                        	popTheHashCallback();
	                        	popTheHashCallback=null;
	                        }
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
	                            lastHashBackwardId = currentHashId;
	                            currentHashId = displayedHashId;                                                                                                        
	                            desktopContext.back(true);
	                            return;                                                                                           
	                        }
	                        // this is the browser forward button, or navigating back to untracked page
	                        else {
	                            // debugger;
                            	// this is a browser forward button so roll back so that no pop is made
                            	if (lastHashBackwardId==displayedHashId) {		                            	
	                                doHashChangeNavigation=false;
	                                window.history.go(-1);
	                                
	                                // we have returned to the landing page before the original registration
	                                // and we also can go back no further because this code would have not had a chance to execute
	                                // after the go(-1)
	                                // so re-register
	                                reRegisterLandingPageAtEntryPoint(popTheHash);
	                                                            
	                                return;
                            	}
                            	// if this is not a forward then we are going back from or onto an untracked capsule
                            	// find the landing capsule and go there, and pop the address hash conditionally
                            	else {
                            		
                            		// debugger;                            		
                            		var browserBackButtonDriven = false; // will cause popping of the hash in the address bar
                            		var landingcapsuleId = "";
                            		
                            		var currentCapsuleTracked = desktopContext.isTrackedPage(desktopContext.activeCapsule);
                            		if (currentCapsuleTracked) {
                            			landingcapsuleId = previousStackId;
                            		}
                            		else {
                            			landingcapsuleId = desktopContext.getTopStackId();                            			
                            		}
                  
    	                            if (landingcapsuleId==displayedHashId) {
    	                            	browserBackButtonDriven = true;
    	                            	lastHashId = currentHashId;
                                		lastHashBackwardId = currentHashId;	  
    	                            	currentHashId = displayedHashId;
    	                            }
    	                            
    	                            desktopContext.setCapsuleById(landingcapsuleId,browserBackButtonDriven);
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
    var untrackedModalsArray = new Array();
    
    // methods
    thisInstance.getDeskTopHistory = getDeskTopHistory;
    thisInstance.getUntrackedModalsArray = getUntrackedModalsArray;
    thisInstance.setAttribute=setAttribute;
    thisInstance.getAttribute=getAttribute;        
    
    thisInstance.initialize = initialize;        
    
    thisInstance.idPresentInHistory = idPresentInHistory;
    thisInstance.getDeskTopHistoryObject = getDeskTopHistoryObject;
    thisInstance.calculateNextModalTargetLevel = calculateNextModalTargetLevel;
    thisInstance.generateModalTarget = generateModalTarget;
    
    thisInstance.setCapsuleInTarget = setCapsuleInTarget;
    thisInstance.isTrackedPage = isTrackedPage;        
    thisInstance.addCapsuleToPage = addCapsuleToPage;
    thisInstance.injectCapsule = injectCapsule;
    thisInstance.injectNewCapsule = injectNewCapsule;
    thisInstance.setCapsuleById = setCapsuleById;
    thisInstance.setCapsuleByHashDepth = setCapsuleByHashDepth;
    thisInstance.getPreviousStackId = getPreviousStackId;
    thisInstance.getTopStackId = getTopStackId;
    thisInstance.back = back;    
    thisInstance.runCapsuleFunctions = runCapsuleFunctions;
    thisInstance.processJsOnload = processJsOnload;
    thisInstance.processJsReturn = processJsReturn;
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
    
    function getUntrackedModalsArray() {
        return untrackedModalsArray;
    }
            
    function setAttribute(id,object) {
        attributeArray.put(id,object);
    }
    
    function getAttribute(id) {
        return attributeArray.get(id);
    }                        
        
    function initialize(initCallBack) {
        if (staticPage) {
            alert("initialize() not supported for static pages.");
            return;
        }
        
        if (initCallBack == undefined) {
        	alert("A callback must be sent to the initialize method.");
            return;
        }
                
        // check to see if we are already on the welcome page
        if (deskTopHistoryArray.length>1){        	                
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
	        popTheHashCallback=initCallBack;
	        window.history.go(-1);
        }
        else {
        	initCallBack();
        }
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
        
        if (targetObject==null) {
        	throw new Error("No DOM element found for capsule targetId = "+targetId);        	
        }
        
        // use remove first child, which contains a direct DOM call, then remove all children using a jquery based call
        // the reason to do this is because jquery destroys all data attributes when executing empty, even when
        // the entire dom object has other references
        thisInstance.safeRemoveAllChildElements(targetObject);
        domUtil.appendChildElement(targetObject,capsuleObject);
    }
   
    function isTrackedPage(paramCapsuleObject) {
    	if ( (paramCapsuleObject.getAttribute("trackPage") == null) || (paramCapsuleObject.getAttribute("trackPage") == "") || (paramCapsuleObject.getAttribute("trackPage").toUpperCase() == "TRUE") ) {
    		return true;
    	}
    	return false;
    }
    
    function addCapsuleToPage(incomingCapsuleObject) {
        // add capsule and history
        if ( thisInstance.isTrackedPage(incomingCapsuleObject) ) {                                                  
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
        else {
        	// probably dead code because this is screened out earlier but leaving here just in case
        	// untracked modals should not change hash or set active capsule etc, so need to be screened before here
        	if (incomingCapsuleObject.getAttribute("capsuleType").toUpperCase()=="MODAL") {        		
        		untrackedModalsArray.push(incomingCapsuleObject);
        	}
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
        	        	
        	var isErrorPage = false;
        	var errorPageAttribute = incomingCapsuleObject.getAttribute("errorPage");
        	if ( ( errorPageAttribute!=null) && ( errorPageAttribute.toUpperCase() == "TRUE") ) {
        		isErrorPage = true;
        	}
        	
        	var isUntrackedModal = false;
        	if ( !thisInstance.isTrackedPage(incomingCapsuleObject) ) {
        		if (incomingCapsuleObject.getAttribute("capsuleType").toUpperCase()=="MODAL") {
        			isUntrackedModal = true;
        		}
        	}
        		        	
        	// Data type capsules can be autoinjected if desired by sending a targetId, 
        	// but of course will not be tracked or change the hash.
        	// If not autoinjected it will be up to the developer to place the data.
        	// Untracked modal pages will be automatically injected to a modal target level (set earlier by the framework)
        	// and must have an id so they can be removed,
        	// but also will not be tracked or change the hash.
            if ( (incomingCapsuleObject.getAttribute("capsuleType").toUpperCase() == "DATA") || isErrorPage || isUntrackedModal) {
            	var targetId  = incomingCapsuleObject.getAttribute("targetId");
            	if (targetId!=null) {
            		thisInstance.setCapsuleInTarget(incomingCapsuleObject);
            		
            		if (incomingCapsuleObject.getAttribute("capsuleType").toUpperCase() == "MODAL") {
            			if (incomingCapsuleObject.id==null) {
            				alert("Modal page must have capsule id.");
            				return;
            			}            			
            			untrackedModalsArray.push(incomingCapsuleObject);
            		}            		
            	}
        		return;
            }
        	
            var idInHistory = thisInstance.idPresentInHistory(incomingCapsuleId);
                        
            // Update hash with capsule id
            // Only update if not going back
            if ( !idInHistory ) {            	            	           	
            	// no reason for a reload to change the hash
            	// also setting newHashIdAdded to true when its not true
            	// causes a skip of the view change when pushing the back button
            	// because a new id would cause and immediate hash change which we
            	// should ignore
            	var currentDisplayedHash = window.location.hash;
            	var generatedHash = "#nav=" + incomingCapsuleId;            	
            	if (currentDisplayedHash!=generatedHash) {
            		newHashIdAdded = true;
            		window.location = "#nav=" + incomingCapsuleId;
            	}
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
                                  
        thisInstance.injectCapsule(capsuleObject,browserBackButtonDriven,"injectNewCapsule");        
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
                thisInstance.processJsReturn(capsuleToShow);
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
    
    function getTopStackId() {
        var topStackId = "";                             
        if (deskTopHistoryArray.length > 0) {
        	topStackId = deskTopHistoryArray[deskTopHistoryArray.length - 1].id;
        }
        else {
            // We have some untracted pages between our current capsule (possibly including current) and the base of the stack,
            // or we are already at the base.            
            // Just get the base of the stack.
        	topStackId = deskTopHistoryArray[0].id;
        }
        return topStackId;
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
        if (staticPage) {
            window.history.go(-1);
        }
        else {
        	// if we are coming backwards off of an untracked capsule then display the
        	// top of the stack instead of the next entry lower
        	var stackId = "";
        	if ( thisInstance.isTrackedPage(thisInstance.activeCapsule) ) {
        	    stackId = thisInstance.getPreviousStackId();
        	}
        	else {
        		stackId = thisInstance.getTopStackId();
        	}
                
            // will be popped in injectCapsule for cases where latest capsule is tracked 
            // and not a result of browser back button
            thisInstance.setCapsuleById(stackId,browserBackButtonDriven);  
        }                                                           
    }
      
    function runCapsuleFunctions(functionString,capsule,context) {
    	// should have never instructed developers to put the word capsule in, so clean it up
    	let functionStringCleaned=functionString.replaceAll("(capsule);","|");
    	functionStringCleaned=functionStringCleaned.replaceAll("(capsule);","|");
    	functionStringCleaned=functionStringCleaned.replaceAll("();","|");
    	functionStringCleaned=functionStringCleaned.replaceAll("()","|");
    	let functionArray = functionStringCleaned.split("|");
    	for(var i=0; i < functionArray.length; i++) {        		
            let methodName = functionArray[i].trim();
            if (methodName=="") {
            	break;
            }
            try {                
                if (typeof window[methodName] === 'function') {
            		window[methodName](capsule);
        		} else {
        			alert("Javascript "+context+" failed.  Method="+methodName+" doesn't exist.");
        		}
            }
            catch (e) {
                alert("Javascript "+context+" failed.  Method="+methodName+" Error message="+e.message);
                break;
            }
        }
    }
    
    function processJsOnload(capsule) {        
        let jsOnloadMethod = capsule.getAttribute("jsOnload");
        if ( (jsOnloadMethod!=null) && (jsOnloadMethod!="") ) {
        	thisInstance.runCapsuleFunctions(jsOnloadMethod,capsule,"jsOnload");  
        }                                                                     
    }
    
    function processJsReturn(capsule) {        
        let jsReturnMethod = capsule.getAttribute("jsReturn");
        if ( (jsReturnMethod!=null) && (jsReturnMethod!="") ) {
        	thisInstance.runCapsuleFunctions(jsReturnMethod,capsule,"jsReturn");
        }                                                                     
    }    
}

// simplified methods for developer use -----------------------------

// this is useful to remove a create page after you are done with it so that the user will
// not use the back button to land on a stale create page
// you could set trackPage to false instead but that prohibits you from doing side flows from the create page
function removeCapsuleFromHistory(capsuleId) {
	let desktophistory = desktopContext.getDeskTopHistory();
	for (i = 0; i < desktophistory.length; i++) {
	    if (desktophistory[i].id == capsuleId) {
	    	desktophistory.splice(i, 1);
	        break;
	    }
	}
}

function dtBack() {
	dtCloseUntrackedModal();
	desktopContext.back(false);    
}

// use to close untracked modals so that you can return to
// an untracked main page without stepping over it
function dtCloseUntrackedModal() {	
	clearUntrackedModalsAndErrors();	
}

function dtInit(initCallBack) {
    if (staticPage) {
        alert("dtInit() not supported for static pages.");
        return;
    }
    desktopContext.initialize(initCallBack);    
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