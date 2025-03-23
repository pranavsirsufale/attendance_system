from rest_framework import serializers 
from .models import Session , Student , Attendance

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session 
        fields = ['id','timetable','date', 'status']

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['id', 'student' , 'session' , 'status','timestamp' ,'recorded_by' ]