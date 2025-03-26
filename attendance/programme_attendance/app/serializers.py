from rest_framework import serializers
from .models import Teacher,Student, Subject , Timetable , Session, Attendance , Section , CalendarException

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id' , 'first_name' , 'last_name' , 'email','phone']

class StudentSerializer(serializers.ModelSerializer):
    section = serializers.StringRelatedField()
    subjects = serializers.PrimaryKeyRelatedField(many = True , read_only = True)
    class Meta:
        model = Student
        fields = ['id','roll_number','first_name','last_name','email','phone','section','subjects']



class SubjectSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer(read_only = True)
    class Meta:
        model = Subject
        fields = ['id' , 'name' ,'is_law_subject', 'semester','teacher']


class TimetableSerializer(serializers.ModelSerializer):
    # section = serializers.StringRelatedField()
    # subject = SubjectSerializer(read_only = True)
    # teacher = TeacherSerializer(read_only = True)

    section = serializers.PrimaryKeyRelatedField(queryset = Section.objects.all())
    subject = serializers.PrimaryKeyRelatedField(queryset = Subject.objects.all())
    teacher = serializers.PrimaryKeyRelatedField(queryset = Teacher.objects.all())
    class Meta:
        model = Timetable
        fields = ['id','section','subject','teacher','day_of_week','start_time', 'semester_start_date', 'semester_end_date']


class SessionSerializer(serializers.ModelSerializer):
    timetable = TimetableSerializer(read_only=True)

    class Meta:
        model = Session
        fields = ['id','timetable','date','status']


class AttendanceSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    session = SessionSerializer(read_only=True)
    recorded_by = TeacherSerializer(read_only=True)

    class Meta:
        model = Attendance
        fields = ['id','student','session','status','timestamp','recorded_by']
        read_only_fields = ['timestamp' , 'recorded_by']

class CalendarExceptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarException
        fields = ['id','date','description']

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id','program','name','year']
    # serializers.ModelSerializer(Section, fields='__all__')