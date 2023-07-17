from django.db import models


# Create your models here.
class Todo(models.Model):
    content = models.TextField(max_length=120)
    completed = models.BooleanField(default=False)
