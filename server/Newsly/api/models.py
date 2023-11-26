from django.db import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.db.models import Avg, Min


# Create your models here.
User._meta.get_field('email')._unique = True
User._meta.get_field('email').blank = False
User._meta.get_field('email').null = False
User._meta.get_field('username')._unique = True

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField(max_length=10000)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='articles')
    genre = models.CharField(max_length=75)
    image = models.ImageField(upload_to='')
    published = models.BooleanField(default=False)
    # subheadings = models.ArrayField(models.CharField(max_length=200), blank = True, null = True)
    # paragraphs = models.ArrayField(models.CharField(max_length=10000), blank = True, null = True)
    # reviews = models.ManyToOneRel(Review, blank=True, null= True)
    @property
    def average_rating(self):
        reviews = self.reviews.all()
        return reviews.aggregate(avg_rating=Avg('rating'))['avg_rating'] or 0
    def __str__(self):
        return self.title +": "+ self.author.username + "\n " + self.content +" "
    

class Review(models.Model):
    article = models.ForeignKey(Article, on_delete= models.CASCADE, related_name="reviews")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name= "reviews")
    content = models.TextField(max_length=5000)
    rating = models.IntegerField()
    def __str__(self):
        return self.content +" " + str(self.rating)

