<h1>Using Ajax to update subsections of an HTML page and Synchronizing Address Bar Tracking</h1>

Most javascript developers are familiar with using ajax calls to update portions on the browser DOM.  Here is the simplist of examples using the original ajax syntax.

```
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
   document.getElementById("demo").innerHTML = xhttp.responseText;    
};
xhttp.open("GET", "https://www.mywebsite.com/abc.html", true);
xhttp.send();
```

Furthermore, using the newer <b>fetch</b> method is shown here.

```
fetch('https://www.mywebsite.com/abc.html')
.then(function(response) {
   document.getElementById("demo").innerHTML = response.text();    
}).catch(function(err) {
    console.log("Error: ", err);
})
```


