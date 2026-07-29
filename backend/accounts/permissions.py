from rest_framework.permissions import BasePermission

# class IsAdminOrStandard(BasePermission):
#     # def has_object_permission(self, request, view, obj):
#     #     ...
#     def has_permission(self, request, view):
#         return request.user.is_admin() or request.user.is_standard()

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_admin
