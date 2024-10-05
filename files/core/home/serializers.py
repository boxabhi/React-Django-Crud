from rest_framework import serializers
from .models import Receipe, Ingredients
from django.template.defaultfilters import slugify
import uuid


class IngredientsSerialier(serializers.ModelSerializer):
    class Meta:
        model = Ingredients
        fields = '__all__'


class RecepieSeriliazer(serializers.ModelSerializer):
    class Meta:
        model = Receipe
        fields = '__all__'

    def to_representation(self, instance):
        data =  super().to_representation(instance)
        data['ingredients'] = IngredientsSerialier(
            instance.receipe_ingredents.all(), many=True).data
        return data



class CreateRecepieSerializer(serializers.ModelSerializer):
    receipe_slug = serializers.CharField(allow_null=True , required =False)
    receipe_ingredents = serializers.ListField(
        child = serializers.CharField()
    )
    class Meta:
        model = Receipe
        fields = '__all__'
        #exclude = ['receipe_image']

    def create(self, validated_data):
        print(validated_data)
        receipe_slug  = slugify(validated_data['receipe_name'])
        if Receipe.objects.filter(receipe_slug = receipe_slug).exists():
            receipe_slug = f"{receipe_slug}_{str(uuid.uuid4()).split('-')[0]}" 

        receipe = Receipe.objects.create(
            receipe_name = validated_data['receipe_name'],
            receipe_description = validated_data['receipe_description'],
            receipe_image = validated_data['receipe_image'],
            receipe_slug = receipe_slug,
            receipe_type = validated_data['receipe_type']
        )
        for ri in validated_data.get('receipe_ingredents'):
            Ingredients.objects.create(
                receipe = receipe,
                ingredient_name = ri
            )

        return receipe