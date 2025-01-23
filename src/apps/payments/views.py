import stripe
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

stripe.api_key = settings.STRIPE_SECRET_KEY


@require_http_methods(["POST"])
@csrf_exempt
def charge_view(request):
    try:
        charge = stripe.Charge.create(
            amount=request.POST.get("amount", ""),
            currency=request.POST.get("currency", ""),
            source=request.POST.get("source", ""),
        )
        if charge["status"] == "succeeded":
            return JsonResponse({"message": "Your transaction has been successful."})
        raise stripe.error.CardError

    except stripe.error.CardError as error:
        # Since it's a decline, stripe.error.CardError will be caught
        error_message = error.json_body.get("error", {}).get("message")
        return JsonResponse({"message": error_message}, status=error.http_status)

    except stripe.error.RateLimitError:
        # Too many requests made to the API too quickly
        return JsonResponse({"message": "Too many requests to the API."})

    except stripe.error.InvalidRequestError:
        # invalid parameters were supplied to Stripe's API
        return JsonResponse({"message": "Invalid parameters."})

    except stripe.error.AuthenticationError:
        # Authentication with Stripe's API failed
        # (maybe you changed API keys recently)
        return JsonResponse({"message": "Authentication failed."})

    except stripe.error.APIConnectionError:
        # Network communication with Stripe failed
        return JsonResponse({"message": "Network communication failed, try again."})

    except stripe.error.StripeError:
        # Display a very generic error to the user, and maybe
        # send yourself an email
        return JsonResponse({"message": "Provider error!"})

    # Something else happened, completely unrelated to Stripe
    except Exception:
        return JsonResponse({"message": "Unable to process payment, try again."})
