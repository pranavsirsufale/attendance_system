# from django.shortcuts import render 
from django.http import HttpResponse 
from django.template import loader
from .models import Student

def home(req):
    return HttpResponse('Hello world')

def members(request):
    mymembers = Student.objects.all().values()
    template = loader.get_template('all_students.html')
    context = {
        'students':mymembers
    }
    return HttpResponse(template.render(context , request))