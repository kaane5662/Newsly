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


@api_view(["GET"])
def get_featured_article(request):
    article = Article.objects.annotate(average_rate=Avg("reviews__rating")).filter(published = True).order_by("-average_rate").first()
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
    
    return JsonResponse({"message": "Image has been updated"})
   


