from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RecepieSeriliazer, CreateRecepieSerializer
from .models import Receipe , Ingredients


class ReceipeAPI(APIView):

    def get(self , request):
        queryset = Receipe.objects.all()
        serializer = RecepieSeriliazer(queryset, many =True)
        return Response({
            "status" : True,
            "message" : "data fetched",
            "data" : serializer.data
        })
    

    def delete(self , request):
        data = request.data
        receipe = Receipe.objects.filter(id = data.get('id'))
        if receipe.exists():
            receipe.delete()
            return Response({
                "status" : True,
                "message" : "data deleted",
                "data" : {}
            })

        return Response({
                "status" : False,
                "message" : "data not found",
                "data" : {}
            })

    
    def post(self , request):
        data = request.data
        serializer = CreateRecepieSerializer(data= data)
        if not serializer.is_valid():
            return Response({
                "status" : False,
                "message" : "data not created",
                "data" : serializer.errors
            })
        serializer.save()
        return Response({
            "status" : True,
            "message" : "data created",
            "data" : {}
        })
    