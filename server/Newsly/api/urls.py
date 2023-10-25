from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("accounts/", views.account_view),
    path("articles/", views.get_articles),
    path("publish/", views.publish_article),
    path("articles/<int:id>/", views.specific_article),
    path("reviews/<int:id>/", views.get_article_reviews),
    path("reviews/post/<int:id>/", views.post_article_review),
    path("create/", views.creation_article_view),
    path("create/edit/<int:id>/", views.specific_creation_article),
    path("islogged/", views.checkLogged),
    path("create/uploadimage/<int:id>/", views.upload_article_image),
    path("search/", views.get_matching_articles),
    path("getfeatured/", views.get_featured_article)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)