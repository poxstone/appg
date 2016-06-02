import endpoints
from protorpc import message_types
from protorpc import messages
from protorpc import remote

from api_messages import Greeting, GreetingCollection, STORED_GREETINGS
# [START greeting_api]
@endpoints.api(name='greeting', version='v1')
class GreetingApi(remote.Service):

    @endpoints.method(
        # This method does not take a request message.
        message_types.VoidMessage,
        # This method returns a GreetingCollection message.
        GreetingCollection,
        path='greetings',
        http_method='GET',
        name='greetings.list')
    def list_greetings(self, unused_request):
        return STORED_GREETINGS

    # ResourceContainers are used to encapsuate a request body and url
    # parameters. This one is used to represent the Greeting ID for the
    # greeting_get method.
    GET_RESOURCE = endpoints.ResourceContainer(
        # The request body should be empty.
        message_types.VoidMessage,
        # Accept one url parameter: and integer named 'id'
        id=messages.IntegerField(1, variant=messages.Variant.INT32))

    @endpoints.method(
        # Use the ResourceContainer defined above to accept an empty body
        # but an ID in the query string.
        GET_RESOURCE,
        # This method returns a Greeting message.
        Greeting,
        # The path defines the source of the URL parameter 'id'. If not
        # specified here, it would need to be in the query string.
        path='greetings/{id}',
        http_method='GET',
        name='greetings.get')
    def get_greeting(self, request):
        try:
            # request.id is used to access the URL parameter.
            return STORED_GREETINGS.items[request.id]
        except (IndexError, TypeError):
            raise endpoints.NotFoundException(
                'Greeting {} not found'.format(request.id))
    # [END greeting_api]

    # [START multiply]
    # This ResourceContainer is similar to the one used for get_greeting, but
    # this one also contains a request body in the form of a Greeting message.
    MULTIPLY_RESOURCE = endpoints.ResourceContainer(
        Greeting,
        times=messages.IntegerField(2, variant=messages.Variant.INT32,
                                    required=True))

    @endpoints.method(
        # This method accepts a request body containing a Greeting message
        # and a URL parameter specifying how many times to multiply the
        # message.
        MULTIPLY_RESOURCE,
        # This method returns a Greeting message.
        Greeting,
        path='greetings/multiply/{times}',
        http_method='POST',
        name='greetings.multiply')
    def multiply_greeting(self, request):
        return Greeting(message=request.message * request.times)
    # [END multiply]


# [START auth_config]
WEB_CLIENT_ID = 'replace this with your web client application ID'
ANDROID_CLIENT_ID = 'replace this with your Android client ID'
IOS_CLIENT_ID = 'replace this with your iOS client ID'
ANDROID_AUDIENCE = WEB_CLIENT_ID
ALLOWED_CLIENT_IDS = [
    WEB_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID,
    endpoints.API_EXPLORER_CLIENT_ID]
# [END auth_config]


# [START authed_greeting_api]
@endpoints.api(
    name='authed_greeting',
    version='v1',
    # Only allowed configured Client IDs to access this API.
    allowed_client_ids=ALLOWED_CLIENT_IDS,
    # Only allow auth tokens with the given audience to access this API.
    audiences=[ANDROID_AUDIENCE],
    # Require auth tokens to have the following scopes to access this API.
    scopes=[endpoints.EMAIL_SCOPE])
class AuthedGreetingApi(remote.Service):

    @endpoints.method(
        message_types.VoidMessage,
        Greeting,
        path='greet',
        http_method='POST',
        name='greet')
    def greet(self, request):
        user = endpoints.get_current_user()
        user_name = user.email() if user else 'Anonymous'
        return Greeting(message='Hello, {}'.format(user_name))

api = endpoints.api_server([GreetingApi, AuthedGreetingApi])
