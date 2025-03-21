from django.contrib import admin
from .models import Student

# Register your models here.
class AdminStudent(admin.ModelAdmin):
    list_display = ('firstname' , 'lastname' , 'joined_date')



admin.site.register(Student, AdminStudent)