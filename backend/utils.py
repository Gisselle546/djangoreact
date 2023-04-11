import random
import string

def random_string_generator(size=8, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size)).upper()

def unique_reference_generator(instance, size=8):
    product_id = random_string_generator(size)
    Klass = instance.__class__
    qs_exists = Klass.objects.filter(product_id=product_id).exists()
    if qs_exists:
        return unique_reference_generator(instance, size=size)
    return product_id

def unique_order_generator(instance, size=8):
    order_id = random_string_generator(size)
    Klass = instance.__class__
    qs_exists = Klass.objects.filter(order_id=order_id).exists()
    if qs_exists:
        return unique_order_generator(instance, size=size)
    return order_id