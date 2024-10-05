from django.db import models

# Create your models here.

class Receipe(models.Model):
    receipe_name = models.CharField(max_length=100, db_index=True)
    receipe_description = models.TextField()
    receipe_image = models.ImageField(upload_to="recepie/")
    receipe_slug = models.SlugField(unique=True)
    receipe_type = models.CharField(max_length=100,choices=(("Veg", "Veg"),("Non-Veg", "Non-Veg")))


class Ingredients(models.Model):
    receipe = models.ForeignKey(Receipe, on_delete=models.CASCADE, related_name="receipe_ingredents")
    ingredient_name = models.CharField(max_length=100)
