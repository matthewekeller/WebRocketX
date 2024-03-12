var timeout    = 500;
var closetimer = 0;
var ddmenuitem = 0;

var newDiv;
var parentDiv;
var parent;
var subMenuName;

function jsddm_open()
{  jsddm_canceltimer();
   jsddm_close();
   ddmenuitem = $(this).find('ul').css('visibility', 'visible');}

function jsddm_close()
{  if(ddmenuitem) ddmenuitem.css('visibility', 'hidden');}

function jsddm_timer()
{  closetimer = window.setTimeout(jsddm_close, timeout);}

function jsddm_canceltimer()
{  if(closetimer)
   {  window.clearTimeout(closetimer);
      closetimer = null;}}



document.onclick = jsddm_close;
    
function createMenu(element){
    // Creating the parent <ul> element for the menu
    newDiv = $('<ul></ul>');
    newDiv.attr("id","jsddm");
    newDiv.appendTo(element);
    parent = newDiv;
    
    // menu ----------------
    
    parentDiv = createMenuName(parent,"Menu1","#");                  
    
    newDiv = createLi("Item1-1","#");
    newDiv.appendTo(parentDiv);
    
    newDiv = createLi("Item1-2","#");
    newDiv.appendTo(parentDiv);
    
    newDiv = createLi("Item1-3","#");
    newDiv.appendTo(parentDiv);
    
    newDiv = createLi("Item1-4","#");
    newDiv.appendTo(parentDiv);
            
    // menu ----------------
    
    parentDiv = createMenuName(parent,"Menu2","#");
            
    newDiv = createLi("Item2-1","#");
    newDiv.appendTo(parentDiv);       
            
    // mouse events
    
    $('#jsddm > li').bind('mouseover', jsddm_open)
    $('#jsddm > li').bind('mouseout',  jsddm_timer)
}

function createMenuName(thisParent,name,url){
    var newDiv = createLi(name,url);
    newDiv.appendTo(thisParent);
    var parentDiv = newDiv;
    newDiv = $('<ul></ul>');  
    newDiv.appendTo(parentDiv); 
    return newDiv;
}


function createLi(name,url,targetBlank){
    var parentDiv;
    var newDiv;
    parentDiv = $('<li></li>'); 
    newDiv = $('<a>' +name+ '</a>');
    newDiv.attr('href',url);
    if (targetBlank==true) {
        newDiv.attr("target","_blank");
    }
    newDiv.appendTo(parentDiv);
    return parentDiv;
}

$(document).ready(function(){
    createMenu($("#menu"));    
});
