# Generated by Django 5.0.2 on 2024-10-03 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_remove_receipe_receipe_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='receipe',
            name='receipe_image',
            field=models.ImageField(default=1, upload_to=''),
            preserve_default=False,
        ),
    ]
