import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'programme_attendance.settings')
django.setup()
from app.models import *
students = Student.objects.filter(section_id=1, semester=1)
print("number of students:", students.count())
sessions = Session.objects.filter(timetable__section_id=1, timetable__subject__semester=1, status='Completed')
print("number of sessions:", sessions.count())
