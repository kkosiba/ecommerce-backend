# All important cart functionalities go here
import string
import random
import decimal

from django.shortcuts import get_object_or_404


CART_ID_SESSION_KEY = 'cart_id'


def get_or_set_cart_id(request):
    """
    Get the current user's cart id or sets new one if empty
    """
    if not request.session.get(CART_ID_SESSION_KEY):
        characters = string.ascii_letters + string.digits
        # Generate random cart_id of lenth 50
        request.session[CART_ID_SESSION_KEY] = ''.join(
            random.choices(characters, k=50))
    return request.session[CART_ID_SESSION_KEY]


def add_to_cart(request):
    product_slug = request.POST.get('product_slug')

    # get quantity added, default to 1 if empty
    quantity = request.POST.get('quantity', 1)

    product = get_object_or_404(Product, slug=product_slug)

    # get products in cart
    cart_products = get_cart_items(request)

    # check to see if item is already in cart
    is_product_in_cart = False
    for cart_item in cart_products:
        if cart_item.product.id == product.id:
            # update the quantity if found
            cart_item.increase_product_quantity(quantity)
            is_product_in_cart = True
    if not is_product_in_cart:
        # create and save a new cart item
        new_cart_item = CartItem()
        new_cart_item.product = product
        new_cart_item.quantity = quantity
        new_cart_item.cart_id = get_or_set_cart_id(request)
        new_cart_item.save()


def get_cart_items(request):
    return CartItem.objects.filter(cart_id=get_or_set_cart_id(request))


def get_single_item(request, item_id):
    return get_object_or_404(CartItem, id=item_id, cart_id=get_or_set_cart_id(request))


def update_cart(request):
    item_id = request.POST.get('item_id')
    quantity = request.POST.get('quantity')
    item = get_single_item(request, item_id)
    if item:
        if quantity > 0:
            item.quantity = quantity
            item.save()
        else:
            remove_from_cart(request)


def remove_from_cart(request):
    item_id = request.POST.get('item_id')
    item = get_single_item(request, item_id)
    if item:
        item.delete()


def cart_subtotal(request):
    """
    Calculates the subtotal value of the current cart
    """
    subtotal = decimal.Decimal('0.00')
    products = get_cart_items(request)
    for item in products:
        subtotal += item.product.price * item.quantity
    return subtotal


def cart_distinct_item_count(request):
    return get_cart_items(request).count()


def is_empty(request):
    return cart_distinct_item_count(request) == 0


def empty_cart(request):
    """
    Empties the cart
    """
    items = get_cart_items(request)
    items.delete()  # bulk delete
