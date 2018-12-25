# All important cart functionalities go here
import string
import random

CART_ID_SESSION_KEY = 'cart_id'


def _generate_cart_id():
    """
    generate random cart_id of lenth 50
    """
    characters = string.ascii_letters + string.digits
    return ''.join(random.choices(characters, k=50))


def _cart_id(request):
    """
    get the current user's cart id or sets new one if blank
    """
    if request.session.get(CART_ID_SESSION_KEY):
        request.session[CART_ID_SESSION_KEY] = _generate_cart_id()
    return request.session[CART_ID_SESSION_KEY]


def get_cart_items():
    return CartItem.objects.filter(cart_id=_cart_id(request))


def get_single_item(request, item_id):
    return get_object_or_404(CartItem, id=item_id, cart_id=_cart_id(request))


def update_cart():
    pass


def remove_from_cart(request):
    item_id = request.POST.get('item_id')
    cart_item = get_single_item(request, item_id)
    if cart_item:
        cart_item.delete()


def cart_subtotal():
    pass


def cart_distinct_item_count(request):
    return get_cart_items(request).count()


def is_empty(request):
    return cart_distinct_item_count(request) == 0


def empty_cart(request):
    """
    Empties the cart
    """
    user_cart = get_cart_items(request)
    user_cart.delete()  # bulk delete
