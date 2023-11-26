# Generated by Django 4.2.5 on 2023-11-25 21:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0018_alter_article_author'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='reviews',
        ),
        migrations.AddField(
            model_name='review',
            name='article',
            field=models.ForeignKey(default=4, on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='api.article'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='article',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='articles', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='review',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='WIPArticle',
        ),
    ]
