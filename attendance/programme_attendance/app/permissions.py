from rest_framework.permissions import BasePermission
from app.models import Teacher


class IsAdmin(BasePermission):
    def has_permission(self,request,view):
        if not request.user.is_authenticated:
            return False
        try:
            teacher = Teacher.objects.get(user = request.user)
            return teacher.is_admin
        except Teacher.DoesNotExist:
            return False
        




