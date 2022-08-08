from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

import json
import stripe

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
            return HttpResponse(
                json.dumps({"message": "Your transaction has been successful."})
            )
        else:
            raise stripe.error.CardError

    except stripe.error.CardError as e:
        # Since it's a decline, stripe.error.CardError will be caught
        body = e.json_body
        err = body.get("error", {})
        print("Status is: %s" % e.http_status)
        print("Type is: %s" % err.get("type"))
        print("Code is: %s" % err.get("code"))
        print("Message is %s" % err.get("message"))
        return HttpResponse(
            json.dumps({"message": err.get("message")}), status=e.http_status
        )

    except stripe.error.RateLimitError as e:
        # Too many requests made to the API too quickly
        return HttpResponse(json.dumps({"message": "Too many requests to the API."}))

    except stripe.error.InvalidRequestError as e:
        # invalid parameters were supplied to Stripe"s API
        return HttpResponse(json.dumps({"message": "Invalid parameters."}))

    except stripe.error.AuthenticationError as e:
        # Authentication with Stripe"s API failed
        # (maybe you changed API keys recently)
        return HttpResponse(json.dumps({"message": "Authentication failed."}))

    except stripe.error.APIConnectionError as e:
        # Network communication with Stripe failed
        return HttpResponse(
            json.dumps({"message": "Network communication failed, try again."})
        )

    except stripe.error.StripeError as e:
        # Display a very generic error to the user, and maybe
        # send yourself an email
        return HttpResponse(json.dumps({"message": "Provider error!"}))

    # Something else happened, completely unrelated to Stripe
    except Exception as e:
        return HttpResponse(
            json.dumps({"message": "Unable to process payment, try again."})
        )
