
#!                       ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
#!                       █    DEVELOPED BY PRANAV SIRSUFALE   █
#!                       ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

#? ╔═══════════════════════════════════════════════════════════════════════════╗
#? ║                     DEVELOPED BY PRANAV SIRSUFALE                         ║
#? ╚═══════════════════════════════════════════════════════════════════════════╝



from django.contrib import admin
from django.urls import path , include
from rest_framework_simplejwt.views import TokenObtainPairView , TokenRefreshView



urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/',include('app.urls')),
    path('api/token/',TokenObtainPairView.as_view() , name = 'token_obtain_pair'),
    path('api/token?refresh/',TokenRefreshView.as_view() , name = 'token_refresh')
    
]


#!                       ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
#!                       █    DEVELOPED BY PRANAV SIRSUFALE   █
#!                       ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

#? ╔═══════════════════════════════════════════════════════════════════════════╗
#? ║                     DEVELOPED BY PRANAV SIRSUFALE                         ║
#? ╚═══════════════════════════════════════════════════════════════════════════╝