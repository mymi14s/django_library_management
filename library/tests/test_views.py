from model_bakery import baker
from pprint import pprint
from django.test import TestCase
from django.utils import timezone
from django.urls import reverse
from library.models import Member, Book, BookTransaction
from library.views import (
    home, book_list, book_detail, add_book,
    members_list, edit_member, add_member,
    issue_book, issue_detail, import_books,
    top_report,
)


class ViewTest(TestCase):
    book = baker.make(Book)
    book.rental_fee = 50
    member = baker.make(Member)
    member.name = 'Jogn Doe'
    booktransaction = baker.make(BookTransaction)
    booktransaction.member = member
    booktransaction.book = book
    booktransaction.qty=2
    booktransaction.rental_fee=book.rental_fee*booktransaction.qty


    def test_book_list_view(self):
        w = self.book
        url = reverse('library:book_list')
        resp = self.client.get(url)
        pprint(resp.content)
        self.assertEqual(resp.status_code, 302)
        # self.assertIn(w.title, resp.content)
