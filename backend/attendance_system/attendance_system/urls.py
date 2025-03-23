from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from attendance_app.views import SessionViewSet , AttendanceViewSet

router = DefaultRouter()
router.register(r'sessions',SessionViewSet)
router.register(r'attendance',AttendanceViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include('attendance_app.urls')),
    

]
