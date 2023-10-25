from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Article, Review, WIPArticle

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}  # Make the password field write-only

class ArticleSerializer(serializers.ModelSerializer):
    author_name = serializers.StringRelatedField(source = "author")
    reviews_data = serializers.StringRelatedField(source = "reviews")
    image = serializers.ImageField(allow_null=True, required=False)
    average_review_score = serializers.SerializerMethodField()
    
    class Meta:
        model = Article
        fields = "__all__"
    def get_average_review_score(self, obj):
        return obj.get_review_score()   
        

class ReviewSerializer(serializers.ModelSerializer):
    author_name = serializers.StringRelatedField(source = "author")
    class Meta:
        model = Review
        fields = "__all__"
