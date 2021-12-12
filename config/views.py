from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from config.models import Setting

# Create your views here.
def index(request):
    return redirect('/accounts/login')

# def about(request):
#     template_name = "index/about.html"
#
#     context = {}
#
#     return render(request, template_name, context)

# @csrf_exempt
# def contact(request):
#     template_name = "index/contact.html"
#     context = {}
#     if request.method=="POST":
#         post = request.POST
#         # print(post)
#         # name, email, phone, message = post.values()
#         name, email, phone, message = post.get("name"), post.get("email"), post.get("phone"), post.get("message")
#         print(name, email, phone, message)
#         send_mail(
#             f"{name.title()}",
#             f"{email}<br>{phone}<br>{message}",
#             'no-reply@0.0.0.0:8000',
#             [Setting.objects.get(id=1).email],
#             fail_silently=True,
#         )
#         context['sent'] = True
#
#
#     return render(request, template_name, context)
