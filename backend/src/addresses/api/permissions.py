from rest_framework import permissions

class IsOwnerOrAdminOrRestrict(permissions.BasePermission):
    message = 'Only owner or admin is allowed.'

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the address.
        return obj.owner == request.user

