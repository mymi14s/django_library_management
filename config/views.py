from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from library_management.utils import (
    qset_list, qset_item, querydb, fetch_frappebooks,
    result_paginator,
)
from config.models import Setting
from library.models import Book

# Create your views here.

def guestview(request):
    template_name = 'config/guestview.html'
    context = {}
    if request.method == 'GET':
        query = request.GET.get('q', '')
        results = Book.objects.filter(
            Q(title__icontains=query)|Q(authors__icontains=query)
        ).order_by('title')
        books = result_paginator(request, results)

        context = {
            'books': books,
            'q': query,
        }
    return render(request, template_name, context)

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
