import time, json, requests
from django.db import connection
from django.core.paginator import (
    Paginator, PageNotAnInteger, EmptyPage
)
from django.shortcuts import render, get_object_or_404, redirect, reverse
from django.http import Http404
from django.core.mail import send_mail
from django.db.models import Q
from django.http import JsonResponse, HttpResponse
from django.views.generic import View
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

def qset_item(qset):
    try:
        exploded = json.loads(serialize("json", [qset]))[0]
        result=exploded.get('fields')
        result['id']=exploded.get('pk')
        for k, v in result.items():
            if(v==True):result[k]=1
            if(v==False):result[k]=0
        # result = json.loads(serialize("json", [qset]))[0].get('fields')
    except Exception as e:
        result = {}

    return result


def qset_list(qset):
    try:
        result = [qset_item(i) for i in qset]
    except Exception as e:
        result = []

    return result

def get_countries():
    return dict(countries)

def convert_datestr(d):
    return datetime.strptime(d.split('T')[0], '%Y-%m-%d')

def querydb(query):
    with connection.cursor() as cursor:
        cursor.execute(query)
        columns = [col[0] for col in cursor.description]
        return [
            dict(zip(columns, row))
            for row in cursor.fetchall()
        ]

def fetch_frappebooks(query, page):
    try:
        res = requests.get(
            f'https://frappe.io/api/method/frappe-library?page={page}{query}',
            verify=False, timeout=10
        )
        if(res.status_code==200):
            return res.json().get('message')
        return []
    except Exception as e:
        return []



def result_paginator(request, results):
    page = request.GET.get('page', 1) # get page number
    paginator = Paginator(results, 12) # return 12 results per page

    try:
        res = paginator.page(page)
    except PageNotAnInteger:
        res = paginator.page(1)
    except EmptyPage:
        res = paginator.page(paginator.num_pages)

    return res
