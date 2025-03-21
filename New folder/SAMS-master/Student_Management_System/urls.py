from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('Master.urls')),
    path('admin/', admin.site.urls),
]
