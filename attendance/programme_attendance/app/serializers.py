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
    program = serializers.SlugRelatedField(slug_field='name', read_only=True)
    available_semesters = serializers.SerializerMethodField()

    def get_available_semesters(self, obj):
        # Get subjects available for this section's program and year
        program_duration = obj.program.duration_years * 2  # Max semesters
        start_semester = (obj.year - 1) * 2 + 1
        end_semester = min(obj.year * 2, program_duration)
        subjects = Subject.objects.filter(semester__gte=start_semester, semester__lte=end_semester)
        return sorted(set(subject.semester for subject in subjects))

    class Meta:
        model = Section
        fields = ['id', 'name', 'year', 'program', 'available_semesters']

class TimetableSerializer(serializers.ModelSerializer):
    section = SectionSerializer()
    subject = SubjectSerializer()
    teacher = TeacherSerializer()
    semester = serializers.IntegerField(source='subject.semester', read_only=True)

    class Meta:
        model = Timetable
        fields = ['id', 'section', 'teacher', 'subject', 'semester', 'day_of_week', 'start_time', 'semester_start_date', 'semester_end_date']

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




# serializers.py
class TimetableCreateSerializer(serializers.Serializer):
    section = serializers.PrimaryKeyRelatedField(queryset=Section.objects.all())
    teacher = serializers.PrimaryKeyRelatedField(queryset=Teacher.objects.all())
    semester = serializers.IntegerField()
    daily_schedules = serializers.ListField(
        child=serializers.DictField(child=serializers.CharField())
    )
    semester_start_date = serializers.DateField()
    semester_end_date = serializers.DateField()


    def validate_daily_schedules(self, value):
        LECTURE_SLOTS = Timetable.LECTURE_SLOTS
        for schedule in value:
            required_fields = ['day_of_week', 'subject', 'start_time']
            if not all(field in schedule for field in required_fields):
                raise serializers.ValidationError(f"Each schedule must include {required_fields}")
            if schedule['day_of_week'] not in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']:
                raise serializers.ValidationError("Invalid day of week")
            if schedule['start_time'] not in [slot[0] for slot in LECTURE_SLOTS]:
                raise serializers.ValidationError(f"Start time must be one of {[slot[0] for slot in LECTURE_SLOTS]}")
        return value

    def validate(self, data):
        section = data['section']
        semester = data['semester']
        program_duration = section.program.duration_years * 2
        start_semester = (section.year - 1) * 2 + 1
        end_semester = min(section.year * 2, program_duration)

        if semester < start_semester or semester > end_semester:
            raise serializers.ValidationError(f"Semester {semester} is not valid for {section} (valid range: {start_semester}-{end_semester})")

        for schedule in data['daily_schedules']:
            subject = Subject.objects.get(id=schedule['subject'])
            if subject.semester != semester:
                raise serializers.ValidationError(f"Subject {subject.name} (Semester {subject.semester}) does not match selected semester {semester}")
        return data





'''

class TimetableCreateSerializer(serializers.Serializer):
    
    section = serializers.PrimaryKeyRelatedField(queryset=Section.objects.all())
    teacher = serializers.PrimaryKeyRelatedField(queryset=Teacher.objects.all())
    semester = serializers.IntegerField()
    daily_schedules = serializers.ListField(
        child=serializers.DictField(child=serializers.CharField())
    )


    def validate_daily_schedules(self, value):
        LECTURE_SLOTS = Timetable.LECTURE_SLOTS
        for schedule in value:
            required_fields = ['day_of_week', 'subject', 'start_time']
            if not all(field in schedule for field in required_fields):
                raise serializers.ValidationError(f"Each schedule must include {required_fields}")
            if schedule['day_of_week'] not in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']:
                raise serializers.ValidationError("Invalid day of week")
            if schedule['start_time'] not in [slot[0] for slot in LECTURE_SLOTS]:
                raise serializers.ValidationError(f"Start time must be one of {[slot[0] for slot in LECTURE_SLOTS]}")
        return value

    def validate(self, data):
        section = data['section']
        semester = data['semester']
        program_duration = section.program.duration_years * 2
        start_semester = (section.year - 1) * 2 + 1
        end_semester = min(section.year * 2, program_duration)

        if semester < start_semester or semester > end_semester:
            raise serializers.ValidationError(f"Semester {semester} is not valid for {section} (valid range: {start_semester}-{end_semester})")

        for schedule in data['daily_schedules']:
            subject = Subject.objects.get(id=schedule['subject'])
            if subject.semester != semester:
                raise serializers.ValidationError(f"Subject {subject.name} (Semester {subject.semester}) does not match selected semester {semester}")
        return data
    

previous 

'''

