from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def get_queryset(self):
        return super(UserManager, self).get_queryset()

    def create_superuser(self, email=None, first_name=None, last_name=None, password=None):
        user = self.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password,
            is_staff= True
        )
        return user

    def create_user(self, email=None, first_name=None, last_name=None, password=None, is_active=False, is_staff=False, is_admin=False):
        if not email:
            raise ValueError('user must have an email')
        if not password:
            raise ValueError('user must have a password')

        user_obj = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name
        )
        user_obj.set_password(password)
        user_obj.staff     = is_staff
        user_obj.admin     = is_admin
        user_obj.is_active = is_active
        user_obj.save(using=self._db)
        return user_obj
