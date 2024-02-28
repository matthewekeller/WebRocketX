<!DOCTYPE html>

<html>
    <head>
                
        <title>Welcome</title>
        
        <script language="javascript" type="text/javascript" src="javascripts/jquery/jquery-ui-1.11.4.custom/external/jquery/jquery-1.12.4.min.js"></script>
        
        <script language="javascript" type="text/javascript" charset="iso-8859-1" src="javascripts/webRocketX/v1_9_2/domUtil.js"></script>
        <script language="javascript" type="text/javascript" charset="iso-8859-1" src="javascripts/webRocketX/v1_9_2/desktopContext.js"></script>
        <script language="javascript" type="text/javascript" charset="iso-8859-1" src="javascripts/webRocketX/v1_9_2/webapi.js"></script>
        <link rel="stylesheet" type="text/css" href="javascripts/webRocketX/v1_9_2/webRocketXStyles.css">
        
        <script type="text/javascript">           
            var asyncDebugMode = true;
            var signInPageURI = "";
            var pageLoadTimeStamp = "";
            var modalTargetSpacing = 10;
            var staticPage = false;
            var disableNavigation = false;
        </script> 
     
        <?php include 'includes/javascriptFileList.php';?>
        <?php include 'includes/cssFileList.php';?>            
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
                <?php include 'welcomeContent.php';?>
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
