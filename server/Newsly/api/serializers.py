from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Article, Review

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "id", "password"]
        extra_kwargs = {'password': {'write_only': True}}  # Make the password field write-only


        

class ReviewSerializer(serializers.ModelSerializer):
    # author_name = serializers.StringRelatedField(source = "author")
    author = UserSerializer(many= False, read_only = True)

    class Meta:
        model = Review
        fields = "__all__"

class ArticleSerializer(serializers.ModelSerializer):
    # author_name = serializers.StringRelatedField(source = "author")
    # reviews_data = serializers.StringRelatedField(source = "reviews")
    reviews = ReviewSerializer(many=True, read_only=True)
    author = UserSerializer(many = False, read_only = True)
    image = serializers.ImageField(allow_null=True, required=False)
    average_rating = serializers.FloatField()
    # average_review_score = serializers.SerializerMethodField()
    
    class Meta:
        model = Article
        fields = "__all__"
    