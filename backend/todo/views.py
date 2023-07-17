import json
from django.http import JsonResponse
from django.forms.models import model_to_dict
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import TodoSerializer
from .models import Todo


# Create your views here.
@api_view(["GET"])
def read_todo(request):
    """
    DRF API VIEW
    """
    requested_data = request.query_params.get("activeLink")
    instance = Todo.objects.all()
    count = Todo.objects.count()
    if requested_data == "pending":
        instance = instance.filter(completed=False)
    elif requested_data == "completed":
        instance = instance.filter(completed=True)
    print(len(instance))
    data = {"todos": list(instance.values())}
    # print(data)
    return Response({"data": data, "count": len(instance)})


@api_view(["POST"])
def write_todo(request):
    """
    DRF API View
    """
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        todo = Todo.objects.create(
            content=serializer.data["content"], completed=serializer.data["completed"]
        )
        todo.save()
        return Response({"message": "Todo added successfully"})


@api_view(["POST"])
def toggle_todo(request, pk):
    try:
        obj = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response({"error": "Object Not Found"}, status=404)
    obj.completed = not obj.completed
    obj.save()
    return Response({"message": "Field Toggle Successfully"}, status=200)


@api_view(["DELETE"])
def delete_todo(request):
    Todo.objects.all().delete()
    return Response({"message": "Deleted All the todos"}, status=200)


@api_view(["GET"])
def get_count(request):
    count = Todo.objects.count()
    return Response({"count": count})
