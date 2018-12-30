# All important cart functionalities go here
import string
import random
import decimal

from django.shortcuts import get_object_or_404

from products.models import Product


class CartItem:
    """
    A class representing a single cart's item
    """
    cart = None  # reference to the instance of cart

    def __init__(self, item, quantity=1):
        self._quantity = quantity
        self._price = item.price  # assuming item has price attribute (it does)
        self._item = item

    @property
    def quantity(self):
        return self._quantity

    @quantity.setter
    def quantity(self, value):
        self._quantity = value

    @property
    def price(self):
        return self._price

    @property
    def total(self):
        return self.quantity * self.price


class Cart:
    """
    A class representing user's cart
    """

    def __init__(self, request):
        self.request = request
        self.CartItem.cart = self  # hooks up Cart with CartItem
        session_data = request.session.setdefault(session_key, {})
        session_items = session_data.setdefault('items', {})
        self.items = self.create_items(session_items)
        self.item_count = session_data.get('itemCount', 0)
        self.total_price = session_data.get('totalPrice', 0)

    def add(self, item_id, quantity=1):
        """
        Add item to the cart
        """
        pass

    def remove(self, item_id):
        """
        Remove item from the cart
        """
        pass

    def update_quantity(self, item_id, quantity):
        """
        Update item's quantity
        """
        pass

    def empty(self):
        """
        Empty cart
        """
        pass

    def list_items(self):
        """
        Returns a list of items stored in the cart
        """
        return list(self.items.values())
