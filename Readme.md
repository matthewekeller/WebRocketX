<h1>Using Ajax to update subsections of an HTML page</h1>

```
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
   document.getElementById("demo").innerHTML = xhttp.responseText;    
};
xhttp.open("GET", "filename", true);
xhttp.send();
```
