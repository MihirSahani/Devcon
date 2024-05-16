from django.urls import path
from .views import *

urlpatterns = [
	path('message', PostView.as_view(), name='message'),
	path('delete', delete, name='delete'),
	path('like', LikeView.as_view(), name='like'),
	path('dislike', DislikeView.as_view(), name='dislike'),
	path('comment', CommentView.as_view(), name='comment'),
]