![WebRocketX](https://webrocketx.com/images/logo.jpg)
<br/>
*** Cloners.  Please show you appreciation by STARRING this repo.  :)  ***
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

## Example Welcome Page For A Dynamic Web Application

Runnable example templates for PHP and Django can be found in the templates folder in the source code.

### Simple HTML Example

The welcome page is your web applications landing page, usually behind your login page.  The welcome page is where your SPA begins.  Here is an exmaple page in plain HTML.

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

<br/><br/>
© 2022 GitHub, Inc.
Terms
Privacy
