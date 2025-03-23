from django.db import models
from django.contrib.auth.models import User

default_first_name = 'firstname'
default_last_name = 'lastname'
default_email = 'email@gmail.com'


class Teacher(models.Model):
    first_name = models.CharField(max_length = 50 , null = False  , default=default_first_name )
    last_name = models.CharField(max_length = 50  , null = False  , default = default_last_name)
    email = models.EmailField(unique = True , null = False , default= default_email )
    phone = models.CharField(max_length = 15 , null = True , blank = True )
    pass_field = models.CharField(max_length = 255 )

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




