import uuid

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import AbstractUser, Group, PermissionsMixin
from django.db import models

from django.conf import settings

#
# class UserManager(BaseUserManager):
#     def create_user(self, email, password=None, **extra_fields):
#         extra_fields.setdefault("is_superuser", False)
#
#         if not email:
#             raise ValueError("Users must have an email address")
#
#         user = self.model(email=self.normalize_email(email), **extra_fields)
#         if not password:
#             user.set_unusable_password()
#         else:
#             user.set_password(password)
#         user.save()
#         return user
#
#
#     def create_superuser(self, email, password, **extra_fields):
#         extra_fields.setdefault("is_staff", True)
#         extra_fields.setdefault("is_superuser", True)
#
#         if extra_fields.get("is_staff") is not True:
#             raise ValueError("Superuser must have is_staff=True.")
#         if extra_fields.get("is_superuser") is not True:
#             raise ValueError("Superuser must have is_superuser=True.")
#
#         return self.create_user(email, password, **extra_fields)
#
#
# class User(AbstractBaseUser, PermissionsMixin):
#     """唯一的用户模型 —— AUTH_USER_MODEL 指针只能指向它。
#     """
#
#     class Role(models.TextChoices):
#         NORMAL = "user", "User"
#         ADMIN = "admin", "Admin"
#     role = models.CharField(max_length=10, choices=Role.choices, default=Role.NORMAL)
#
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     email = models.EmailField(unique=True)
#     avatar = models.ImageField(upload_to="avatar", null=False, blank=True)
#     #unique => has to be null=True
#     firebase_uid = models.CharField(max_length=128, unique=True, null=True, blank=True)
#     name = models.CharField(max_length=150, null=False, blank=True)
#
#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#
#     objects = UserManager()
#     is_staff = models.BooleanField(default=False)
#
#     USERNAME_FIELD = "email"
#     REQUIRED_FIELDS = []
#
#     def __str__(self):
#         return self.email
#
#

class User(models.Model):

    class Role(models.TextChoices):
        STANDARD = "standard", "Standard"
        ADMIN = "admin", "Admin"
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.STANDARD)

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # unique => has to be null=True
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to="avatar", null=False, blank=True)
    firebase_uid = models.CharField(max_length=128, unique=True)
    name = models.CharField(max_length=150, null=False, blank=True)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def is_admin(self):
        return self.role == self.Role.ADMIN

    @property
    def is_standard(self):
        return self.role == self.Role.STANDARD

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def __str__(self):
        return self.email


class Client(models.Model):
    class Status(models.TextChoices):
        NEGOTIATING = "negotiating", "Negotiating"
        WON = "won", "Won"
        LOST = "lost", "Lost"
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEGOTIATING)

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to="avatar", null=False, blank=True)
    project_name = models.CharField(max_length=150, null=False, blank=True, default="")
    project_revenue = models.DecimalField(max_digits=12, decimal_places=3, null=False, blank=True, default=0)

    invited_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="clients", null=True, blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class TodoList(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150, null=False, blank=True)
    owned_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="todoLists", null=False, blank=True
    )
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="assignedLists", null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class TodoItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150, null=False, blank=True)
    list_within = models.ForeignKey(
        TodoList, on_delete=models.CASCADE, related_name="todoItems", null=False, blank=False
    )
    content = models.TextField(null=False, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



