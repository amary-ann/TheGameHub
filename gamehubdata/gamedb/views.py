from django.shortcuts import render,get_object_or_404
from django.http import JsonResponse

from .models import Gameusers

# Create your views here.
def game(request):
    if request.method == "GET":
        users = Gameusers.objects.all()
        users_serializer = GameusersSerializer(users, many = True)
        return JsonResponse(users_serializer.data, safe = False)
