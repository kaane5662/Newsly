from django.shortcuts import render
import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from .serializers import UserSerializer, ArticleSerializer, ReviewSerializer
from .models import User, Article, Review, Token
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.middleware.csrf import get_token
from django.contrib.auth.hashers import make_password
from django.db.models import Avg
import re




# Create your views here.
@api_view(["GET"])
@login_required
def checkLogged(request):
    try:
        user = User.objects.get(pk = request.user.id)
    except Exception:
        return JsonResponse({"message": "Not logged in"}, status= 500)

    serializer = UserSerializer(user, many = False)
    return JsonResponse(serializer.data)

@api_view(["POST", "PUT", "DELETE", "GET"])
def account_view(request):
    # sign up
    if(request.method == "POST"):
        data = request.data
        
        if(data["password"] != data["confirmpassword"]):
            return JsonResponse({"message": "Passwords don't match"}, status = 500)
        if( len(data["email"].split("@")) != 2):
            return JsonResponse({"message": "Invalid email"}, status = 500)
        if( len(data["password"]) < 8):
            return JsonResponse({"message": "Password too short"}, status = 500)
        
        data.pop("confirmpassword")
        data['password'] = make_password(data['password'])
        print(data)
        serializer = UserSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return JsonResponse({"message": "Username already exists or account with existing email exists"}, status = 500)
    # log in  
    if(request.method == "PUT"):
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
            return JsonResponse({'message': "Invalid username or password"}, status = 500)
    # log out 
    if(request.method == "GET"):
        logout(request)
        return JsonResponse({'message': "User logged out successfully"}, status = 200)


@api_view(["GET"])
def get_articles(request):    
    articles = Article.objects.filter(published = True)
    serializer = ArticleSerializer(articles, many = True)
    # data["content"] = data["content"]
    return Response(serializer.data)

@api_view(["GET"])
def get_featured_article(request):
    article = Article.objects.annotate(average_rating=Avg('reviews__rating')).filter(published = True).order_by("-average_rating").first()
    serializer = ArticleSerializer(article, many = False)
    return Response(serializer.data)


@api_view(["POST"])
@login_required
def publish_article(request):
    data = request.data
    data["image"] = None
    data["author"] = request.user.id
    data["reviews"] = []
    serializer = ArticleSerializer(data = data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"message": "Article successfully published"})
    print(serializer.errors)
    return JsonResponse({"message": "Formatting is wrong or something went wrong"}, status = 500)




@api_view(["GET", "POST", "PUT"])
def specific_article(request, id):
    try:    
        article = Article.objects.get(pk = id, published = True)
    except Exception:
        return JsonResponse({"message": "Error getting article or is not a published article"}, status = 500)
    #get specific article
    if(request.method == "GET"):
        serializer = ArticleSerializer(article, many = False)
        # print(article)
        return JsonResponse(serializer.data, safe=False)


@api_view(["GET"])
def get_article_reviews(request, id):
    try:
        reviews = Review.objects.filter(article__id = id)
    except Exception:
        return JsonResponse({"message": "Error fetching article reviews"}, status = 500)
    # print(reviews)
    serializer = ReviewSerializer(reviews, many = True)
    return JsonResponse(serializer.data, status = 200, safe=False)


@api_view(["PUT"])
@login_required
def post_article_review(request, id):
    print(request.user)
    print("Hello, does this work!   ")
    try:
        article = Article.objects.get(pk = id)
    except Exception:
        return JsonResponse({"message": "Article is not valid"}, status = 500)
    data = request.data
    data["author"] = request.user.id
    print(data)
    serializer = ReviewSerializer(data = data)
    if(serializer.is_valid()):
        savedReview = serializer.save()
        article.reviews.add(savedReview)
        article.save()
        return JsonResponse({"message": "Review has been posted"}, status = 200)
    return JsonResponse({"message": "Invalid data has been posted"}, status = 500)


@api_view(["GET", "POST"])
@login_required
def creation_article_view(request):
    # get all user owned articles
    if request.method == "GET":
        try:
            wipArticles = Article.objects.filter(author__id = request.user.id)
        except Exception:
            return JsonResponse({"message": "Could not find any articles"}, status = 401)
        serializer = ArticleSerializer(wipArticles, many = True)
        return JsonResponse(serializer.data, safe=False)
    
    #create a new article
    if request.method == "POST":
        newArticle = Article(title = "Untitled", content = "", author = request.user, image = "/uploads/eating-stuff.jpg", genre = "")   
        savedArticle = newArticle.save()
        serializer = ArticleSerializer(savedArticle, many = False)
        return JsonResponse(serializer.data, status = 200)


@api_view(["GET", "PUT", "DELETE", "POST"])
@login_required
def specific_creation_article(request, id):
    try:
        creationArticle = Article.objects.get(pk = id, author = request.user)
    except Exception:
        return JsonResponse({"message": "Article not found or you are not the owner"}, status = 401)
    
    # get the article
    if request.method == "GET":
        serializer = ArticleSerializer(creationArticle, many = False)
        return JsonResponse(serializer.data)
    if request.method == "POST":
        creationArticle.published = True;
        creationArticle.save()
        return JsonResponse({"message": "Article has been successfully published"})
    
    # edit the article
    if request.method == "PUT":
        print("A put request")
        data = request.data
        creationArticle.genre = data["genre"]
        creationArticle.content = data["content"]
        creationArticle.title = data["title"]
        creationArticle.save()
        return JsonResponse({"message": "Saved successfully"})
    
    # delete the article
    if request.method == "DELETE":
        creationArticle.delete()
        return JsonResponse({"message": "Deleted successfully"})
    
@api_view(["PUT"])
def get_matching_articles(request):
    data = request.data
    search_param = data["searchParam"]
    try:
        matching_articles = Article.objects.filter(title__icontains = search_param, published = True)
    except Exception:   
        return JsonResponse({"message": "Article not found"}, status = 401)
    serializer = ArticleSerializer(matching_articles, many = True)
    return JsonResponse(serializer.data, safe=False)

@api_view(["POST"])
@login_required
def upload_article_image(request, id):
    print(request.FILES.get("image"))
    try:
        creationArticle = Article.objects.get(pk = id, author = request.user)
    except Exception:
        return JsonResponse({"message": "Article not found or you are not the owner"}, status = 401)
    creationArticle.image = request.FILES.get("image")
    
    creationArticle.save()
    # form = ImageUploadForm(request.POST, request.data)
    # if(form.is_valid()):
    #     image_instance = form.save(commit=False)
    #     image_instance.associated_model = creationArticle
    #     image_instance.save()
    # creationArticle.save()
    return JsonResponse({"message": "Image has been updated"})
    return JsonResponse({"message": "Error occured uploading image"}, status =500)


