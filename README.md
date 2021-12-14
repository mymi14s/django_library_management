# Django Library Management

A libray management web app that can be used to manage books, members, transaction.

## Features
- Books:
    - Add
    - Edit
    - search
    - Issue (issue, return, payment)


- Members:
    - Add
    - Edit
    - Search

- API:
    - Import books from https://frappe.io/api/method/frappe-library?page=2&title=and

- Reports:
    - Most popular books
    - Highest paying customers
    - Charts (bar/pie)

#### REQUIREMENTS
- Python 3.8
- DJango 3

## Installation
- ```git clone https://github.com/mymi14s/django_library_management```
- ```cd django_library_management```
- ```pip install -r requirements```
- ```python manage.py migrate```
- ```python manage.py runserver```

## Demo
Currently hosted on pythonanywhere.com
[https://djangolibrarym.pythonanywhere.com](https://djangolibrarym.pythonanywhere.com)

-Username/Email: admin@admin.com
-Password: admin


## Screenshot
## Dashboard
![Login](https://github.com/mymi14s/django_library_management/tree/master/screenshots/dashboard.png?raw=true "Dashboard")

## Book List
![Books](https://github.com/mymi14s/django_library_management/tree/master/screenshots/books.png?raw=true "Books")

## Book Info
![Book](https://github.com/mymi14s/django_library_management/tree/master/screenshots/book.png?raw=true "Book")

## Issue Book
![Issue](https://github.com/mymi14s/django_library_management/tree/master/screenshots/issuebook.png?raw=true "Issue")

## Books issued to a member
![Issues](https://github.com/mymi14s/django_library_management/tree/master/screenshots/memberissues.png?raw=true "Issues")

## Reports Table
![Table](https://github.com/mymi14s/django_library_management/tree/master/screenshots/reporttable.png?raw=true "Table")

## Reports Chart
![Chart](https://github.com/mymi14s/django_library_management/tree/master/screenshots/reportchart.png?raw=true "Chart")

## Import Books
![Import](https://github.com/mymi14s/django_library_management/tree/master/screenshots/import.png?raw=true "Import")

## Members
![Members](https://github.com/mymi14s/django_library_management/tree/master/screenshots/members.png?raw=true "Members")
