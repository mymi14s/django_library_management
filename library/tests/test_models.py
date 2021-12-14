from django.test import TestCase
from django.utils import timezone
from django.urls import reverse
from model_bakery import baker
from pprint import pprint
from library.models import Member, Book, BookTransaction

# Create your tests here.
class CrudTest(TestCase):
    book = baker.make(Book)
    book.rental_fee = 50
    member = baker.make(Member)
    member.name = 'Jogn Doe'
    booktransaction = baker.make(BookTransaction)
    booktransaction.member = member
    booktransaction.book = book
    booktransaction.qty=2
    booktransaction.rental_fee=book.rental_fee*booktransaction.qty


    def test_create_member(self):
        w = self.member
        pprint(w.__dict__)
        self.assertTrue(isinstance(w, Member))
        self.assertEqual(w.__str__(), w.name)
        self.assertEqual(w.account_balance, 0)

    def test_create_book(self):
        w = self.book
        pprint(w.__dict__)
        self.assertTrue(isinstance(w, Book))
        self.assertEqual(w.__str__(), w.title)
        self.assertEqual(w.status, 'Available')
        self.assertEqual(w.rental_fee>0, True)

    def test_create_booktransaction(self):
        w = self.booktransaction
        pprint(w.__dict__)
        self.assertTrue(isinstance(w, BookTransaction))
        self.assertEqual(w.rental_fee, w.qty*w.book.rental_fee)
