# Generated by Django 4.2.5 on 2023-10-05 04:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_article_published'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='image',
            field=models.ImageField(upload_to=''),
        ),
    ]