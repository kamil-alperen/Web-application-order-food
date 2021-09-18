from django.db import models

class Market(models.Model):
    simit = models.PositiveBigIntegerField(blank=True, null=True)
    kete = models.PositiveBigIntegerField(blank=True, null=True)
    açma = models.PositiveBigIntegerField(blank=True, null=True)
    poğaça = models.PositiveBigIntegerField(blank=True, null=True)
    kaşarlı_börek = models.PositiveBigIntegerField(blank=True, null=True)
    kıymalı_börek = models.PositiveBigIntegerField(blank=True, null=True)
    su_böreği = models.PositiveBigIntegerField(blank=True, null=True)
    midye_baklava = models.PositiveBigIntegerField(blank=True, null=True)
    soğuk_baklava = models.PositiveBigIntegerField(blank=True, null=True)
    havuç_baklava = models.PositiveBigIntegerField(blank=True, null=True)
    mini_ekler = models.PositiveBigIntegerField(blank=True, null=True)
    şöbiyet = models.PositiveBigIntegerField(blank=True, null=True)
    trileçe = models.PositiveBigIntegerField(blank=True, null=True)
    sütlaç = models.PositiveBigIntegerField(blank=True, null=True)
    limonlu_pasta = models.PositiveBigIntegerField(blank=True, null=True)
    frambuazlı_pasta = models.PositiveBigIntegerField(blank=True, null=True)
    çikolatalı_meyveli_pasta = models.PositiveBigIntegerField(blank=True, null=True)
    çikolatalı_fıstıklı_pasta = models.PositiveBigIntegerField(blank=True, null=True)
    cappy = models.PositiveBigIntegerField(blank=True, null=True)
    cocacola = models.PositiveBigIntegerField(blank=True, null=True)
    fanta = models.PositiveBigIntegerField(blank=True, null=True)
    fusetea = models.PositiveBigIntegerField(blank=True, null=True)
    sprite = models.PositiveBigIntegerField(blank=True, null=True)
    su = models.PositiveBigIntegerField(blank=True, null=True)

    

