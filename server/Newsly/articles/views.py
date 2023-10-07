from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from .models import Article

# Create your views here.

@api_view(["POST"])
def main(request):
    if(request.method == "POST"):
        return JsonResponse({"messsage": "Is this an auth problem"}, status=200)


@api_view(["GET"])
def say_hello(request):
    return JsonResponse({"messsage": "Hello World"}, status=200)