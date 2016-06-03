import datetime
import time


def to_dict( models, recursive=False ):

    TYPES = ('int', 'long', 'float', 'bool', 'dict', 'basestring', 'list', 'str',\
            'datetime', 'unicode', 'User' )
    output = []
    models_type = type(models).__name__

    # the elemenet should be a typelist or cash
    if models_type == 'list':
        print 'typo lista'

    else:
        print 'otro tipo'
        models = models.to_dict()

    # this iteration is for specific elements from ndbi query fetvh
    for model in models:

        model_id = model.key.id()
        model = model.to_dict()

        new_model = {}
        new_model['example_id'] = model_id

        for key in model:

            item_value = model[key]
            item_type_str = type(item_value).__name__

            # validate type of key
            if item_type_str in TYPES:

                # if type is not advance object like time or gpt
                if item_type_str == 'User':
                    new_model[key] = {}
                    new_model[key]['email'] = item_value.email()
                    new_model[key]['user_id'] = item_value.user_id()

                else:
                    new_model[key] = item_value

            else:
                new_model[key] = item_type_str

        output.append(new_model)

    return output