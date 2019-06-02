from django.test import TestCase
from products.models import Category, Product
from products.api.serializers import CategorySerializer, ProductSerializer


class ProductsModelTest(TestCase):
    def setUp(self):
        self.test_product = Product.objects.create(
            name="Test Product", slug="test-product", price="9.99"
        )
        self.test_product.save()
        self.test_product.category.create(name="Test Category")

    def test_category_string_representation(self):
        test_category = Category.objects.get(name="Test Category")
        self.assertEqual(str(test_category), "Test Category")

    # UNCOMMENT ONCE get_absolute_url IS UNCOMMENTED IN Category MODEL
    # def test_get_absolute_url(self):
    #     from django.urls import reverse

    #     test_category = Category.objects.get(name="Test Category")
    #     response = self.client.post(reverse("products:category", kwargs={"name": test_category.name}))
    #     self.assertEqual(response.status_code, 200)

    def test_product_string_representation(self):
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
    def test_product_category_valid(self):
        """Test if serializer works as expected"""
        serializer = CategorySerializer(data={"id": 1, "name": "Test Category"})
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data, {"id": 1, "name": "Test Category"})
        self.assertEqual(serializer.errors, {})

    def test_product_category_invalid(self):
        """Test if serializer 'breaks' with incomplete data"""
        serializer = CategorySerializer(data={"name": "Test Category Incomplete"})
        self.assertFalse(serializer.is_valid())
        self.assertNotEqual(serializer.errors, {})


class ProductAPIViewsTest(TestCase):
    pass
