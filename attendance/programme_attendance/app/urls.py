
#!                       ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
#!                       █    DEVELOPED BY PRANAV SIRSUFALE   █
#!                       ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

#? ╔═══════════════════════════════════════════════════════════════════════════╗
#? ║                     DEVELOPED BY PRANAV SIRSUFALE                         ║
#? ╚═══════════════════════════════════════════════════════════════════════════╝

from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter
from app.views import SectionSemesterWiseDataView
import logging
logger = logging.getLogger(__name__)


#!                       ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
#!                       █    THE TEACHER VIEWS APPEAR HERE   █
#!                       ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

router = DefaultRouter()
router.register(r'teachers', views.TeacherViewSet)
router.register(r'students', views.StudentViewSet)
router.register(r'programs' , views.ProgramViewSet)
router.register(r'subjects', views.SubjectViewSet)
router.register(r'timetables', views.TimetableViewSet)
router.register(r'sessions',views.SessionViewSet)
router.register(r'admin-attendance-stats', views.AdminAttendanceStatsView , basename= 'admin-attendance-stats')



#!                       ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
#!                       █    THE ADMIN VIEWS APPEAR HERE     █
#!                       ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀


# Admin routes with 'admin/' prefix
router.register(r'admin/teachers', views.AdminTeacherViewSet, basename='admin-teachers')
router.register(r'admin/students', views.AdminStudentViewSet, basename='admin-students')
router.register(r'admin/programs', views.AdminProgramViewSet, basename='admin-programs')
router.register(r'admin/subjects', views.AdminSubjectViewSet, basename='admin-subjects')
router.register(r'admin/sections', views.AdminSectionViewSet, basename='admin-sections')
router.register(r'admin/timetables', views.AdminTimetableViewSet, basename='admin-timetables')


# Debug router setup
logger.info('Router registry: %s', router.registry)
logger.info('Router URLs: %s', router.urls)
for url in router.urls:
    logger.info('URL Pattern: %s, Callback: %s', url.pattern, url.callback)


urlpatterns = [
    path('', include(router.urls)),
    path('admin/semesters/', views.SemestersForSectionView.as_view(), name='semesters-for-section'),
    # path('', views.home , name = 'home')
    # Manual admin routes
    # path('api/admin/', include((admin_router_instance.urls, 'admin'), namespace='admin')),
    path('api/admin/attendance-overview/', views.AdminAttendanceOverview.as_view(), name='admin-attendance-overview'),
    path('api/admin/holidays/', views.AdminHolidayManagement.as_view(), name='admin-holidays'),
    



    # EXISTING ROUTES 
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


#!                       ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
#!                       █    DEVELOPED BY PRANAV SIRSUFALE   █
#!                       ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀


#? ╔═══════════════════════════════════════════════════════════════════════════╗
#? ║                     DEVELOPED BY PRANAV SIRSUFALE                         ║
#? ╚═══════════════════════════════════════════════════════════════════════════╝