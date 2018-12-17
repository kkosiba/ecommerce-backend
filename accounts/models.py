from django.db import models

# Create your models here.
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

class UserManager(BaseUserManager):
    """
    Custom user manager
    """
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address.')

        # Normalizes email address by lowercasing the domain portion.
        user = self.model(email=self.normalize_email(email), )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(email,
                                password=password, )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    """
    Custom user model. User is identified by email, instead of username.
    """
    email           = models.EmailField(unique=True,
                                        verbose_name='email address',
                                        max_length=255)
    is_active       = models.BooleanField(default=True)
    is_admin        = models.BooleanField(default=False)

    objects             = UserManager()

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = [] # USERNAME_FIELD and password are always prompted for

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
