from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Article, Review, User
from ..serializers import UserSerializer, ArticleSerializer, ReviewSerializer
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

class ReviewsView(APIView):
    @method_decorator(login_required(login_url=None))
    def post(self, request, id):
        try: 
            article = Article.objects.get(pk = id)
        except Exception:
            return JsonResponse({"message": "Failed to fetch article"}, status = 404)
        data = request.data
        data["article"] = id
        print(data)
        serializer = ReviewSerializer(data = data)
        if(serializer.is_valid()):
            serializer.save(author = request.user)
            return JsonResponse({"message": "Review has been posted"}, status = 200)
    
        return JsonResponse({"message": "Invalid data has been posted"}, status = 500)
    
    def get(self, request, id):
        try:
            reviews = Review.objects.filter(article__id = id)
        except Exception:
            return JsonResponse({"message": "Error fetching article reviews"}, status = 500)
    # print(reviews)
        serializer = ReviewSerializer(reviews, many = True)
        return JsonResponse(serializer.data, status = 200, safe=False)
