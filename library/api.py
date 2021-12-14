import requests, json
from django.http import JsonResponse
from django.urls import path
from library_management.utils import (
    qset_item, qset_list, querydb, fetch_frappebooks,
)
from .models import (
    Book,
)



def fetch_book_api(request):
    if(request.method=='POST'):
        # print(request.POST)
        if(request.POST.get('fetch')):
            nos, filters, fetch = request.POST.values()
            nos = int(nos)
            page, results = 1, []

            # processfilters
            query = f""
            if(filters):
                query+=f"&{filters}"

            # fetch results
            while True:
                res = fetch_frappebooks(query, page)
                results += res
                if(len(res)==0):
                    break
                elif(len(results)>nos):
                    break
                else:
                    page += 1


            results = results[:nos]

            # results = list(map(dict, set(tuple(sorted(sub.items())) for sub in results[:nos])))
            return JsonResponse({'type':'fetch','res':results}, safe=False)
        else:
            try:
                import_books = json.loads(
                    request.POST.get('import_books'))
                for i in import_books:
                    book = Book.objects.create(
                        title=i.get('title'), isbn=i.get('isbn'),
                        page=i.get('  num_pages'), authors=i.get('authors'),
                        publisher=i.get('publisher'), status='Available',
                        qty=10, balance=10, rental_fee=100
                    )
                status = 200
            except Exception as e:
                print(e)
                status = 500
            return JsonResponse({'type':'import', 'status':status}, safe=False)
    return JsonResponse({}, safe=False)


# PATHS
api_patterns = [
    path('api/fetchbooks/', fetch_book_api, name='fetch_book_api'),
]
