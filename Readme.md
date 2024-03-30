![WebRocketX](https://webrocketx.com/images/logo.jpg)
<br/><br/>
<b>Welcome to WebRocketX&copy;.  Develop web applications 10 times more efficiently with this super light and  super fast
content delivery system.  WebRocketX is so intuitive and effective that anyone using it immediately wonders where
HTML injection has been hiding all these years.</b>

<b>What is WebRocketX?</b>

WebRocketX is a browser side javascript API that all async calls to the server are made through.  It's primary mechanism of updating
the page is through DOM insertion of HTML snippets using the <a href="https://webrocketx.com/innerHTML.html" target="_blank">innerHTML</a> property.  By having
a single point of interaction with the server the developer has the following functionality provided by the API.
<br/>
<ul>
    <li>Provides a SPA front end to any technology that delivers HTML from the backend, such as Springboot, PHP, Laravel, Django, Rails, etc.
    <li>Browser side control of user interaction during the async call</li>
    <li>Browser side error handling of server side exceptions</li>
    <li>Browser side view caching ~ Easily make the back button work perfectly.</li>
    <li>Browser side view navigation</li>
</ul>                        
For a more detailed description of the benefits of using a WebRocketX SPA go here
<a href="https://webrocketx.com/benefits.html" target="_blank">Benefits Of Using A WebRocketX SPA</a>
<br/><br/>
<b>Why the X?</b>
<br/><br/>
WebRocketX is a hybrid.  It is a solution halfway between the old world of 
<a href="https://webrocketx.com/fullPageRefresh.html" target="_blank">full page refresh</a>                
websites and recent 
<a href="https://webrocketx.com/json.html" target="_blank">JSON</a>                 
JSMVC solutions, like Angular.
<br/><br/>
<ul>
    <li>Like full page architecture, WebRocketX expects layout coming from the server to include data. This is different than JSMVC architecture where data is delivered separately from the layout in JSON objects. However, WebRocketX does support JSON when needed, but is not a JSON centric paradigm.</li>
    <li>Like JSMVC architecture, WebRocketX is a <a href="https://webrocketx.com/singlePageApplication.html" target="_blank">Single Page web Application</a> (SPA) and relies on AJAX calls to submit data and bring in new views.</li>
</ul>
<br/>
<b>Other great things about WebRocketX</b>
<br/><br/>
Written <ins>entirely in javascript</ins>, using Jquery as an API to the browser, it will run on all major browsers and even on mobile devices.
<br/><br/>
Allows a web application developer to easily create a rich user experience using <ins>standard HTML</ins> and javascript, similar to the 
experience of using a major desktop operating system such as Apple or Windows.  Yet, it is extremely <ins>light weight</ins> executing a 
small amount of code, and stores much of the user's state on the browser <ins>minimizing the need to communicate</ins> with the server.
<br/><br/>
Provides the web application developer with a <ins>structured platform</ins> in which to deliver and manage content within the browser.  
Yet, although it is structured, it still leaves the developer completely free to leverage the power and convenience of standard HTML 
and style sheets, and to use third party widget libraries.
<br/><br/>
<ins>Inherently secure</ins> because the server side html rendering paradigm stores the user's authorization in a server session where it is difficult
for a user to tamper with. Furthermore, since unused and unauthorized views are not cached client side, a bad actor
does not have an attack surface provided to them.  Frameworks like Vue, Angular, and React give all users the administrator account attack surface by
default, as cached views, unless the administrator web application is downloaded and managed as a separate application.
<br/><br/>
<b>What WebRocketX is not</b>
<br/><br/>
<ins>Not a server side solution</ins>, because its front end (browser) components are not coupled to back end (server) memory components.  
The only relationship between what is delivered from the server and the WebRocketX framework are some simple conventions for delivery of the 
HTML to the browser.  This decoupled architecture leaves the developer free to use any backend framework they desire such as Django, Ruby on Rails, Spring MVC, 
Php, Asp, Struts, etc.  Content is delivered from the server as HTML and sent from WebRocketX as form parameters.  It is as simple as that.                        
<br/><br/>
<ins>Not a CSS or layout solution</ins>.  It is a content caching and delivery API designed to easily make your dynamic web application into a SPA.
A developer is free to layout their web application any way they desire.
The look and feel of this informational website is not indicative of how your website will look when using WRX.  
<br/><br/>
<ins>Not SEO compliant for static websites</ins>.
The use of WRX for static websites is primarily a concept only usage and unfortunately the search engines are not ready for the indexing of SPA websites.
None of the single page frameworks such as React, Angular, or Vue are SEO compliant, beyond their landing pages.
On the other hand, WRX is a very good fit for dynamic web applications, especially sites that require a user to login to manage any kind of account or business.
<br/><br/>
<b>If you like WebRocketX.  Give us a star here in Github.  Thanks!</b>

<br/><br/>

## Installation

Create a landing/welcome page as shown below and include the following libraries in it.  The landing page is usually best to locate behind your form login page.  In other words you forward the user to it after they login.  Everything but the jquery library is available in the WebRocketX root source code folder found above.

```html
jquery[latest version].js including the draggable library from jquery UI
domUtil.js
desktopContext.js
webapi.js
webRocketXStyles.css
```

## Simple HTML Example For A Dynamic Web Application

Runnable example templates for <b>PHP</b> and <b>Django</b> can be found in the templates folder in the source code.

### Landing/Welcome Page

The welcome page is your web applications landing page, usually behind your login page.  The welcome page is where your SPA begins.  Key parts are the library includes the framework variables settings, the starting target, and the communications error alert.

```html
<!DOCTYPE html>

<html>
    <head>
                
        <title>Welcome</title>

         <!-- The jquery UI library should include draggable if you want to implement draggable modals-->
        <script language="javascript" type="text/javascript" src="javascripts/jquery/jquery-ui-1.11.4.custom/external/jquery/jquery-1.12.4.min.js"></script>
        
        <script language="javascript" type="text/javascript" charset="iso-8859-1" src="javascripts/webRocketX/v1_10_1/domUtil.js"></script>
        <script language="javascript" type="text/javascript" charset="iso-8859-1" src="javascripts/webRocketX/v1_10_1/desktopContext.js"></script>
        <script language="javascript" type="text/javascript" charset="iso-8859-1" src="javascripts/webRocketX/v1_10_1/webapi.js"></script>
        <link rel="stylesheet" type="text/css" href="javascripts/webRocketX/v1_10_1/webRocketXStyles.css">
        
        <script type="text/javascript">           
            var asyncDebugMode = true;
            var signInPageURI = "";
            var pageLoadTimeStamp = "";
            var modalTargetSpacing = 10;
            var staticPage = false;
            var disableNavigation = false;
        </script> 

        <link rel="stylesheet" type="text/css" href="styles/demo/styles.css">
        <link rel="stylesheet" type="text/css" href="styles/demo/menu.css">
        <meta name="viewport" content="width=device-width">    
    </head>
    
    <body>             
    
        <!-- header -->        
        <table class="bodytext">        
            <tr>
                <td width="20"></td>                    
                <td>
                    My Header                    
                </td>
                <td width="20"></td>                
            </tr>
            
            <tr>
                <td width="20"></td>                    
                <td class="menuBar">
                    <div id="menu"></div>                        
                </td>
                <td width="20"></td>
            </tr>
            
        </table>
        
        <div id="errorSpan" style="color:red;text-align:center;"></div>
                
        <div id="winMain" class="startingTarget bodytext">
            
            <!-- Unused or default capsule attributes do not need to be included.  They are just included here for teaching purposes. -->
            <div id="welcome" class="metaCapsule" capsuleType="inline" targetId="winMain" jsOnload="" reloadPage="false" saveOriginalRequest="false" saveResponse="false" trackPage="true" windowTitle="welcome" errorPage="false">
                Hello World
                <br/><br/>
                <a href="#" onclick="test1();return false;">Test1</a>
            </div>
                                                        
        </div>
       
        <!-- footer -->     
        <table class="bodytext">        
            <tr>
                <td width="20"></td>                    
                <td class="menuBar" style="padding: 10px 10px 10px 10px;">
                    Powered By&nbsp;&nbsp; <a target="_blank" href="http://www.webrocketx.com" style="text-decoration: none;"><span style="color:black;background-color:white;font-weight:bold;">&nbsp;WebRocket</span><span style="color:red;background-color:white;font-weight:bold;">X&nbsp;</span></a>                     
                </td>
                <td width="20"></td>                
            </tr>                       
        </table>
                
        <div id="communicationErrorAlertWrapper" style="display:none;">
                                                               
            <div id="communicationErrorAlert" class="metaCapsule" capsuleType="modal">
                <div id="dialogLayer" class="BDT_Dialog_Layer">
                    <div class="BDT_Dialog_Center">
                        <div class="BDT_Dialog_Decoration">                    
                            <table class="expand">
                                <tr>
                                    <td>
                                        <div id="communicationErrorMessage"></div>
                                        <br/><br/>
                                        <a href="#" onclick="$('#communicationErrorAlertWrapper').hide(); return false;">Ok</a>                            
                                    </td>
                                </tr>                            
                            </table>                          
                        </div>
                    </div>
                </div>
            </div>
                 
        </div>               
        
    </body>

</html>
```

### Example Injected Page

This page will replace the main content.  We will put it in a file called test1.html.  The content is wrapped in a capsule (div tag) configured with meta data XML attributes.  The meta data is a type of declarative programming used by the framework to decide what to do with your content.

```html
<div id="test1" class="metaCapsule" capsuleType="inline" targetId="winMain" windowTitle="Test 1">
    Hello World Test 1.
</div>
```

### Example Javascript Function

This call will replace the content in winMain.  The really cool thing is that the back button on the browser will navigate back to the previous page perfectly but you will still be in one SPA page the entire time.  This is true of any navigation in the framework and you have complete and simple control if you decide that you want a page to always refresh from the server when you navigate back to it, instead of coming from browser cache.  Marking a page's capsule with the reloadPage attribute equal to "true" will resubmit the page to the server with all the same params it originally was requested with and even call the same callback that was originally assigned to it, in its original closure scope.

```javascript
function test1(){
    var successfulCallback = function(innerHTMLObject) {                        
       alert("this my callback");              
    }
        
    var webapi = new Webapi();
    webapi.setSuccessCallbackReference(successfulCallback);    
    webapi.setUrl("test1.html");
    webapi.submitAsync();    
}
```

Can it possibly get any simpler?


## Full List Of Capsule Attributes Available In Dynamic Web App Mode
               
Listed here are all of the capsule attributes that WebRocketX supports in Dynamic Mode. 
The framework is running in Dynamic Mode when the <u>staticPage</u> variable in the welcome
page is set to false.
<br/><br/>
Attributes not included in the capsule will be set
to their default values.  Required attributes are marked with an asterisk*.

<ul class="bodyList">
    <li>
        <u>id*</u> - Used to keep track of the page in the WebRocketX framework.  Relayed through capsuleId parameter in template example.  Using templates is not required.
    </li>
    <li>
        <u>class*</u> - Must be set to the value "metaCapsule".  Used by the framework to locate the capsule div.  
    </li>                                        
    <li>
        <u>capsuleType*</u> - Can be set to the following four values, which determines how and if the capsule will be injected.
        <ul>
            <li>                                   
                inline - Content will be injected in the div specified by the targetId attribute.
            </li>
            <li>
                modal - Content will be injected in a floating modal layer.
            </li>
            <li>
                data - Content will not be tracked for navigation by the framework.  The developer can decide whether to specify a targetId or place
                the content on their own, or even use the content without placing it in the page.
                The content will be returned to the developer in the callback, as the first parameter,
                in the form of a DOM object of the capsule and its included contents. 
                This is the ideal capsule type to use for refreshable smaller parts of the page that are not navigated as whole pages.  For example,
                search results, tickers, etc.
            </li>
            <li>
                json - Simply render the json text into the capsule server side and it will be delivered in the browser side callback already turned into a json object.
                Sending json parameters to the server can be done by setting the value of a parameter to a json string using the AsyncParametersList object.
            </li>
        </ul>
    </li>
    <li>
        <u>targetId (*required if capsuleType is inline)</u> - Specifies the location where incoming html will be injected, when the capsule type is "inline".
    </li>
    <li>
        <u>jsOnload</u> - Specifies a javascript method that will be called when the injection is complete.  
        Very useful for registering autocompleters, jquery ui components, and any other kind of page load type operations.                                
        A handle to the capsule that the jsOnload function was declared in is always sent as a single parameter to your js function. 
    </li>
    <li>
        <u>jsReturn</u> - Specifies a javascript method that will be called when this page is returned to but not reloaded.  Returning
        to a page can be trigged by using the back button or calling dtSetCapsuleById.  This mechanism is useful when the
        developer desires part of the view to be refreshed, or any other code to be run, upon display either conditionally or unconditionally.  
        Since the application is running in a single page, conditions can be relayed between pages as global variables.        
        A handle to the capsule that the jsReturn function was declared in is always sent as a single parameter to your js function.                                                              
    </li>
    <li>
        <u>reloadPage</u> (default: false) - When this is true, navigating to this page in the browser stack will result in a fresh version of this content being retrieved from the server.  The original request will be resent, with all of its original parameters, and the original callback method will be called.
    </li>
    <li>
        <u>skipReloadPageOnPrevious</u> (default: false) - When this is true, a navigation from this page to a page in the browser stack that is marked with a reload will block that destination page from reloading.  
        This is particularly useful in allowing the developer to control whether different back flows to a reload page will cause it to reload or not.  For example, it is often undesireable when navigating
        back to a background page from a modal for that background page to reload.  However, it still might be desireable for that same background page to reload
        when it is navigated back to from a page that replaced it.
    </li>
    <li>
        <u>saveOriginalRequest</u> (default: false) - When set to true, the original request will be saved even if this is not a reload.
    </li>
    <li>
        <u>saveResponse</u> (default: false) - When set to true, the response object is stored in the injected capsule div.  This can be later used to restore the injected content to its original state after edits by the user, by calling restoreAsyncResponse(id).  The most common case where this ability is desired is when the page has a cancel button.
    </li>
    <li>
        <u>trackPage</u> (default: true) - Defaults to true specifying that this page is placed in the back stack for further reference.
        This setting is not relevant for the capsule types of data and json because those types are not navigable to begin with. 
        The developer can specify that this page should not be placed in the back stack by setting this attribute to false.   
        Setting trackPage to false is an ideal solution for pages that you do not want the user to go back to and then resubmit, 
        like a "create" page.  When the user goes back to an untracked page they will skip over it and land on the tracked page preceding it.                           
    </li>
    <li>
        <u>windowTitle</u> - Specifies the title to be set on the top of the browser.  Necessary because we never changes pages and therefore never update the title tag in the html header.
    </li>
    <li>
        <u>errorPage</u> - Marks this page as a typed exception which will result in the developer defined successful callback being skipped and the developer defined failure callback being called.
    </li>
</ul>

### Come Visit Our Website For More Details and Documentation

<a href="https://webrocketx.com" target="_blank">Visit WebRocketX</a>

