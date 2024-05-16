from rest_framework.serializers import *
from django.contrib.auth.models import User
from django.utils import timezone
from .models import *

class UserSerializer(ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'username', 'first_name', 'last_name', 'email']

class UserForPostSerializer(ModelSerializer):
	class Meta:
		model = User
		fields = ['username', 'first_name', 'last_name']

class PostSerializer(ModelSerializer):
	user = UserForPostSerializer()
	class Meta:
		model = PostModel
		fields = ['id','dtime', 'message', 'user', 'like_count', 'dislike_count']

class LikeSerializer(ModelSerializer):

	liked_by = UserForPostSerializer()
	class Meta:
		model = LikeModel
		fields = ['liked_by']


class DislikeSerializer(ModelSerializer):

	user = UserForPostSerializer()
	class Meta:
		model = DislikeModel
		fields = ['disliked_by']

class CommentSerializer(ModelSerializer):

	commented_by = UserForPostSerializer()
	class Meta:
		model = CommentModel
		fields = ['commented_by', 'comment']