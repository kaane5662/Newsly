from django.db import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token



# Create your models here.
User._meta.get_field('email')._unique = True
User._meta.get_field('email').blank = False
User._meta.get_field('email').null = False

class Review(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE )
    content = models.TextField(max_length=5000)
    rating = models.IntegerField()
    def __str__(self):
        return self.author.username + " " + self.content +" " + str(self.rating)


# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField(max_length=10000)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    genre = models.CharField(max_length=75)
    image = models.ImageField(upload_to='')
    published = models.BooleanField(default=False)
    # subheadings = models.ArrayField(models.CharField(max_length=200), blank = True, null = True)
    # paragraphs = models.ArrayField(models.CharField(max_length=10000), blank = True, null = True)
    reviews = models.ManyToManyField(Review, blank=True, null= True)


    def __str__(self):
        return self.title +": "+ self.author.username + "\n " + self.content +" "

class WIPArticle(models.Model):
    title = models.CharField(max_length=200)   
    content = models.TextField(max_length=10000)  
    genre = models.CharField(max_length=75)
    image = models.ImageField(upload_to='uploads/')
    author = models.ForeignKey(User, on_delete=models.CASCADE)