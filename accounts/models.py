from django.db import models

# Create your models here.
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

class UserManager(BaseUserManager):
    """
    Custom user manager
    """
    def create_user(self, email, name=None, password=None,
                    is_active=True, is_admin=False):
        """
        Creates and saves a User with the given information
        """
        if not email:
            raise ValueError('Users must have an email address.')

        if not password:
            raise ValueError('Users must have password.')

        # Normalizes email address by lowercasing the domain portion.
        user = self.model(email=self.normalize_email(email),
                          name=name, )

        user.set_password(password)
        user.is_active = is_active
        user.is_admin = is_admin
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, name=None):
        """
        Creates and saves a superuser with the given information
        """

        # reuse code from method above
        user = self.create_user(email=email,
                                name=name,
                                password=password,
                                is_active=True,
                                is_admin=True, )
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    """
    Custom user model. User is identified by email, instead of username.
    """
    email           = models.EmailField(unique=True,
                                        verbose_name='Email address',
                                        max_length=255)
    name            = models.CharField(max_length=255,
                                       blank=True,
                                       null=True)
    is_active       = models.BooleanField(default=True)
    is_admin        = models.BooleanField(default=False)

    objects         = UserManager()

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = [] # USERNAME_FIELD and password are always prompted for

    def get_full_name(self):
        if self.name: # if name is provided...
            return self.name.capitalize() # ... return it ...
        return self.email # ... otherwise return email

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        """Does the user have a specific permission?"""
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        """Does the user have permissions to view the app `app_label`?"""
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        """Is the user a member of staff?"""
        # Simplest possible answer: All admins are staff
        return self.is_admin
