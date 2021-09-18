from django import forms
from django.forms import fields, widgets
from .models import Market

class QuantityForm(forms.ModelForm):
    class Meta:
        model = Market
        fields = '__all__'