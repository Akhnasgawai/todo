from . import views
from django.urls import path

urlpatterns = [
    path("todo/", views.read_todo),
    path("addTodo/", views.write_todo),
    path("addTodo/<int:pk>/", views.write_todo),
    path("toggle/<int:pk>/", views.toggle_todo),
    path("delete/", views.delete_todo),
    path("delete/<int:pk>/", views.delete_todo),
    path("count/", views.get_count),
]
