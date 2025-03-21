from django.db import models

class Teacher(models.Model):
    first_name = models.CharField(max_length = 50 )
    last_name = models.CharField(max_length = 50  )
    email = models.EmailField(unique = True )
    phone = models.CharField(max_length = 15 , null = True , blank = True )
    pass_field = models.CharField(max_length = 255 )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Student(models.Model):
    first_name = models.CharField(max_length = 50 )
    last_name = models.CharField(max_length = 50)
    email = models.EmailField(unique = True)
    phone = models.CharField(max_length = 15 , null = True, blank = True )
    roll_number = models.CharField(max_length = 20 , unique = True )


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
    start_time = models.TimeField()
    end_time = models.TimeField()
    room = models.CharField(max_length = 50 , null = True, blank = True )
    semester_start_date = models.DateField()
    semester_end_date = models.DateField()

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
    status = models.CharField(max_length = 10 , choices = STATUS_CHOICES ) 




    
