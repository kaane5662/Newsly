# from django.shortcuts import render
# import json
# from django.http import JsonResponse
# from django.contrib.auth.models import User
# from .serializers import UserSerializer
# from rest_framework.decorators import api_view
# from rest_framework import status
# from rest_framework.response import Response
# from django.contrib.auth import login, logout, authenticate

# # Create your views here.
# def say_hello(request):
#     print("Hello everyone, my name is reeee!")
    

# @api_view(["POST", "PUT", "DELETE", "GET"])
# def main(request):
#     # sign up
#     if(request.method == "POST"):
#         serializer = UserSerializer(data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status = status.HTTP_201_CREATED)
#     # log in  
#     if(request.method == "PUT"):
#         reqBody = request.data
#         print(reqBody)
#         username = reqBody["username"]
#         password = reqBody["password"]

#         user = authenticate(request, username = username, password =  password)
#         if user is not None:
#             login(request, user)
#             return JsonResponse({"message": "Login successful"}, status = 200)
#         else:
#             return JsonResponse({'message': "Invalid username or password"}, status = 500)
#     # log out 
#     if(request.method == "GET"):
#         logout(request)
#         return JsonResponse({'message': "User logged out successfully"}, status = 200)


#     # user = User.objects.create_user("kaanthepro3", "kaane0169@gmail.com", "bey6802")
#     # user.save()
