from django.db import models
from django.contrib.auth.models import User

class Review(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE )
    content = models.TextField(max_length=5000)
    rating = models.IntegerField()
    def __str__(self):
        return self.author + " " + self.content +" " + self.rating


# Create your models here.
class Article(models.Model):
    name = models.CharField(max_length=200)
    content = models.TextField(max_length=10000)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    reviews = models.ManyToManyField(Review)

    def __str__(self):
        return self.name + " " + self.content +" " + self.author