"""
models.py

App Engine datastore models

"""
import endpoints
from models import ExampleModel
from protorpc import messages
from protorpc import remote

# [START messages]
class Greeting(messages.Message):
    """Greeting that stores a message."""
    message = messages.StringField(1)

# [END messages]

@endpoints.api(name='note', version='v1',
               title='note',
               description='Notas de backend')
class ExampleApi(remote.Service):
    @ExampleModel.method(path='example', http_method='GET', name='insertExample')
    def example_list(self, query):
        # current_user = endpoints.get_current_user()
        return  query
'''
class ExampleModel(ndb.Model):
    """Example Model"""
    example_name = ndb.StringProperty(required=True)
    example_description = ndb.TextProperty(required=True)
    added_by = ndb.UserProperty()
    timestamp = ndb.DateTimeProperty(auto_now_add=True)
'''