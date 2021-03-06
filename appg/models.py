"""
models.py

App Engine datastore models

"""


from google.appengine.ext import ndb, endpoints
from endpoints_proto_datastore.ndb.model import (EndpointsModel,
                                                 EndpointsAliasProperty)


class ExampleModel(EndpointsModel):
    """Example Model"""
    example_name = ndb.StringProperty(required=True)
    example_description = ndb.TextProperty(required=True)
    added_by = ndb.UserProperty()
    timestamp = ndb.DateTimeProperty(auto_now_add=True)
