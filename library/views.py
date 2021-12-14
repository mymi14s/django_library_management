from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.contrib.auth import get_user_model
from library_management.utils import (
    qset_list, qset_item, querydb, fetch_frappebooks,
    result_paginator,
)
from .models import (
    Book, BookStockLedger, BookTransaction, BookTransactionHistory,
    Member,
)
from .forms import (
    UpdateBookForm, MemberForm,  BookTransactionForm,
)
# Create your views here.


@login_required
def home(request):
    template_name = 'library/home.html'
    context = {}

    return render(request, template_name, context)

@login_required
def book_list(request):
    template_name = 'library/book/list.html'
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

@login_required
def book_detail(request, book_no):
    template_name = 'library/book/book_detail.html'
    context = {

    }
    try:
        book = Book.objects.get(book_no=book_no)
        context['book'] = book
    except Exception as e:
        print(e)
        context['book'] = None
    # check for POST request
    if(request.method=='POST'):
        if(request.POST):
            print('POST',request.POST, request.FILES)
            # update book
            form = UpdateBookForm(request.POST, request.FILES, instance=context['book'])
            if form.is_valid():
                print('VALID')
                post = form.save(commit=False)
                id = context['book'].id
                post.save()
                context['book'] = post
                print(post)
            else:
                print(form.errors)
        book = qset_item(context['book'])
        return JsonResponse(book, safe=False)
    context['form'] =  UpdateBookForm(instance=context['book'])
    return render(request, template_name, context)

@login_required
def add_book(request):
    template_name = 'library/book/add.html'
    context = {}
    if(request.method=='POST'):
        form = UpdateBookForm(request.POST, request.FILES)
        print(request.POST)
        if(form.is_valid()):
            form.save()
            book = qset_item(Book.objects.get(id=form.instance.pk))
        else:
            book = {}
        return JsonResponse({'book':book}, safe=False)

    return render(request, template_name, context)

@login_required
def issue_book(request):
    template_name = 'library/book/issue_book.html'
    if(request.method=='POST'):
        print(request.POST)
        post = BookTransactionForm(request.POST)
        if(post.is_valid()):
            post.save(commit=False)
            post.instance.qty=1
            post.instance.type='Issued'
            post.instance.docstatus='Draft'
            post.save()
            return JsonResponse(
                {
                    'status':200,
                    'link': f'/library/books/issue/{post.instance.id}/'
                }, safe=False
            )
    context = {
        # 'title': 'Add Member',
        'members': qset_list(Member.objects.all()),
        'books': qset_list(Book.objects.all()),
        'form': BookTransactionForm()
    }

    return render(request, template_name, context)

@login_required
def issue_detail(request, id):
    template_name = 'library/book/issue_detail.html'
    issue = BookTransaction.objects.get(id=id)
    if(request.method=='POST'):
        action = request.POST.get('action')
        if(action=='submit'):
            issue.docstatus = 'Submitted'
            try:
                ledger = BookStockLedger.objects.create(
                    book=issue.book,
                    qty=issue.qty,
                    posting_date=issue.posting_date,
                    type=issue.type,
                    transaction=issue
                )
            except Exception as e:
                pass

        elif(action=='return'):
            issue.type = 'Return'
            try:
                book = Book.objects.get(id=issue.book.id)
                book.balance += 1
                book.save()
            except Exception as e:
                pass

        elif(action=='pay'):
            issue.paid = True
            try:
                member = Member.objects.get(id=issue.member.id)
                member.account_balance -= issue.rental_fee
                member.save()
            except Exception as e:
                pass

        elif(action=='delete'):
            issue.docstatus = 'Submitted'
            issue.delete()
            return JsonResponse({'status':301, 'type':'delete', 'link':'/library/books/list/'})
        else:
            return JsonResponse({'status': 500,})
        issue.save()
        issue = BookTransaction.objects.get(id=id)
        return JsonResponse({
            'status':200, 'type':'refresh',
            'book': qset_item(issue.book),
            'member':qset_item(issue.member),
            'issue': qset_item(issue)
        })

    context = {
        'book': qset_item(issue.book),
        'member':qset_item(issue.member),
        'issue': qset_item(issue)
    }
    return render(request, template_name, context)

# MEMBERS

@login_required
def members_list(request):
    template_name = 'library/members/list.html'
    context = {}
    if request.method == 'GET':
        query = request.GET.get('q', '')
        results = Member.objects.filter(
            name__icontains=query
        ).order_by('name')
        print(results)
        members = result_paginator(request, results)
        context = {

            'members': members,
            'q': query,
        }
    return render(request, template_name, context)


@login_required
def add_member(request):
    template_name = 'library/members/edit.html'
    if(request.method=='POST'):
        post = MemberForm(request.POST, request.FILES)
        if(post.is_valid()):
            post.save()
            return redirect(f'/library/members/{post.instance.id}/')
    context = {
        'title': 'Add Member',
        'form': MemberForm()
    }

    return render(request, template_name, context)

@login_required
def edit_member(request, id):
    template_name = 'library/members/edit.html'
    member = Member.objects.get(id=id)
    if(request.method=='POST'):
        post = MemberForm(request.POST, request.FILES, instance=member)
        if(post.is_valid()):
            post.save()
            member = post.instance

    context = {
        'title': 'Edit Member',
        'member':member,
        'form': MemberForm(instance=member),
        'transactions': BookTransaction.objects.filter(member=member.id).order_by('-id')
    }
    return render(request, template_name, context)

@login_required
def import_books(request):
    template_name = 'library/import/import.html'
    context = {}

    return render(request, template_name, context)


@login_required
def top_report(request):
    template_name = 'library/reports/top_report.html'
    context = {}
    if(request.method=='POST'):
        # TOP CUSTOMERS
        popular_books_query = querydb(
            """
                SELECT b.id, t.title, b.balance, b.qty as total,
                sum(t.qty) as qty, b.book_no
                FROM library_book b
                JOIN library_booktransaction t ON t.book_id=b.id
                WHERE t.docstatus='Submitted'
                GROUP BY t.title, b.id ORDER BY qty DESC
                LIMIT 10
            ;"""
        )
        highest_paying_query = querydb(
            """
                SELECT m.id, m.name, sum(t.rental_fee) as rfee FROM
                library_booktransaction t
                JOIN library_member m ON t.member_id=m.id
                WHERE t.docstatus='Submitted' AND paid=true
                GROUP BY m.id, m.name ORDER BY rfee DESC
                LIMIT 10
            ;"""
        )
        return JsonResponse({
            'popular_books':popular_books_query,
            'highest_paying':highest_paying_query
        }, safe=False)

    return render(request, template_name, context)
