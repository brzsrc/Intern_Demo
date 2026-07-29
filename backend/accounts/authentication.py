import firebase_admin
from django.conf import settings
from firebase_admin import auth, credentials
from rest_framework import authentication
from .models import User
from rest_framework.exceptions import AuthenticationFailed, AuthenticationFailed
from config.settings import FIREBASE_PATH

if not firebase_admin._apps:  # 防重复初始化
    import firebase_admin
    from firebase_admin import credentials

    cred = credentials.Certificate(FIREBASE_PATH)
    firebase_admin.initialize_app(cred)


class FirebaseAuthentication(authentication.BaseAuthentication):

    def authenticate(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None

        id_token = auth_header.split(" ").pop()
        if not id_token:
            raise AuthenticationFailed("Token can not be empty")

        try:
            decoded_token = auth.verify_id_token(id_token)
        except Exception:
            raise AuthenticationFailed("Firebase token invalid")

        uid = decoded_token.get("uid")

        try:
            user = User.objects.get(firebase_uid=uid)
        except User.DoesNotExist:
            raise AuthenticationFailed("User not registered, call /register first")

        return (user, None)
