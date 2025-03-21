# from django.shortcuts import render 
from django.http import HttpResponse 
from django.template import loader
from .models import Student

def home(req):
    template = loader.get_template('home.html')
    return HttpResponse(template.render())

def members(request):
    mymembers = Student.objects.all().values()
    template = loader.get_template('all_students.html')
    context = {
        'students':mymembers
    }
    return HttpResponse(template.render(context , request))


def details(request,id):
    student = Student.objects.get(id = id )
    # print(student)
    template = loader.get_template('details.html')
    context = { 
        'student' : student
    }
    return HttpResponse(template.render(context,request))