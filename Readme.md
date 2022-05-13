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

This is all fine and good but if you want to now truly have a well behaved Single Page Application you want to make sure your users have intuitive back button behavior that coincides with the view changes in the DOM.  The best way to do this is to convince the browser that forward navigations by way of HTML snippet injection, are forward navigation via anchor tags.  Now, when the back button is pressed the browser will think its just moving within the page instead leaving the page.  This can be done by writing javascript calls that modify text after the hash on the address bar like so.

```
location.href = "https://www.mywebsite.com/abc.html#searchresults";
```

This is a concept originally implemented as a library in project called <a href="https://github.com/cowboy/jquery-bbq">Jquery BBQ</a>.  This same idea has been refined and made more user friendly in WebRocketX.  Feel free to check out the open source implementation in this Github repo.

