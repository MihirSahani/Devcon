from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class PostModel(models.Model):
	class Meta:
		db_table = 'posts'
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	dtime = models.DateTimeField()
	message = models.CharField(max_length=512)
	like_count = models.IntegerField(default=0)
	dislike_count = models.IntegerField(default=0)


class LikeModel(models.Model):
	class Meta:
		db_table = 'like'
		unique_together = ['post_id', 'liked_by']

	liked_by = models.ForeignKey(User, on_delete=models.CASCADE)
	post_id = models.ForeignKey(PostModel, on_delete=models.CASCADE)
	dtime = models.DateTimeField()


class DislikeModel(models.Model):
	class Meta:
		db_table = 'dislike'
		unique_together = ['post_id', 'disliked_by']

	disliked_by = models.ForeignKey(User, on_delete=models.CASCADE)
	post_id = models.ForeignKey(PostModel, on_delete=models.CASCADE)
	dtime = models.DateTimeField()


class CommentModel(models.Model):
	class Meta:
		db_table = 'comment'
		# unique_together = ['post_id', 'commented_by']
	commented_by = models.ForeignKey(User, on_delete=models.CASCADE)
	post_id = models.ForeignKey(PostModel, on_delete=models.CASCADE)
	dtime = models.DateTimeField()
	comment = models.CharField(max_length=256)