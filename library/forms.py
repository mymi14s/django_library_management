from django.forms import ModelForm
from .models import (
    Book, Member, BookTransaction,
)

class UpdateBookForm(ModelForm):

    class Meta:
        model = Book
        exclude = ("created_at", "updated_at", "book_no")

class MemberForm(ModelForm):

    class Meta:
        model = Member
        exclude = ("created_at", "updated_at", 'user', 'account_balance')

class BookTransactionForm(ModelForm):

    class Meta:
        model = BookTransaction
        exclude = ("created_at", "updated_at", 'book_no', 'qty',
            'title', 'posting_date', 'docstatus', 'paid', 'type')
