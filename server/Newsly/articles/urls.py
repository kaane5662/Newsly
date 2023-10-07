from django.urls import path
from . import views

urlpatterns = [
    path("", views.main),
    path("hello/", views.say_hello)
]