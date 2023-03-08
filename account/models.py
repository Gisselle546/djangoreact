from django.db import models
from .managers import UserManager
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin
)


# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=100, blank=False, null=False)
    email = models.EmailField(max_length=100, unique=True)
    last_name = models.CharField(max_length=100, blank=False, null=True)
    staff                = models.BooleanField(default=False)
    admin                = models.BooleanField(default=False)
    


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return str(self.email)

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin
