from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter
from app.views import SectionSemesterWiseDataView


router = DefaultRouter()
router.register(r'teachers', views.TeacherViewSet)
router.register(r'students', views.StudentViewSet)
router.register(r'programs' , views.ProgramViewSet)
router.register(r'subjects', views.SubjectViewSet)
router.register(r'timetables', views.TimetableViewSet)
router.register(r'sessions',views.SessionViewSet)
router.register(r'admin-attendance-stats', views.AdminAttendanceStatsView , basename= 'admin-attendance-stats')

urlpatterns = [
    # path('', views.home , name = 'home')
    path('', include(router.urls)),
    path('calendar/', views.TeacherCalendarView.as_view(), name='teacher_calendar'),
    path('mark-attendance/<int:session_id>/', views.MarkAttendanceView.as_view(), name='mark_attendance'),
    path('holidays/', views.HolidayListCreateView.as_view(), name='holiday_list_create'),
    path('attendance-stats/<str:roll_number>/', views.AttendanceStatsView.as_view(), name='attendance_stats'),
    path('teacher-info/', views.teacher_info, name='teacher_info'),
    path('teacher-attendance-stats/', views.TeacherAttendanceStatsView.as_view(), name='teacher_attendance_stats'),
    path('hourly-stats/<int:session_id>/', views.ClassHourlyStatsView.as_view(), name='hourly_stats'),
    path('sections/', views.get_sections, name='get_sections'),
    path('subjects/', views.get_subjects, name='get_subjects'),
    path('time-slots/', views.get_time_slots, name='get_time_slots'),
    path('subjects-for-section/', views.get_subjects_for_section, name='get_subjects_for_section'),
    path('section-semester-wise/', SectionSemesterWiseDataView.as_view(), name='section_semester_wise'),

    ]