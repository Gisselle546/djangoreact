import random
import string

def random_string_generator(size=8, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size)).upper()

def unique_reference_generator(instance, size=8):
    reference = random_string_generator(size)
    Klass = instance.__class__
    qs_exists = Klass.objects.filter(reference=reference).exists()
    if qs_exists:
        return unique_reference_generator(instance, size=size)
    return reference
