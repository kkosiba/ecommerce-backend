from django.test import TestCase
from products.models import Category, Product


class ProductsModelTest(TestCase):
    def setUp(self):
        self.test_product = Product.objects.create(
            name="Test Product", slug="test-product", price="9.99"
        )
        self.test_product.save()
        self.test_product.category.create(name="Test Category")

    def test_string_representation(self):
        test_product = Product.objects.get(name="Test Product")
        self.assertEqual(str(test_product), "Test Product")

    def test_is_featured(self):
        test_product = Product.objects.get(name="Test Product")
        self.assertFalse(test_product.is_featured)

    def test_is_available(self):
        test_product = Product.objects.get(name="Test Product")
        self.assertTrue(test_product.is_available)

    def test_product_with_too_long_name(self):
        import random, string
        from django.db.utils import DataError

        long_name = "".join(random.choice(string.ascii_lowercase) for n in range(151))

        with self.assertRaises(DataError):
            Product.objects.create(name=long_name, slug="long-name")

    def test_product_with_too_long_slug(self):
        import random, string
        from django.db.utils import DataError

        long_slug = "".join(random.choice(string.ascii_lowercase) for n in range(201))

        with self.assertRaises(DataError):
            Product.objects.create(name="Long slug", slug=long_slug)


class ProductsAPISerializersTest(TestCase):
    pass


class ProductAPIViewsTest(TestCase):
    pass
