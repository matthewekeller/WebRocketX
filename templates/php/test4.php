<table class="expand">
    <tr>
        <td>            
            <span class="header">Injection Test 4</span>
            <br/><br/>
            <a href="#" onclick="test2();return false;">Go To Test2 As New Injection</a>
            <br/><br/>
            <a href="#" onclick="dtSetCapsuleById('test2');return false;">Go To Test2 As Setting to Current Stack View</a>
            <br/><br/>
            <a href="#" onclick="dtBack(); return false;">Back</a>
            <br/><br/>
            <a href="#" onclick="newStartingPoint(); return false;">Menu Test</a>
            <br/><br/>            
            
            <a href="#" onclick="test5(); return false;">Test 5 - Leads to back which triggers reload</a>
            <br/><br/>
            <?php
                date_default_timezone_set("UTC"); 
                echo 'Page load time (UTC) :  '. date("Y-m-d h:i:sa");
            ?>
        </td>
    </tr>
</table>    
