<table class="expand">
    <tr>
        <td>
            <span class="header">Injection Test 3</span>
            <br/><br/>
            <a href="#" onclick="test4();return false;">Go To Test4</a>
            <br/><br/>
            <a href="#" onclick="test3Back(); return false;">Special Back</a>
            <br/><br/>
            <form name="testForm">
                <input name="test1" value="value1"/>
                <input name="test2" value="value2"/>
            </form>
            <br/><br/>
            <a href="#" onclick="submitTestForm(); return false;">Click To Submit Form</a>
            <br/><br/>
            <a href="#" onclick="submitCustomParam(); return false;">Click To Submit Custom Params</a>
            <br/><br/>
            <a href="#" onclick="restoreResponse(); return false;">Restore Response</a>
            
            <br/><br/>
            <u>Parameters Sent:</u>
            <table>
                <tr>
                    <td align="left">
                        <?php
                            foreach ($_POST as $param_name => $param_val) {
                                echo "Param: $param_name; Value: $param_val<br />\n";                                
                            }
                        ?>
                    </td>
                </tr>
            </table>
            
        </td>
    </tr>
</table>    
