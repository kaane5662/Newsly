from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views_test import AccountsView, ArticlesView, SpecificArticlesView, ReviewsView

urlpatterns = [
    path("accounts/", AccountsView.as_view(), name = "accounts_view"),
    path("articles/", ArticlesView.as_view()),
    path("publish/", views.publish_article),
    path("articles/<int:id>/", SpecificArticlesView.as_view()),
    path("articles/reviews/<int:id>/", ReviewsView.as_view()),
    path("create/", views.creation_article_view),
    path("create/edit/<int:id>/", views.specific_creation_article),
    path("islogged/", views.checkLogged),
    path("create/uploadimage/<int:id>/", views.upload_article_image),
    path("search/", views.get_matching_articles),
    path("getfeatured/", views.get_featured_article)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)