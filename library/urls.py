from django.urls import path

from .views import (
    home, book_list, book_detail, add_book,
    members_list, edit_member, add_member,
    issue_book, issue_detail, import_books,
    top_report,

)

app_name = "library"

urlpatterns = [
    path('', home, name="home"),
    path('books/list/', book_list, name="book_list"),
    path('books/addbook/', add_book, name='add_book'),
    path('members/list/', members_list, name='members_list'),
    path('members/addmember/', add_member, name='add_member'),
    path('books/issue/', issue_book, name='issue_book'),
    path('books/import/', import_books, name='import_books'),
    path('reports/top-report/', top_report, name='top_report'),
    path('books/issue/<id>/', issue_detail, name="issue_detail"),
    path('books/<book_no>/', book_detail, name="book_detail"),
    path('members/<id>/', edit_member, name="edit_member"),
]

# import api patterns
from .api import api_patterns
urlpatterns+=api_patterns
