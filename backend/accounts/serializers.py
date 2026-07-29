from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import User, Client, TodoList, TodoItem


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["avatar", "name", "role"]


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "email", "avatar", "name", "role",
                  "is_active", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]





class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["id", "email", "avatar", "status", "project_name", "project_revenue",
                  "invited_by", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]



class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at", "assigned_to"]

class ListAssignSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ["assigned_to"]


class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]
