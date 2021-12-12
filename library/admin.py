from django.contrib import admin
from .models import (
    Book, BookStockLedger, BookTransaction, Member,
    BookTransactionHistory,
)

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
	list_display = ['book_no', 'title', 'page', 'status', 'balance', 'qty']
	search_fields = ['title', 'authors']

@admin.register(BookStockLedger)
class BookStockLedgerAdmin(admin.ModelAdmin):
	list_display = ['book', 'book_no', 'title', 'balance', 'qty']

@admin.register(BookTransaction)
class BookTransactionAdmin(admin.ModelAdmin):
	list_display = ['book', 'book_no', 'title', 'qty']

@admin.register(BookTransactionHistory)
class BookTransactionHistoryAdmin(admin.ModelAdmin):
	list_display = ['transaction', 'book', 'qty', 'posting_date', 'type', 'rental_fee']

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
	list_display = ['name', 'user', 'account_balance',]
