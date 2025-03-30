from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'sessions',views.SessionViewSet)
router.register(r'attendance',views.AttendanceViewSet)
router.register(r'students', views.StudentViewSet)
router.register(r'timetables', views.TimetableViewSet)
router.register(r'sections', views.SectionViewSet)
router.register(r'subjects', views.SubjectViewSet)
router.register(r'teachers', views.TeacherViewSet)

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
    
    
    ]