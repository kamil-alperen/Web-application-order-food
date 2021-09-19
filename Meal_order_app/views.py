from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.http import HttpResponse,Http404
from django.shortcuts import render,redirect
from django.views import View
from .forms import QuantityForm
from .models import Market
import json

BASE_URL = None

look_up_prices = {
    'id' : 0,
    'simit' : 2,
    'kete' : 4,
    'açma' : 3,
    'poğaça' : 3,
    'kaşarlı_börek' : 12,
    'kıymalı_börek' : 14,
    'su_böreği' : 8,
    'midye_baklava' : 20,
    'soğuk_baklava' : 24,
    'havuç_baklava' : 28,
    'mini_ekler' : 32,
    'şöbiyet' : 16,
    'trileçe' : 12,
    'sütlaç' : 14,
    'limonlu_pasta' : 70,
    'frambuazlı_pasta' : 80,
    'çikolatalı_meyveli_pasta' : 90,
    'çikolatalı_fıstıklı_pasta' : 80,
    'cappy' : 4,
    'cocacola' : 6,
    'fanta' : 5,
    'fusetea' : 4,
    'sprite' : 5,
    'su' : 2
}

def home(request):
    request.session['update'] = False
    global BASE_URL
    BASE_URL = request.build_absolute_uri()
    QuantityInfos.BASE_URL = BASE_URL
    context = {
        'BASE_URL' : BASE_URL
    }
    return render(request, 'home.html', context)

def home_update(request):
    global BASE_URL
    context = {
        'BASE_URL' : BASE_URL
    }
    return render(request, 'home.html', context)

def orders(request):
    return render(request, 'orders.html', {})

class QuantityInfos(View):
    BASE_URL = None
    FORM = None
    def get(self, request):
        if request.session['update']:
            form = QuantityInfos.FORM
            request.session['update'] = False
            return HttpResponse(json.dumps(form.cleaned_data))
        else: 
            return HttpResponse(json.dumps(''))

    def post(self, request):
        new_form = QuantityForm(request.POST)
        if new_form.is_valid():
            QuantityInfos.FORM = new_form
            context = {
                'form' : QuantityInfos.FORM
            }
            return render(request, 'basket.html', context)
        else:
            raise Http404

    def put(self, request):
        request.session['update'] = True
        url = str(QuantityInfos.BASE_URL) + 'update'
        return HttpResponse(json.dumps(url))


class MarketProducts(View):
    def get(self, request, page):
        start = (page-1)*5
        end = start + 5
        products = list(Market.objects.order_by('id').all().values())[::-1][start:end]
        simplifiedProducts = []
        for record in products:
            simplifiedRecord = {}
            for entity in record:
                if(record[entity] != None):
                    simplifiedRecord[entity] = record[entity]
            simplifiedProducts.append(simplifiedRecord)
        prices = []
        for record in simplifiedProducts:
            total_price = 0
            for name in record:
                total_price += look_up_prices[name] * record[name]
            prices.append(total_price)
        send_data = {
            'products' : simplifiedProducts,
            'prices' : prices,
            'totalRecords' : len(Market.objects.all())
        }
        return HttpResponse(json.dumps(send_data))

    def post(self, request, **kwargs):
        form = QuantityInfos.FORM
        form.save(commit=True)
        return redirect('orders_page')

    def delete(self, request, *args, **kwargs):
        id_ = request.body.decode('UTF-8')
        Market.objects.filter(id = id_).delete()
        return HttpResponse('')
