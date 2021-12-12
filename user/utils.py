# from slugify import slugify
from django.utils.text import slugify


# MODEL FUNCTIONS
def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return str(obj) #.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

def photo_url_filter(obj):
    """Filter photo url."""
    try:
        obj.url
        return obj.url
    except Exception as e:
        print('except')
        return ""

def middle_name_filter(obj):
    """Filter out null."""
    if obj is None:
        return ""
    return obj

def upload_status_image(instance, filename):
    return f"photo/{slugify(instance.get_full_name())}-{instance.pk}.{filename.split('.')[-1]}" #.format(user=instance.user, filename=filename)
