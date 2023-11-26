from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from ..models import Article, Token, User, Review
from ..serializers import UserSerializer
from django.http import JsonResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.middleware.csrf import get_token
from django.contrib.auth.hashers import make_password


class AccountsView(APIView):
    
    def post(self, request):
        data = request.data
        # is the user valid
        if(data["password"] != data["confirmpassword"]):
            return JsonResponse({"message": "Passwords don't match"}, status = 500)
        if( len(data["email"].split("@")) != 2):
            return JsonResponse({"message": "Invalid email"}, status = 500)
        if( len(data["password"]) < 8):
            return JsonResponse({"message": "Password too short"}, status = 500)
        
        data.pop("confirmpassword")
        data['password'] = make_password(data['password'])
        serializer = UserSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return JsonResponse({"message": "Username already exists or account with existing email exists"}, status = 500)
    
    def put(self, request):
        reqBody = request.data
        print(reqBody)
        username = reqBody["username"]
        password = reqBody["password"]
        user = authenticate(request, username = username, password =  password)
        if user is not None:
            login(request, user)
            csrf_token = get_token(request)
            print(csrf_token)
            token, created = Token.objects.get_or_create(user=user)
            response =  JsonResponse({"message": "Login successful", "token": token.key})
            return response
        else:
            return JsonResponse({'message': "Invalid username or password"}, status = 404)

    def get(self, request):
        logout(request)
        return JsonResponse({'message': "User logged out successfully"}, status = 200)
