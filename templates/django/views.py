from django.http import HttpResponse
from django.shortcuts import render

import time

#def index(request):
#    return HttpResponse("Hello, Xworld. You're at the polls index.")
    
def welcome(request):
    return render(request, 'welcome.html')
      
def test1_go(request):
    return render(request, 'test1_go.html')
    
def test2_go(request):
    return render(request, 'test2_go.html')
    
def test3_go(request):
    return render(request, 'test3_go.html')
    
def test4_go(request):
    return render(request, 'test4_go.html')
    
def test5_go(request):
    return render(request, 'test5_go.html')
    
def slowtest1_go(request):
    time.sleep(4)
    return render(request, 'slowtest1_go.html')
    
def serverSideErrorTypeDataAndJsOnload_go(request):
    return render(request, 'serverSideErrorTypeDataAndJsOnload_go.html')
    
def serverSideError_go(request):
    return render(request, 'serverSideError_go.html')    
    
def noMeta_go(request):
    return render(request, 'noMeta_go.html')
    
def newStartingPoint_go(request):
    return render(request, 'newStartingPoint_go.html')    
    
def modal10_go(request):
    return render(request, 'modal10_go.html')        
    
def modal20_go(request):
    return render(request, 'modal20_go.html')  
    
def json_go(request):
    return render(request, 'json_go.html')      
    
    
        
    
    
        
    
    
    
