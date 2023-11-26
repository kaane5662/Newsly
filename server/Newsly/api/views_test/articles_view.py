from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Article, Review, User
from ..serializers import UserSerializer, ArticleSerializer
from django.http import JsonResponse


class ArticlesView(APIView):
    def get(self, request):
        articles = Article.objects.filter(published = True)
        serializer = ArticleSerializer(articles, many = True)
        # data["content"] = data["content"]
        return Response(serializer.data)

class SpecificArticlesView(APIView):
    def get(self, request, id):
        try:    
            article = Article.objects.get(pk = id, published = True)
        except Exception:
            return JsonResponse({"message": "Error getting article or is not a published article"}, status = 500)
    #get specific article
        if(request.method == "GET"):
            serializer = ArticleSerializer(article, many = False)
            return JsonResponse(serializer.data, safe=False)