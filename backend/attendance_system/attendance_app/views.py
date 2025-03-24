# from django.shortcuts import render 
from django.http import HttpResponse 
from django.template import loader
from .models import Student , Attendance , Session
# from .serializers import SessionSerializer , AttendanceSerializer
from rest_framework import viewsets

def home(req):
    template = loader.get_template('home.html')
    return HttpResponse(template.render())

def members(request):
    mymembers = Student.objects.all().values()
    template = loader.get_template('all_students.html')
    context = {
        'students':mymembers
    }
    # print(context['students'])
    return HttpResponse(template.render(context , request))


def details(request,id):
    student = Student.objects.get(id = id )
    # print(student)
    template = loader.get_template('details.html')
    context = { 
        'student' : student
    }
    return HttpResponse(template.render(context,request))

# class SessionViewSet(viewsets.ModelViewSet):
#     queryset = Session.objects.all()
#     serializer_class = SessionSerializer

#     def get_queryset(self):
#         teacher_id = self.request.query_params.get('teacher_id')
#         if teacher_id :
#             return Session.objects.filter(timetable__subject__teacher_id = teacher_id)
#         return self.queryset
    

# class AttendanceViewSet(viewsets.ModelViewSet):
#     queryset = Attendance.objects.all()
#     serializer_class = AttendanceSerializer

        


