// Copyright 2023 to WebRocketX under the


// GNU LESSER GENERAL PUBLIC LICENSE Version 2.1
// See license file for more details

// version 1.10.0  07/16/2023

function DomUtil(){
    var me = this;
                      
    me.hideElement = hideElement;
    
    me.showElement = showElement;
    
    me.elementVisible = elementVisible;
    
    me.getElement = getElement;    
    me.getChildElement = getChildElement;
    
    me.getChildElementsByType = getChildElementsByType;
    me.getFirstChildElement = getFirstChildElement;
    
    me.setText = setText;
    me.getText = getText;
    
    me.verifyElementExists = verifyElementExists;
    me.removeAllChildElements = removeAllChildElements;
    me.removeFirstChildElement = removeFirstChildElement;
    
    me.appendChildElement = appendChildElement;    
    
    
    // native call is more powerful than jquery in this case
    function getElement( element ){

        var elementObject = null;
        if ( typeof element == 'string' ) {
            var elementObject = document.getElementById(element);
            if(elementObject == null){          
                elementObject = document.getElementsByName(element);
                if(elementObject.length == 0){
                    return null;
                }
                else {
                    elementObject = elementObject[0];
                }
            }   
        }
        else {
            elementObject = element;
        }
                
        if (elementObject == undefined) {
            return null;
        }
                
        return elementObject; 
    }
    
    // searches deeper than immediate children       
    function getChildElement( myparent, idName){
                
        // if object is already found
        if ( typeof idName != 'string' ) {
            return idName;    
        }
        
        var childElement = null;
        var parentObj = me.verifyElementExists(myparent);
       
        var childElements = $(parentObj).find("*");        
        for (i=0;i<childElements.length;i++){
            if((childElements[i].id==idName) || (childElements[i].name==idName)){               
                childElement =childElements[i];
                break;
            }
        } 
        
        if (childElement == undefined) {
            return null;
        }
        
        return childElement;                    
    }
        
    function getFirstChildElement(myparent){
        var parentObject = me.verifyElementExists(myparent);
        return $(parentObject).children()[0];
    }
   
       
    function setText( element, contents )
    {
        var elementObject = me.verifyElementExists(element);
        if( contents == null ) {
            $(elementObject).text("");
        }
        else {
            if ((elementObject.tagName=="INPUT")||(elementObject.tagName=="TEXTAREA")) {
                elementObject.value=contents;
            }
            else {
                $(elementObject).text(contents);
            }
        }
    }
    
    function getText( element ){
        var elementObject = me.verifyElementExists(element);
        return $(elementObject).text();
    }
    
    
    // searches deeper than immediate children
    function getChildElementsByType(myparent, elementType) {        
        var parentObject = me.verifyElementExists(myparent);
        return $(parentObject).find(elementType);       
    }

   
    
    function elementVisible( element ){
        var elementObject = me.verifyElementExists(element);
        return $(elementObject).is(':visible');
    }

    function hideElement( element ){
        var elementObject = me.verifyElementExists(element);
        $(elementObject).hide();        
    }
    
            
    function showElement( element, displayType ){
        //displayType is an optional string
        //valid values are: default, element, inline, and list-item
        
        var showStyle = "element";
        if ( displayType != undefined ) {
            showStyle = displayType;
        }
        
        var elementObject = me.verifyElementExists(element);
        if (showStyle == "element") {
            $(elementObject).show();
        }
        else {
            $(elementObject).css("display",showStyle);
        }
    }        
    
                          
    function removeAllChildElements(elementName) {
        var elementObject = me.getElement(elementName);
        if (elementObject != null) {
            $(elementObject).empty();             
        }
    }
            
    function removeFirstChildElement(parentElement) {
    	var parentElementObject = me.getElement(parentElement);
        //removes specified child and also returns handle to child element
        var childObj = me.getFirstChildElement(parentElementObject);
        if (childObj != null) {
            // use native call here instead of jquery
            // because jquery destroys data attribues in its remove operation
        	try {
        		parentElementObject.removeChild(childObj);
        	}
        	catch (e) {
        		alert(e);
        	}
        }               
        return childObj;        
    }
   
    function appendChildElement(parentElement, childElement) {
        var parentObj = me.getElement(parentElement);
        var childObj = me.getElement(childElement);
        if ((parentObj != null) && (childObj != null)) {
            $(parentObj).append(childObj);            
        }
    }
                  
    function verifyElementExists(element) {
        if (element==null) {
            alert("Null value passed to jElementController.verifyElementExists()");
            return element;
        }        
                        
        var elementObject = me.getElement(element);
        if (elementObject==null) {
            alert(element+" not found.");
            return elementObject;
        }        
        return elementObject;       
    }            
            
    

}

var domUtil = new DomUtil();