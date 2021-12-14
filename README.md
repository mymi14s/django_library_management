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
[https://djangolibrarym.herokuapp.com](https://djangolibrarym.herokuapp.com)

-Username/Email: admin@admin.com
-Password: admin


## Screenshot
## Dashboard
![Dashboard](https://raw.githubusercontent.com/mymi14s/django_library_management/master/screenshots/dashboard.png)

## Book List
![Books](https://raw.githubusercontent.com/mymi14s/django_library_management/master/screenshots/books.png)

## Book Info
![Book](https://raw.githubusercontent.com/mymi14s/django_library_management/master/screenshots/book.png)

## Issue Book
![Issue](https://raw.githubusercontent.com/mymi14s/django_library_management/master/screenshots/issuebook.png)

## Books issued to a member
![Issues](https://raw.githubusercontent.com/mymi14s/django_library_management/master/screenshots/memberissues.png)

## Reports Table
![Table](https://raw.githubusercontent.com/mymi14s/django_library_management/master/screenshots/reporttable.png)

## Reports Chart
![Chart](https://raw.githubusercontent.com/mymi14s/django_library_management/master/screenshots/reportcharts.png)

## Import Books
![Import](https://raw.githubusercontent.com/mymi14s/django_library_management/master/screenshots/import.png)

## Members
![Members](https://raw.githubusercontent.com/mymi14s/django_library_management/master/screenshots/members.png)
