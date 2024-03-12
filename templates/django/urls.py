from django.urls import path

from . import views

urlpatterns = [
    path('', views.welcome),    
    path('test1_go/',views.test1_go),
    path('test2_go/',views.test2_go),
    path('test3_go/',views.test3_go),
    path('test4_go/',views.test4_go),
    path('test5_go/',views.test5_go),
    path('slowtest1_go/',views.slowtest1_go),
    path('serverSideErrorTypeDataAndJsOnload_go/',views.serverSideErrorTypeDataAndJsOnload_go),
    path('serverSideError_go/',views.serverSideError_go),
    path('noMeta_go/',views.noMeta_go),
    path('newStartingPoint_go/',views.newStartingPoint_go),
    path('modal10_go/',views.modal10_go),
    path('modal20_go/',views.modal20_go),
    path('json_go/',views.json_go),
    
    
]
