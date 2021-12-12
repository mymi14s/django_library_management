import json
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model


# Create your views here.
def current_user():
    if (request.user.account_id != username):
        return redirect('user:home')

    return redirect('/hh')


@login_required
def home(request):
    template_name = "user/home.html"
    try:
        context = {

        }
    except Exception as e:
        account = None
        context = {
        }

    return render(request, template_name, context)


@login_required
def profile(request, username):

    if (request.user.account_id != username):
        return redirect('user:home')

    template_name = "user/profile.html"
    context = {}

    return render(request, template_name, context)

@login_required
@csrf_exempt
def get_user(request):
    if request.method=="GET":
        userprofile = get_user_model().objects.get(
            account_id=request.user.account_id)
        user = json.loads(serialize("json", [userprofile]))[0].get('fields')
        del user['password']
        user['fullname'] = userprofile.get_full_name()

        accounts = [json.loads(serialize("json", [i]))[0].get('fields') for i in Account.objects.filter(owner=request.user)]
        context = {
            'user':user,
            'accounts':accounts
        }
        return JsonResponse(context, safe=False)

    return JsonResponse({}, safe=False)
