from rest_framework import serializers
from .models import Teacher,Student, Subject , Program , Timetable , Session, Attendance , Section , CalendarException

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id' , 'first_name' , 'last_name' , 'email','phone' , 'is_admin']

class StudentSerializer(serializers.ModelSerializer):
    section = serializers.StringRelatedField()
    subjects = serializers.PrimaryKeyRelatedField(many = True , read_only = True)
    class Meta:
        model = Student
        fields = ['id','roll_number','first_name','last_name','email','phone','section','subjects']

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ['id' , 'name' , 'duration']
     
class SubjectSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer(read_only = True)
    class Meta:
        model = Subject
        fields = ['id' , 'name' ,'is_law_subject', 'semester','teacher']

class DailyScheduleSerializer(serializers.Serializer):
    day_of_week = serializers.ChoiceField(choices= Timetable.DAY_CHOICES)
    subject = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all())
    start_time = serializers.ChoiceField(choices=Timetable.LECTURE_SLOTS)

class CalendarExceptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarException
        fields = ['id','date','description']

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id','program','name','year']

class TimetableSerializer(serializers.ModelSerializer):
    
    section = SectionSerializer(read_only = True)
    teacher = TeacherSerializer(read_only = True )
    subject = SubjectSerializer(read_only = True)
    # daily_schedules = DailyScheduleSerializer(many=True)

    class Meta:
        model = Timetable
        fields = ['id', 'section', 'teacher', 'subject', 'day_of_week', 'start_time', 
                  'semester_start_date', 'semester_end_date']
        # fields = ['id', 'section', 'teacher', 'day_of_week', 'subject', 'start_time', 
        #           'semester_start_date', 'semester_end_date', 'daily_schedules']
        # extra_kwargs = {
        #     'day_of_week': {'required': False},
        #     'subject': {'required': False},
        #     'start_time': {'required': False},
        # }

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

class TimetableCreateSerializer(serializers.ModelSerializer):
    section = serializers.PrimaryKeyRelatedField(queryset=Section.objects.all())
    teacher = serializers.PrimaryKeyRelatedField(queryset = Teacher.objects.all())
    daily_schedules = DailyScheduleSerializer(many = True )

    class Meta:
        model = Timetable
        fields = ['id', 'section', 'teacher', 'daily_schedules', 'semester_start_date', 'semester_end_date']