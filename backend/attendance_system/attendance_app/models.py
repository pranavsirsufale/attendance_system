'''
from django.db import models
from django.contrib.auth.models import User

default_first_name = 'firstname'
default_last_name = 'lastname'
default_email = 'email@gmail.com'


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete= models.CASCADE)
    first_name = models.CharField(max_length = 50 , null = False  , default=default_first_name )
    last_name = models.CharField(max_length = 50  , null = False  , default = default_last_name)
    email = models.EmailField(unique = True , null = False , default= default_email )
    phone = models.CharField(max_length = 15 , null = True , blank = True )
    # pass_field = models.CharField(max_length = 255 )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Student(models.Model):
    first_name = models.CharField(max_length = 50 , null= False , default= default_first_name )
    last_name = models.CharField(max_length = 50 , null= False , default= default_last_name)
    email = models.EmailField(unique = True , null = False , default= default_email)
    phone = models.CharField(max_length = 15 , null = True, blank = True )
    roll_number = models.CharField(max_length = 20 , unique = True , null = False , auto_created= True )


class Subject(models.Model):
    subject_name = models.CharField(max_length = 100)
    teacher = models.ForeignKey(Teacher, on_delete = models.SET_NULL , null = True )



class Timetable(models.Model):
    DAY_CHOICES = [
        ('Monday','Monday'),
        ('Tuesday','Tuesday'),
        ('Wednesday','Wednesday'),
        ('Thursday','Thursday'),
        ('Friday','Friday'),
        ('Saturday','Saturday'),
        ('Sunday','Sunday'),
        ]

    subject = models.ForeignKey(Subject , on_delete = models.CASCADE)
    day_of_week = models.CharField(max_length = 9 , choices = DAY_CHOICES )
    start_time = models.TimeField( null= False)
    end_time = models.TimeField( null = False)
    room = models.CharField(max_length = 50 , null = True, blank = True )
    semester_start_date = models.DateField(null = False)
    semester_end_date = models.DateField( null = False )

    class Meta:
        unique_together = ('subject' , 'day_of_week', 'start_time')
        constraints = [
            models.CheckConstraint(check = models.Q(start_time__lt = models.F('end_time')) , name = 'ckk_time_range')
            ]




class Session(models.Model):
    STATUS_CHOICES = [
    ('Scheduled', 'Scheduled'),
    ('Completed', 'Completed'),
    ('Cancelled', 'Cancelled'),
    ]

    timetable = models.ForeignKey(Timetable , on_delete = models.CASCADE )
    date = models.DateField()
    status = models.CharField(max_length = 10 , choices = STATUS_CHOICES  , default = 'Scheduled') 

    class Meta:
        unique_together = ('timetable' , 'date')


class Attendance(models.Model):
    STATUS_CHOICES = [
        ('Present', 'Present'),
        ('Absent', 'Absent'),
    ]

    student = models.ForeignKey(Student , on_delete = models.CASCADE )
    session = models.ForeignKey(Session , on_delete = models.CASCADE )
    status = models.CharField(max_length = 7 , choices = STATUS_CHOICES,  null = True , blank = True )
    timestamp = models.DateTimeField(auto_now= True , null= False )
    recorded_by = models.ForeignKey(Teacher , on_delete = models.SET_NULL , null = True )

    class Meta:
        unique_together = ('student','session')




class StudentSubject(models.Model):
    student = models.ForeignKey(Student , on_delete = models.CASCADE)
    subject = models.ForeignKey(Subject , on_delete = models.CASCADE )
    
    class Meta:
        unique_together = ( 'student','subject')


class CalendarException(models.Model):
    date = models.DateField(unique = True )
    description = models.CharField(max_length = 100 ) 

'''



from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

# Validate time range (start_time < end_time)
def validate_time_range(value):
    if value['start_time'] >= value['end_time']:
        raise ValidationError("Start time must be before end time.")

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Links to Django’s User for auth
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        verbose_name = "Teacher"
        verbose_name_plural = "Teachers"

class Student(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    roll_number = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.roll_number})"

    class Meta:
        verbose_name = "Student"
        verbose_name_plural = "Students"

class Subject(models.Model):
    subject_name = models.CharField(max_length=100)
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, related_name="subjects")

    def __str__(self):
        return self.subject_name

    class Meta:
        verbose_name = "Subject"
        verbose_name_plural = "Subjects"

class Timetable(models.Model):
    DAY_CHOICES = [
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
        ('Sunday', 'Sunday'),
    ]
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="timetable")
    day_of_week = models.CharField(max_length=9, choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    room = models.CharField(max_length=50, null=True, blank=True)
    semester_start_date = models.DateField()
    semester_end_date = models.DateField()

    def clean(self):
        if self.start_time >= self.end_time:
            raise ValidationError("Start time must be before end time.")

    def __str__(self):
        return f"{self.subject} - {self.day_of_week} {self.start_time}-{self.end_time}"

    class Meta:
        unique_together = ('subject', 'day_of_week', 'start_time')
        verbose_name = "Timetable"
        verbose_name_plural = "Timetables"

class Session(models.Model):
    STATUS_CHOICES = [
        ('Scheduled', 'Scheduled'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]
    timetable = models.ForeignKey(Timetable, on_delete=models.CASCADE, related_name="sessions")
    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Scheduled')

    def __str__(self):
        return f"{self.timetable} on {self.date} ({self.status})"

    class Meta:
        unique_together = ('timetable', 'date')
        verbose_name = "Session"
        verbose_name_plural = "Sessions"

class Attendance(models.Model):
    STATUS_CHOICES = [
        ('Present', 'Present'),
        ('Absent', 'Absent'),
        ('Late', 'Late'),
    ]
    student = models.ForeignKey(Student, on_delete = models.CASCADE, related_name="attendance")
    session = models.ForeignKey(Session, on_delete = models.CASCADE, related_name= 'attendance' ) 
    status = models.CharField(max_length = 7 , choices = STATUS_CHOICES , defualt = 'Absent')
    recorded_by = models.ForeignKey(Teacher,on_delete=models.SET_NULL , null=True, related_name="attendance_records")


    def __str__(self):
        return f'{self.student} - {self.session} - {self.status}'
    

    class Meta:
        unique_together = ('student' , 'session')
        verbose_name = 'Attendance'
        verbose_name_plural = 'Attendance'


class CalendarException(models.Model):
    date = models.DateField(unique= True)
    description = models.CharField(max_length = 100 )

    def __str__(self):
        return f'{self.date} - {self.description}'
    
    class Meta:
        verbose_name = 'Calendar Exception'
        verbose_name_plural = 'Calendar Exceptions'
        

