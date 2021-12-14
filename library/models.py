from uuid import uuid4
from django.utils import timezone
from django import forms
from django.core.exceptions import ValidationError
from django.db.models.signals import (
    post_save, m2m_changed,
)
from django.dispatch import receiver
from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
# resuable choices
TYPE = (
    ('Issued', 'Issued',),
    ('Return', 'Return',),
    ('Entry', 'Entry'),
)
STATUS = (
    ('Issued', 'Issued',),
    ('Available', 'Available'),
    ('Out of Stock', 'Out of Stock')
)

DOCSTATUS = (
    ('Draft', 'Draft',),
    ('Submitted', 'Submitted'),
    ('Cancelled', 'Cancelled')
)


class Book(models.Model):
    book_no = models.CharField(max_length=10, unique=True, blank=True, null=True,)
    title = models.CharField(max_length=255)
    authors = models.TextField()
    isbn = models.CharField(max_length=25, unique=True)
    publisher = models.CharField(max_length=100)
    page = models.PositiveIntegerField()
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=12, default="Available", choices=STATUS)
    rental_fee = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(blank=True, null=True, upload_to='books')
    qty = models.PositiveIntegerField(default=1)
    balance = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)


    def __str__(self):
        return str(self.title)

    def save(self, *args, **kwargs):
        if not self.book_no:
            while True:
                no = f"{int(str(int(uuid4()))[:9].zfill(9))}"
                try:
                    Book.objects.get(book_no=no)
                except Exception as e:
                    self.book_no = no
                    break
        self.updated_at = timezone.now()
        return super().save(*args, **kwargs)

# # BOOK POST SAVE
# @receiver(post_save, sender=Book)
# def book_add(sender, instance, **kwargs):
#     created = kwargs.pop('created', None)
#     # print('POST ADDED', created, kwargs)
#     book = Book.objects.get(book_no=instance.book_no)
#
#     # else:
#     #     if(instance.balance<1):
#     #         book.status="Issued"
#     #         book.save(update_fields=['status'])

class BookStockLedger(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    book_no = models.CharField(max_length=10, blank=True, null=True,)
    title = models.CharField(max_length=255, blank=True, null=True,)
    type = models.CharField(max_length=12, choices=TYPE)
    qty = models.IntegerField()
    balance = models.PositiveIntegerField(default=0, blank=True, null=True)
    posting_date = models.DateField(default=timezone.now)
    transaction = models.ForeignKey('BookTransaction',
        on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.book_no)

    def save(self, *args, **kwargs):
        if not self.book_no or self.title:
            self.book_no = self.book.book_no
            self.title = self.book.title
        self.updated_at = timezone.now()
        return super().save(*args, **kwargs)

# SIGNAL POST SAVE
@receiver(post_save, sender=BookStockLedger)
def book_ledger_add(sender, instance, **kwargs):
    created = kwargs.pop('created', None)
    if(created):
        balance = instance.book.balance - instance.qty
        if(instance.book.balance<1):status='Issued'
        else:status="Available"
        update_book = Book.objects.filter(pk=instance.book.pk).update(
            balance=balance,
            status=status
        )
        # update ledger balance
        ledger = BookStockLedger.objects.get(id=instance.id)
        ledger.balance = balance
        ledger.save(update_fields=['balance'])
        # update member
        member = Member.objects.get(id=instance.transaction.member.id)
        member.account_balance += instance.transaction.rental_fee
        member.save()


class BookTransaction(models.Model):
    member = models.ForeignKey('Member', on_delete=models.CASCADE, blank=True, null=True,)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    book_no = models.CharField(max_length=10, blank=True, null=True,)
    title = models.CharField(max_length=255, blank=True, null=True,)
    qty = models.IntegerField()
    posting_date = models.DateField(default=timezone.now)
    type = models.CharField(max_length=12, choices=TYPE)
    rental_fee = models.DecimalField(max_digits=10, decimal_places=2,
        blank=True, null=True)
    type = models.CharField(max_length=12, choices=TYPE, blank=True, null=True)
    paid = models.BooleanField(default=False)
    docstatus = models.CharField(max_length=12, default="Draft", choices=DOCSTATUS)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)


    def __str__(self):
        return str(self.book_no)

    def save(self, *args, **kwargs):
        if not self.book_no or self.title:
            self.book_no = self.book.book_no
            self.title = self.book.title
        if(self.member):
            self.rental_fee=self.book.rental_fee*self.qty
        self.updated_at = timezone.now()

        # clean
        if(self.member):
            pass
            # member = Member.objects.get(id=self.member.id)
            # if(member.account_balance>=500):
            #     raise ValidationError('You owe more than RS.500, please pay up..')
        return super().save(*args, **kwargs)

# SIGNAL POST SAVE
@receiver(post_save, sender=BookTransaction)
def book_transaction_add(sender, instance, **kwargs):
    # create history
    history = BookTransactionHistory.objects.filter(transaction=instance, type=instance.type)
    if ((not history) and (instance.docstatus=='Submitted')):
        print('FAILED,\n')
        BookTransactionHistory.objects.create(
            transaction=instance
        )

class BookTransactionHistory(models.Model):
    transaction = models.ForeignKey('BookTransaction', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, blank=True, null=True)
    qty = models.IntegerField(blank=True, null=True)
    posting_date = models.DateField(default=timezone.now, blank=True, null=True)
    type = models.CharField(max_length=12, choices=TYPE, blank=True, null=True)
    rental_fee = models.DecimalField(max_digits=10, decimal_places=2,
        blank=True, null=True)
    paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)


    def __str__(self):
        return str(self.book)

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        self.member = self.transaction.member
        self.rental_fee = self.transaction.rental_fee
        self.paid = self.transaction.paid
        self.posting_date = self.transaction.posting_date
        self.book = self.transaction.book
        self.qty = self.transaction.qty
        self.type = self.transaction.type
        return super().save(*args, **kwargs)


@receiver(post_save, sender=BookTransactionHistory)
def book_transactionhistory_add(sender, instance, **kwargs):
    created = kwargs.pop('created', None)


class Member(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE,
        blank=True, null=True)
    name = models.CharField(max_length=50, blank=True)
    account_balance = models.DecimalField(max_digits=10,decimal_places=2,
        default=0, blank=True, null=True)
    image = models.ImageField(upload_to='member', blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.name and self.user:
            self.name = self.user.get_full_name()
        # if(not self.account_balance)
        self.updated_at = timezone.now()
        return super().save(*args, **kwargs)
