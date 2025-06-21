from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from django.http import HttpResponse




router = DefaultRouter()
router.register(r'teachers', views.TeacherViewSet, basename='teacher')
router.register(r'students', views.StudentViewSet, basename='student')
router.register(r'programs', views.ProgramViewSet, basename='program')
router.register(r'subjects', views.SubjectViewSet, basename='subject')
router.register(r'sections', views.SectionViewSet, basename='section')
router.register(r'timetables', views.TimetableViewSet, basename='timetable')
router.register(r'sessions', views.SessionViewSet, basename='session')
router.register(r'attendances', views.AttendanceViewSet, basename='attendance')
router.register(r'admin/teachers', views.AdminTeacherViewSet, basename='admin-teacher')
router.register(r'admin/students', views.AdminStudentViewSet, basename='admin-student')
router.register(r'admin/programs', views.AdminProgramViewSet, basename='admin-program')
router.register(r'admin/subjects', views.AdminSubjectViewSet, basename='admin-subject')
router.register(r'admin/sections', views.AdminSectionViewSet, basename='admin-section')
router.register(r'admin/timetables', views.AdminTimetableViewSet, basename='admin-timetable')
router.register(r'admin/sessions', views.AdminSessionViewSet, basename='admin-session')
# router.register(r'admin/attendance/export/',views.AdminAttendanceExportView, basename='admin-attendance')

urlpatterns = [
    path('teacher-info/', views.teacher_info, name='teacher-info'),
    path('teacher-subjects/', views.TeacherSubjectsView.as_view(), name='teacher-subjects'),
    path('calendar/', views.TeacherCalendarView.as_view(), name='teacher-calendar'),
    path('mark-attendance/<int:session_id>/', views.MarkAttendanceView.as_view(), name='mark-attendance'),
    path('holidays/', views.HolidayListCreateView.as_view(), name='holidays'),
    path('attendance-stats/<str:roll_number>/', views.AttendanceStatsView.as_view(), name='attendance-stats'),
    path('class-hourly-stats/<int:session_id>/', views.ClassHourlyStatsView.as_view(), name='class-hourly-stats'),
    path('subjects-for-section/', views.SubjectsForSectionView.as_view(), name='subjects-for-section'),
    path('sections/', views.get_sections, name='get-sections'),
    path('sections-for-program/',views.SectionForProgramView.as_view(),name = 'sections-for-program'),
    path('subjects-for-section-alt/', views.get_subjects_for_section, name='get-subjects-for-section'),
    path('subjects/', views.get_subjects, name='get-subjects'),
    path('admin/attendance-export/',views.AdminAttendanceExportView.as_view(),name='admin-attendance-export-csv'),
    path('time-slots/', views.get_time_slots, name='get-time-slots'),
    path('admin/attendance-stats/', views.AdminAttendanceStatsView.as_view(), name='admin-attendance-stats'),
    path('teacher-attendance-stats/', views.TeacherAttendanceStatsView.as_view(), name='teacher_attendance_stats'),

    # path('semesters-for-section/' , views.SemestersForSectionView.as_view() , name = 'semester-for-section'),
    path('students/bulk/',views.BulkStudentUploadView.as_view() , name='students-bulk'),
    path('students/pass/', views.PassStudentsView.as_view(), name='pass-students'),
    path('student-details/<int:pk>/', views.StudentDetailView.as_view(), name='student-detail'),

    path('admin/attendance-overview/', views.AdminAttendanceOverview.as_view(), name='admin-attendance-overview'),
    path('admin/holidays/', views.AdminHolidayManagement.as_view(), name='admin-holidays'),
    path('admin/semesters/', views.SemestersForSectionView.as_view(), name='admin-semesters'),
    path('admin/section-semester-data/', views.SectionSemesterWiseDataView.as_view(), name='section-semester-data'),
    path('', include(router.urls)),
]

