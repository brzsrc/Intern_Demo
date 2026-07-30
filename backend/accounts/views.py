from rest_framework.exceptions import PermissionDenied, ValidationError, AuthenticationFailed
from rest_framework.decorators import action
from rest_framework import viewsets, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from accounts.models import Client, User, TodoList, TodoItem
from accounts.permissions import IsAdmin
from accounts.serializers import ClientSerializer, UserSerializer, TodoListSerializer, TodoItemSerializer, \
    ListAssignSerializer, RegisterSerializer, AuthSerializer
from firebase_admin import auth
from django.db.models import Q

class AuthView(generics.RetrieveUpdateAPIView):
    serializer_class = AuthSerializer
    def get_object(self):
        return self.request.user


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    authentication_classes = []
    def perform_create(self, serializer):
        auth_header = self.request.META.get("HTTP_AUTHORIZATION")
        if not auth_header or not auth_header.startswith("Bearer "):
            raise AuthenticationFailed("No token provided")

        id_token = auth_header.split(" ").pop()
        if not id_token:
            raise AuthenticationFailed("Token can not be empty")

        try:
            decoded_token = auth.verify_id_token(id_token)
        except Exception:
            raise AuthenticationFailed("Firebase token invalid")

        uid = decoded_token.get("uid")
        if User.objects.filter(firebase_uid=uid).exists():
            raise ValidationError("Already registered")

        email = decoded_token.get("email")
        if not email:
            raise AuthenticationFailed("No email provided")

        serializer.save(
            firebase_uid=uid,
            email=email,
        )




# Create your views here.
class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def assigned_lists(self, request, pk=None):
        instance = self.get_object()
        if (not request.user.is_admin) and (request.user.id != instance.id):
            raise PermissionDenied("You can only view your own assigned lists.")
        assigned_lists = instance.assignedLists.all()
        serializer = TodoListSerializer(assigned_lists, many=True)
        return Response(serializer.data)


    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def assigned_items(self, request, pk=None):
        instance = self.get_object()
        if (not request.user.is_admin) and (request.user.id != instance.id):
            raise PermissionDenied("You can only view your own assigned items.")
        # assigned_lists = instance.assignedLists.all()
        # assigned_items = []
        # for assigned_list in assigned_lists:
        #     assigned_items.extend(assigned_list.todoItems.all())
        assigned_items = TodoItem.objects.filter(list_within__assigned_to=instance)
        serializer = TodoItemSerializer(assigned_items, many=True)
        return Response(serializer.data)

class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()

    def get_queryset(self):
        return Client.objects.select_related("invited_by")

class TodoListViewSet(viewsets.ModelViewSet):
    serializer_class = TodoListSerializer
    queryset = TodoList.objects.all()

    def get_queryset(self):
        if self.request.user.is_admin:
            return TodoList.objects.all()
        # return TodoList.objects.filter(
        # Q(owned_by=self.request.user) | Q(assigned_to=self.request.user))
        return TodoList.objects.filter(owned_by=self.request.user)


    def perform_create(self, serializer):
        if self.request.user.is_admin:
            if "owned_by" in serializer.validated_data:
                serializer.save()
            else:
                serializer.save(owned_by=self.request.user)
        else:
            if "owned_by" in serializer.validated_data and serializer.validated_data["owned_by"] != self.request.user:
                raise PermissionDenied({"owned_by": "You are not an admin, you cannot set this field."})
            serializer.save(owned_by=self.request.user)

    # def perform_update(self, serializer):
    #     ...

    @action(detail=True, methods=["patch"], permission_classes=[IsAuthenticated, IsAdmin])
    def assign(self, request, pk=None):
        instance = self.get_object()
        if request.user.id != instance.owned_by_id:
            raise PermissionDenied({"owned_by_id": "You can only assign your own list to others"})

        serializer = ListAssignSerializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def items(self, request, pk=None):
        instance = self.get_object()
        todoItems = instance.todoItems.all()
        serializer = TodoItemSerializer(todoItems, many=True)
        return Response(serializer.data)


class TodoItemViewSet(viewsets.ModelViewSet):
    serializer_class = TodoItemSerializer
    queryset = TodoItem.objects.all()

    def get_queryset(self):
        if self.request.user.is_admin:
            return TodoItem.objects.all()
        return TodoItem.objects.filter(list_within__owned_by=self.request.user)

    def perform_create(self, serializer):
        if self.request.user.is_admin:
            serializer.save()
        else:
            if serializer.validated_data["list_within"].owned_by_id != self.request.user.id:
                raise PermissionDenied({"list_within": "You are not an admin, you can only add item in your own list."})
            serializer.save()


