from django import forms
from .models import Article

class ImageUploadForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['title', 'image']