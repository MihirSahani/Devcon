from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.forms.models import model_to_dict
from django.db.utils import IntegrityError
from rest_framework.views import APIView
from rest_framework.viewsets import generics
from rest_framework.response import Response
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from json import loads

from .models import *
from .serializers import *
# Create your views here.

@permission_classes([IsAuthenticated])
class PostView(APIView):

	def get(self, request):
		try:
			postlist = get_list_or_404(PostModel.objects.order_by('-dtime').all())
			postlist = PostSerializer(postlist, many=True)
			return Response(postlist.data)
		except Exception as e:
			return Response([])
	
	def post(self, request):
		postitem = loads(request.body)
		uname = postitem.get('uname')
		message = postitem.get('message')
		usr = User.objects.get(username=uname)
		p = PostModel(user=usr, dtime=timezone.now(), message=message)
		p.save()
		return Response({'message': 'success'})

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete(request):
	try:
		uname = loads(request.body)
		uname = uname.get('uname')
		User.objects.get(username=uname).delete()
		return Response({"message": True})
	except Exception as e:
		print('------------------------------------------------', e)
		print(request.body)
		return Response({"message": False})

@permission_classes([IsAuthenticated])
class LikeView(APIView):

	def get(self, request):
		try:
			request = loads(request.body)
			post_id = request.get('id')
			likelist = get_list_or_404(LikeModel.objects.order_by('-dtime').all().filter(post_id=post_id))
			likelist = LikeSerializer(likelist, many=True)
			return Response(likelist.data)
		except Exception as e:
			print('----------------------------------------------', e)
			return Response([])
	
	def post(self, request):
		try:
			likeitem = loads(request.body)
			uname = likeitem.get('uname')
			post_id = likeitem.get('id')

			usr = User.objects.get(username=uname)
			pst = PostModel.objects.get(pk=post_id)
			if LikeModel.objects.filter(liked_by=usr.id, post_id=post_id).exists():
				print('User already liked')
				LikeModel.objects.get(liked_by=usr.id, post_id=post_id).delete()
				pst.like_count = len(LikeModel.objects.all().filter(post_id=post_id))
				pst.save()
				return Response({'message': 'You already have liked the post'})
			else:
				likeitem = LikeModel(liked_by=usr, post_id=pst, dtime=timezone.now())
				likeitem.save()

				pst.like_count = len(LikeModel.objects.all().filter(post_id=post_id))
				pst.save()
				return Response({'message': 'Liked the message'})
		except Exception as e:
			return Response({'message': 'failed'})

@permission_classes([IsAuthenticated])
class DislikeView(APIView):

	def get(self, request):
		try:
			request = loads(request.body)
			post_id = request.get('id')
			dislikelist = get_list_or_404(DislikeModel.objects.order_by('-dtime').all().filter(post_id=post_id))
			dislikelist = DislikeSerializer(dislikelist, many=True)
			return Response(dislikelist.data)
		except Exception as e:
			print('----------------------------------------------', e)
			return Response([])
	
	def post(self, request):
		try:
			dislikeitem = loads(request.body)
			uname = dislikeitem.get('uname')
			post_id = dislikeitem.get('id')

			usr = User.objects.get(username=uname)
			pst = PostModel.objects.get(pk=post_id)
			if DislikeModel.objects.filter(disliked_by=usr.id, post_id=post_id).exists():
				print('User already disliked')
				DislikeModel.objects.get(disliked_by=usr.id, post_id=post_id).delete()
				pst.dislike_count = len(DislikeModel.objects.all().filter(post_id=post_id))
				pst.save()
				return Response({'message': 'You already have disliked the post'})
			else:
				dislikeitem = DislikeModel(disliked_by=usr, post_id=pst, dtime=timezone.now())
				dislikeitem.save()

				pst.dislike_count = len(DislikeModel.objects.all().filter(post_id=post_id))
				pst.save()
				return Response({'message': 'disliked the message'})
		except Exception as e:
			return Response({'message': 'failed'})
		
class CommentView(APIView):

	def get(self, request):
		try:
			commentitem = loads(request.body)
			post_id = commentitem.get('id')
			commentitem = get_list_or_404(CommentModel.objects.all().filter(post_id=post_id))
			commentitem = CommentSerializer(commentitem, many=True)
			return Response(commentitem.data)
			
		except Exception as e:
			print('----------------------------------------------', e)
			return Response({'message': 'failed'})

	def post(self, request):
		try:
			commentitem = loads(request.body)
			uname = commentitem.get('uname')
			post_id = commentitem.get('id')
			comment = commentitem.get('comment')
			usr = User.objects.get(username=uname)
			pst = PostModel.objects.get(pk=post_id)
			commentitem = CommentModel(commented_by=usr, post_id=pst, dtime=timezone.now(), comment=comment)
			commentitem.save()
			return Response({'message': 'commented!'})
		except Exception as e:
			print('----------------------------------------------', e)
			return Response({'message': 'failed'})