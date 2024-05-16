from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from .views import *

urlpatterns = [
	path('signup', signup, name='signup'),
	path('token', obtain_auth_token),
	path('test', auth_test, name='auth_test')
]