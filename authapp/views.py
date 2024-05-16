from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from json import loads 

# Create your views here.
@api_view(['POST'])
def signup(request):
	try:
		credentials = loads(request.body)
		print(credentials)
		uname = credentials.get('username')
		passwd = credentials.get('password')
		mail = credentials.get('email')
		last_name = credentials.get('last_name')
		first_name = credentials.get('first_name')
		User.objects.create_user(username=uname, password=passwd, email=mail, first_name=first_name, last_name=last_name)
		return Response({'message': 'success'})
	except Exception as e:
		print('--------------------------------------')
		print(e)
		return Response({'message': 'failed'})

@api_view()
@permission_classes([IsAuthenticated])
def auth_test(reqest):
	return Response({'authentication_status': True})
